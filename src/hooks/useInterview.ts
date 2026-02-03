import { useState, useRef, useEffect } from "react";
import { Message } from "@/data/mockData"; // Using mock interface for compatibility

export function useInterview(initialSessionId: string | null = null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<
    "idle" | "listening" | "thinking" | "speaking"
  >("idle");
  const [sessionId, setSessionId] = useState<string | null>(initialSessionId);
  const [currentTranscript, setCurrentTranscript] = useState("");

  // Audio References
  const synthesis =
    typeof window !== "undefined" ? window.speechSynthesis : null;
  const recognitionRef = useRef<any>(null);

  // Initial load / transform to greeting
  useEffect(() => {
    if (initialSessionId && messages.length === 0) {
      // Trigger initial greeting from AI (simulating an empty "start" message or just context)
      // We'll use a special trigger message for the API or client-side logic
      generateInitialGreeting(initialSessionId);
    }
  }, [initialSessionId]);

  const generateInitialGreeting = async (sid: string) => {
    setStatus("thinking");
    try {
      const { saveSessionMessage, getSessionContext } =
        await import("@/app/actions");
      const { OpenAI } = await import("openai");

      // Ensure context is loaded
      let localContext = context;
      if (!localContext) {
        localContext = await getSessionContext(sid);
        setContext(localContext);
      }

      const openai = new OpenAI({
        baseURL: "http://localhost:1234/v1",
        apiKey: "lm-studio",
        dangerouslyAllowBrowser: true,
      });

      const systemContent = localContext
        ? `You are a Senior Technical Recruiter conducting a spoken interview for a ${localContext.difficulty} position in ${localContext.path}. The stack includes: ${localContext.technologies}.
            Interaction Rules:
            1. **One Question Only:** Ask exactly ONE question at a time. Never provide a list of questions.
            2. **Feedback Loop:** If I answer, briefly validate my technical accuracy and correct any major English grammar mistakes first.
            3. **Flow:** After the brief feedback, immediately ask the next single question.
            4. **Style:** Be concise, professional, and conversational. Do not use emojis.`
        : "You are a helpful interviewer.";

      const apiMessages = [
        { role: "system", content: systemContent },
        {
          role: "user",
          content:
            "Please introduce yourself and start the interview question.",
        },
      ];

      const stream = await openai.chat.completions.create({
        model: "local-model",
        messages: apiMessages as any,
        stream: true,
        temperature: 0.7,
      });

      const aiMsgId = "init-" + Date.now();
      setMessages([
        {
          id: aiMsgId,
          role: "ai",
          content: "...",
          timestamp: new Date(),
        },
      ]);

      let aiContent = "";
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          aiContent += content;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiMsgId ? { ...m, content: aiContent } : m,
            ),
          );
        }
      }

      speak(aiContent);
      setStatus("idle");

      // Persist AI Greeting
      await saveSessionMessage({
        sessionId: sid,
        role: "ai",
        content: aiContent,
      });
    } catch (e) {
      console.error(e);
      setStatus("idle");
    }
  };

  // Initialize Session (Legacy support or explicit new)
  const startSession = async (topic: string, difficulty: string) => {
    // ... logic for legacy start if needed, or simple redirect ...
    // keeping as is but likely unused if wizard is primary
  };

  // Speak Text
  const speak = (text: string) => {
    if (!synthesis) return;
    synthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    setStatus("speaking");
    utterance.onend = () => setStatus("idle");
    synthesis.speak(utterance);
  };

  // Start Listening
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Browser doesn't support speech recognition");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onstart = () => setStatus("listening");

    recognitionRef.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join("");
      setCurrentTranscript(transcript);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech error", event);
      setStatus("idle");
    };

    recognitionRef.current.onend = () => {
      // If we have content, send it
      // Note: Logic here might need to be manual "Stop" button in UI to avoid premature sending
      // For MVP, manual send is safer, or auto-send on silence (which 'end' implies)
      setStatus("idle");
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  // Fetch Context on Load
  const [context, setContext] = useState<any>(null);
  useEffect(() => {
    if (sessionId) {
      import("@/app/actions").then((actions) => {
        actions.getSessionContext(sessionId).then((ctx) => {
          setContext(ctx);
          // Trigger initial greeting logic if needed here
        });
      });
    }
  }, [sessionId]);

  // Send Message
  const sendMessage = async (text: string) => {
    if (!sessionId || !text.trim()) return;

    // Save User Msg Optimistically
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setStatus("thinking");

    try {
      // 1. Persist User Msg
      // We import dynamically or use a prop to avoid server-action-in-client issues
      // but since we are in a hook, we can just call the action if passed or imported.
      // We'll use the imported action.
      const { saveSessionMessage } = await import("@/app/actions");
      await saveSessionMessage({ sessionId, role: "user", content: text });

      // 2. Prepare OpenAI Call
      const { OpenAI } = await import("openai");
      const openai = new OpenAI({
        baseURL: "http://localhost:1234/v1",
        apiKey: "lm-studio",
        dangerouslyAllowBrowser: true,
      });

      const systemContent = context
        ? `You are a Senior Technical Recruiter conducting a spoken interview for a ${context.difficulty} position in ${context.path}. The stack includes: ${context.technologies}.
            Interaction Rules:
            1. **One Question Only:** Ask exactly ONE question at a time. Never provide a list of questions.
            2. **Feedback Loop:** If I answer, briefly validate my technical accuracy and correct any major English grammar mistakes first.
            3. **Flow:** After the brief feedback, immediately ask the next single question.
            4. **Style:** Be concise, professional, and conversational. Do not use emojis.`
        : "You are a helpful interviewer.";

      const apiMessages = [
        { role: "system", content: systemContent },
        ...messages.map((m) => ({
          role: m.role === "ai" ? "assistant" : "user",
          content: m.content,
        })),
        { role: "user", content: text },
      ];

      // 3. Stream Response
      const stream = await openai.chat.completions.create({
        model: "local-model",
        messages: apiMessages as any,
        stream: true,
        temperature: 0.7,
      });

      const aiMsgId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        {
          id: aiMsgId,
          role: "ai",
          content: "...",
          timestamp: new Date(),
        },
      ]);

      let aiContent = "";
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          aiContent += content;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiMsgId ? { ...m, content: aiContent } : m,
            ),
          );
        }
      }

      // 4. Finish
      speak(aiContent);
      setStatus("idle");

      // 5. Persist AI Msg
      await saveSessionMessage({ sessionId, role: "ai", content: aiContent });
    } catch (err) {
      console.error("Chat error", err);
      setStatus("idle");
      // Add visual error?
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
    stopListening,
  };
}
