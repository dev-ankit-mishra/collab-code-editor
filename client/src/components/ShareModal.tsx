import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import Button from "./Button";

interface ShareModalProps {
  roomId: string;
  onClose: () => void;
}

export default function ShareModal({ roomId, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareURL = `${window.location.origin}/editor/${roomId}`;

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareURL);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-neutral-900 text-white p-6 rounded-md shadow-lg relative w-[90%] max-w-md">
        <button
          className="absolute top-3 right-3 text-white text-xl cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-2">Share this link</h2>
        <p className="text-sm tracking-wide mb-5">
          Anyone with this link can collaborate in real-time.
        </p>

        <div className="bg-neutral-800 p-2 rounded tracking-wide  text-sm mb-4">
          {shareURL}
        </div>

        <Button
          onClick={handleCopy}
          className="w-full"
        >
          {copied ? "Copied!" : "Copy to Clipboard"}
        </Button>
      </div>
    </div>,
    document.body
  );
}
