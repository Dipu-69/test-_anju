import { useEffect, useRef, useState } from "react";
import MessageBubble from "./message-bubble";
import InputBar from "./input-bar";
import Suggestions from "./suggestions";

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", content: "Hi, I’m Sathi. What’s on your mind today?" },
  ]);
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const onSend = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    // Placeholder: call your AI backend, then append assistant response
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, role: "assistant", content: "Thanks for sharing. Would a short breathing exercise help?" }
      ]);
    }, 600);
  };

  const onSuggestion = (text) => onSend(text);

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div
        ref={listRef}
        className="h-[60vh] overflow-y-auto p-4 scroll-smooth"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.map((m) => (
          <MessageBubble key={m.id} role={m.role} content={m.content} />
        ))}
      </div>
      <div className="border-t p-3 space-y-3">
        <Suggestions onPick={onSuggestion} />
        <InputBar onSend={onSend} />
      </div>
    </div>
  );
}