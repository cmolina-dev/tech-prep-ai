import { useState, useRef, useEffect } from "react";
import { Message } from "@/data/mockData"; // Using mock interface for compatibility

interface QuestionAnswer {
  id: string;
  question: string;
  answer: string;
  questionTimestamp: Date;
  answerTimestamp: Date;
  responseTime: number; // in seconds
}

export function useInterview(initialSessionId: string | null = null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<
    "idle" | "listening" | "thinking" | "speaking"
  >("idle");
  const [sessionId, setSessionId] = useState<string | null>(initialSessionId);
  const [currentTranscript, setCurrentTranscript] = useState("");

  // Q&A Tracking
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    null,
  );
  const [questionStartTime, setQuestionStartTime] = useState<Date | null>(null);

  // Audio References
  const synthesis =
    typeof window !== "undefined" ? window.speechSynthesis : null;
  const recognitionRef = useRef<any>(null);
  const greetingCalledRef = useRef(false); // Track if greeting was already called

  // Initial load / transform to greeting
  useEffect(() => {
    if (
      initialSessionId &&
      messages.length === 0 &&
      !greetingCalledRef.current
    ) {
      greetingCalledRef.current = true;
      generateInitialGreeting(initialSessionId);
    }
  }, [initialSessionId, messages.length]);

  const generateInitialGreeting = async (sid: string) => {
    setStatus("thinking");
    try {
      const { getSessionContext } = await import("@/app/actions");

      // Ensure context is loaded
      let localContext = context;
      if (!localContext) {
        localContext = await getSessionContext(sid);
        setContext(localContext);
      }

      // Call unified API endpoint (no message = initial greeting)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sid }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

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
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        aiContent += chunk;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMsgId ? { ...m, content: aiContent } : m,
          ),
        );
      }

      speak(aiContent, true); // true = this is a question
      setStatus("idle");
    } catch (e) {
      console.error(e);
      setStatus("idle");
      setMessages([
        {
          id: "error-" + Date.now(),
          role: "ai",
          content: "Sorry, there was an error starting the interview.",
          timestamp: new Date(),
        },
      ]);
    }
  };

  // Initialize Session (Legacy support or explicit new)
  const startSession = async (topic: string, difficulty: string) => {
    // ... logic for legacy start if needed, or simple redirect ...
    // keeping as is but likely unused if wizard is primary
  };

  // Speak Text
  const speak = (text: string, isQuestion: boolean = false) => {
    if (!synthesis) return;
    synthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    setStatus("speaking");

    utterance.onend = () => {
      setStatus("idle");

      // If it's a question from AI, start timer for user response
      if (isQuestion) {
        const qId = crypto.randomUUID();
        setCurrentQuestionId(qId);
        setQuestionStartTime(new Date());
      }
    };

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
        });
      });
    }
  }, [sessionId]);

  // Cleanup: Stop speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (synthesis) {
        synthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [synthesis]);

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
      // 1. Save Q&A pair if we have a current question
      if (currentQuestionId && questionStartTime) {
        const answerTime = new Date();
        const responseTime =
          (answerTime.getTime() - questionStartTime.getTime()) / 1000;

        // Find the last AI message (the question)
        const lastAiMessage = messages.filter((m) => m.role === "ai").pop();

        if (lastAiMessage) {
          setQuestionAnswers((prev) => [
            ...prev,
            {
              id: currentQuestionId,
              question: lastAiMessage.content,
              answer: text,
              questionTimestamp: questionStartTime,
              answerTimestamp: answerTime,
              responseTime,
            },
          ]);
        }

        // Reset timer
        setCurrentQuestionId(null);
        setQuestionStartTime(null);
      }

      // 2. Call API Route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: text }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      // 3. Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

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
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        aiContent += chunk;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMsgId ? { ...m, content: aiContent } : m,
          ),
        );
      }

      // 4. Finish - speak AI response and mark as question
      speak(aiContent, true); // true = this is a question
      setStatus("idle");
    } catch (err) {
      console.error("Chat error", err);
      setStatus("idle");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "ai",
          content: "Sorry, there was an error processing your message.",
          timestamp: new Date(),
        },
      ]);
    }
  };

  // Finish Session - Evaluate all Q&A pairs
  const finishSession = async () => {
    console.log("🏁 [FINISH] Starting session finish...");
    console.log("🏁 [FINISH] Session ID:", sessionId);
    console.log("🏁 [FINISH] Q&A pairs count:", questionAnswers.length);

    if (!sessionId || questionAnswers.length === 0) {
      console.warn("⚠️ [FINISH] No questions to evaluate");
      return false;
    }

    setStatus("thinking");

    try {
      const response = await fetch("/api/session/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          questionAnswers,
        }),
      });

      console.log("🏁 [FINISH] Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ [FINISH] Evaluation failed:", errorData);
        throw new Error("Evaluation failed");
      }

      const result = await response.json();
      console.log("✅ [FINISH] Evaluation success:", result);

      setStatus("idle");
      return true; // Signal success for redirect
    } catch (err) {
      console.error("❌ [FINISH] Finish session error:", err);
      setStatus("idle");
      return false;
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
    finishSession,
  };
}
