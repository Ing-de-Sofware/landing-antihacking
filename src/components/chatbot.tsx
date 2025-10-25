'use client';

import { interactiveLeadGenChatbot } from '@/ai/flows/interactive-lead-gen-chatbot';
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

type ChatState = 'initial' | 'asking_company' | 'asking_concern' | 'collecting_contact' | 'finished';

const initialBotMessage = "¡Hola! Soy el asistente de IA de CyberGuard. Para comenzar, ¿cuál es el nombre de tu empresa?";

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: initialBotMessage },
  ]);
  const [input, setInput] = useState('');
  const [chatState, setChatState] = useState<ChatState>('asking_company');
  const [leadInfo, setLeadInfo] = useState({ companyName: '', securityConcern: '' });
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
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      if (chatState === 'asking_company') {
        const newLeadInfo = { ...leadInfo, companyName: currentInput };
        setLeadInfo(newLeadInfo);
        const botResponse = await interactiveLeadGenChatbot(newLeadInfo);
        setMessages((prev) => [...prev, { sender: 'bot', text: botResponse.response }]);
        setChatState('asking_concern');
      } else if (chatState === 'asking_concern') {
        const newLeadInfo = { ...leadInfo, securityConcern: currentInput };
        setLeadInfo(newLeadInfo);
        const botResponse = await interactiveLeadGenChatbot(newLeadInfo);
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: botResponse.response },
          { sender: 'bot', text: 'Gracias por la información. Uno de nuestros especialistas se pondrá en contacto contigo pronto. ¿Podrías dejar tu email de contacto?' }
        ]);
        setChatState('collecting_contact');
      } else if (chatState === 'collecting_contact') {
        // In a real app, you would save the email here.
        setMessages((prev) => [...prev, { sender: 'bot', text: '¡Perfecto! Hemos recibido tu información. Nos pondremos en contacto a la brevedad. ¡Gracias por confiar en CyberGuard!' }]);
        setChatState('finished');
      }
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
    <Card className="w-full shadow-2xl shadow-primary/10">
      <CardContent className="p-4">
        <div className="space-y-4 h-96 overflow-y-auto p-4 mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3',
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.sender === 'bot' && (
                <Avatar className="h-8 w-8 border-2 border-accent">
                  <AvatarFallback className="bg-transparent"><Bot className="text-accent" /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-xs rounded-lg px-4 py-2 text-sm md:max-w-md',
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground/80'
                )}
              >
                <p>{message.text}</p>
              </div>
              {message.sender === 'user' && (
                 <Avatar className="h-8 w-8">
                  <AvatarFallback><User/></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
               <Avatar className="h-8 w-8 border-2 border-accent">
                  <AvatarFallback className="bg-transparent"><Bot className="text-accent" /></AvatarFallback>
                </Avatar>
                <div className="max-w-xs rounded-lg px-4 py-2 text-sm md:max-w-md bg-muted text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse [animation-delay:0s]"></span>
                        <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                        <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse [animation-delay:0.4s]"></span>
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
            placeholder={chatState === 'finished' ? 'Gracias por tu tiempo.' : 'Escribe tu respuesta...'}
            disabled={chatState === 'finished' || isLoading}
            className="bg-background"
          />
          <Button type="submit" disabled={chatState === 'finished' || isLoading} aria-label="Send message">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
