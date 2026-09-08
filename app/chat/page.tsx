"use client";

import { useState } from "react";
import { Pill } from "@/components/ui/pill";
import { NavShell } from "@/components/nav-shell";
import { Mic, ArrowUp, Paperclip } from "lucide-react";

const suggestions = ["Suggestion one", "Suggestion two", "Suggestion three", "Suggestion four"];

export default function ChatPage() {
  const [value, setValue] = useState("");

  return (
    <NavShell title="Chat">
      <div className="flex h-full flex-col bg-white">
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="text-xl font-semibold text-foreground">What can I help you with?</h1>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-border bg-white p-3">
          <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-brand text-white">
            <Paperclip size={18} />
          </button>
          <div className="flex flex-1 items-center rounded-pill border border-border bg-white px-4">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter message here..."
              className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>
          <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-brand text-white">
            <Mic size={18} />
          </button>
          <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-brand/40 text-white">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </NavShell>
  );
}
