'use client';

import { conversationalChatbot } from '@/ai/flows/conversational-chatbot';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Bot, Send, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const initialBotMessage = "¡Hola! Soy el asistente de IA de CyberGuard. ¿En qué puedo ayudarte hoy?";

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: initialBotMessage },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const history = newMessages.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
      const botResponse = await conversationalChatbot({
        history: history,
        question: currentInput
      });

      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse.answer }]);

    } catch (error) {
        console.error("Chatbot error:", error);
        setMessages((prev) => [...prev, { sender: 'bot', text: 'Lo siento, he encontrado un problema. Por favor, intenta de nuevo más tarde.' }]);
        toast({
            title: "Error del Chatbot",
            description: "No se pudo obtener una respuesta del asistente de IA.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-2xl shadow-primary/10 border-border">
      <CardContent className="p-4">
        <div className="space-y-4 h-96 overflow-y-auto p-4 mb-4 rounded-lg bg-background/50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3 animate-in fade-in',
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.sender === 'bot' && (
                <Avatar className="h-8 w-8 border-2 border-primary">
                  <AvatarFallback className="bg-transparent"><Bot className="text-primary" /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-xs rounded-lg px-4 py-3 text-sm md:max-w-md',
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                )}
              >
                <p>{message.text}</p>
              </div>
              {message.sender === 'user' && (
                 <Avatar className="h-8 w-8 bg-muted border-2 border-muted">
                  <AvatarFallback><User/></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start animate-in fade-in">
               <Avatar className="h-8 w-8 border-2 border-primary">
                  <AvatarFallback className="bg-transparent"><Bot className="text-primary" /></AvatarFallback>
                </Avatar>
                <div className="max-w-xs rounded-lg px-4 py-3 text-sm md:max-w-md bg-muted text-muted-foreground">
                    <div className="flex items-center justify-center gap-2 h-5">
                        <span className="h-2 w-2 bg-primary/70 rounded-full animate-pulse [animation-delay:0s]"></span>
                        <span className="h-2 w-2 bg-primary/70 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                        <span className="h-2 w-2 bg-primary/70 rounded-full animate-pulse [animation-delay:0.4s]"></span>
                    </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isLoading ? 'El asistente está pensando...' : 'Escribe tu mensaje...'}
            disabled={isLoading}
            className="bg-background flex-1 h-11"
          />
          <Button type="submit" disabled={isLoading} size="icon" className="h-11 w-11 flex-shrink-0">
            <Send className="h-5 w-5" />
            <span className="sr-only">Enviar mensaje</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
