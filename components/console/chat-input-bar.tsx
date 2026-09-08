"use client";

import { useState } from "react";
import { Mic, Paperclip } from "lucide-react";
import { SendIcon } from "@/components/ui/send-icon";

export function ChatInputBar({
  placeholder = "Jump in, or restart the conversation...",
}: {
  placeholder?: string;
}) {
  const [value, setValue] = useState("");

  return (
    <div className="flex shrink-0 items-center gap-2 border-t border-border bg-white p-3">
      <button
        type="button"
        tabIndex={-1}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-background-chat text-muted"
      >
        <Paperclip size={18} />
      </button>
      <div className="flex flex-1 items-center rounded-pill border border-border bg-white px-4">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
        />
      </div>
      <button
        type="button"
        tabIndex={-1}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-background-chat text-muted"
      >
        <Mic size={18} />
      </button>
      <button
        type="button"
        onClick={() => setValue("")}
        disabled={!value.trim()}
        aria-label="Send"
        className="h-8 w-12 shrink-0 disabled:opacity-50"
      >
        <SendIcon className="h-full w-full" />
      </button>
    </div>
  );
}
