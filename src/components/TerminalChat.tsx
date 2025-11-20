import { useState, useRef, useEffect } from "react";
import { X, Send, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

interface TerminalChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const TerminalChat = ({ isOpen, onClose }: TerminalChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Terminal initialized. Type your message below...",
      sender: "agent",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.message,
        sender: "agent",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        sender: "agent",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="mx-auto max-w-4xl border-4 border-double border-foreground bg-background shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b-2 border-foreground bg-surface px-4 py-2">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs uppercase tracking-wider">
              Terminal Chat v1.0
            </span>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-foreground hover:text-background"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="h-96 bg-background">
          <div ref={scrollRef} className="space-y-3 p-4 font-mono text-sm">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div className="mb-1 text-xs text-muted-foreground">
                  {message.sender === "user" ? "[ USER ]" : "[ SYSTEM ]"}
                  <span className="ml-2 opacity-60">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div
                  className={`inline-block max-w-[80%] border-2 px-3 py-2 ${
                    message.sender === "user"
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-foreground/30 bg-surface text-foreground"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-left">
                <div className="mb-1 text-xs text-muted-foreground">[ SYSTEM ]</div>
                <div className="inline-block border-2 border-foreground/30 bg-surface px-3 py-2">
                  <span className="animate-pulse">typing...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t-2 border-foreground bg-surface p-4">
          <div className="flex gap-2">
            <div className="flex-1 border-2 border-foreground bg-background">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="border-0 bg-transparent font-mono text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              className="border-2 border-foreground bg-primary px-4 font-mono text-xs uppercase tracking-wider text-background hover:bg-primary/90"
            >
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
          </div>
          <div className="mt-2 text-xs text-muted-foreground font-mono">
            Press Enter to send • Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalChat;
