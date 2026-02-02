import { useState, useRef, useEffect } from 'react';
import { Message } from '@/data/mockData'; // Using mock interface for compatibility

export function useInterview() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentTranscript, setCurrentTranscript] = useState('');

  // Audio References
  const synthesis = typeof window !== 'undefined' ? window.speechSynthesis : null;
  const recognitionRef = useRef<any>(null);

  // Initialize Session
  const startSession = async (topic: string, difficulty: string) => {
    try {
      const res = await fetch('/api/session/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty })
      });
      const data = await res.json();
      setSessionId(data.sessionId);
      
      const initialMsg: Message = {
        id: 'init',
        role: 'ai',
        content: data.greeting,
        timestamp: new Date()
      };
      setMessages([initialMsg]);
      speak(data.greeting);

    } catch (err) {
      console.error("Failed to start session", err);
    }
  };

  // Speak Text
  const speak = (text: string) => {
    if (!synthesis) return;
    synthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    setStatus('speaking');
    utterance.onend = () => setStatus('idle');
    synthesis.speak(utterance);
  };

  // Start Listening
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Browser doesn't support speech recognition");
      return;
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onstart = () => setStatus('listening');
    
    recognitionRef.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      setCurrentTranscript(transcript);
    };

    recognitionRef.current.onerror = (event: any) => {
        console.error("Speech error", event);
        setStatus('idle');
    };

    recognitionRef.current.onend = () => {
        // If we have content, send it
        // Note: Logic here might need to be manual "Stop" button in UI to avoid premature sending
        // For MVP, manual send is safer, or auto-send on silence (which 'end' implies)
        setStatus('idle');
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
        recognitionRef.current.stop();
    }
  };

  // Send Message
  const sendMessage = async (text: string) => {
    if (!sessionId || !text.trim()) return;

    setStatus('thinking');
    
    // Optimistic UI
    const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: text,
        timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, message: text })
        });
        
        if (!response.body) throw new Error("No response body");

        // Streaming Reader
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let aiContent = "";
        
        const aiMsgId = (Date.now() + 1).toString();
        
        // Add placeholder AI message
        setMessages(prev => [...prev, {
            id: aiMsgId,
            role: 'ai',
            content: "...",
            timestamp: new Date()
        }]);

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            aiContent += chunk;
            
            // Update UI with streaming content
            setMessages(prev => prev.map(m => 
                m.id === aiMsgId ? { ...m, content: aiContent } : m
            ));
        }

        // Once finished, speak it
        speak(aiContent);

    } catch (err) {
        console.error("Chat error", err);
        setStatus('idle');
    }
  };

  return {
    messages,
    status,
    currentTranscript,
    sessionId,
    startSession,
    sendMessage,
    startListening,
    stopListening
  };
}
