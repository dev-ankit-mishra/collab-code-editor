import { useEffect, useRef, useState } from "react";
import socket from "./Socket";
import { IoSend } from "react-icons/io5";

type ChatMessage = {
  user: string;
  text: string;
  time: string;
};

type ChatProps = {
  roomId: string | undefined;
  user: string | undefined;
};

export default function Chat({ roomId, user }: ChatProps) {
  // Stores all messages
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Stores current input text
  const [text, setText] = useState("");

  // Used for auto-scroll
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  /* =========================
     LISTEN FOR MESSAGES
     ========================= */
  useEffect(() => {
    const handleChatMessage = (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("chat-message", handleChatMessage);

    // Cleanup to avoid duplicate listeners
    return () => {
      socket.off("chat-message", handleChatMessage);
    };
  }, []);

  /* =========================
     AUTO SCROLL TO BOTTOM
     ========================= */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* =========================
     SEND MESSAGE
     ========================= */
  function sendMessage() {
    if (!text.trim() || !user) return;

    const message: ChatMessage = {
      user,
      text,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("chat-message", {
      roomId,
      ...message,
    });

    setText("");
  }

  return (
    <section className="flex flex-col h-[16rem] p-4 mb-1 text-sm rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
      
      {/* HEADER */}
      <header className="shrink-0 pb-2 text-base border-b border-white/10 font-medium">
        Project Chat
      </header>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto py-2 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[85%] p-2 rounded ${
              msg.user === user
                ? "ml-auto bg-green-600/20 text-right"
                : "mr-auto bg-white/5"
            }`}
          >
            <div className="text-xs text-gray-400">
              {msg.user} • {msg.time}
            </div>
            <div className="text-white break-words">
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="shrink-0 pt-2 border-t border-white/10 flex gap-2">
        <input
          className="flex-1 bg-transparent border border-white/10 rounded-md px-2 py-1 text-white outline-none"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-3 rounded-full cursor-pointer bg-green-600 hover:bg-green-500"
        >
          <IoSend/>
        </button>
      </div>
    </section>
  );
}
