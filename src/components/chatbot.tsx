'use client';

import { conversationalChatbot } from '@/ai/flows/conversational-chatbot';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import EmojiPicker from 'emoji-picker-react';
import { Bot, Paperclip, Send, Smile, User, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Media = {
  url: string;
  contentType: string;
};

type Message = {
  sender: 'user' | 'bot';
  text: string;
  media?: Media;
};

const initialBotMessage = "¡Hola! Soy el asistente de IA de PentGuin. ¿En qué puedo ayudarte hoy?";

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: initialBotMessage },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [media, setMedia] = useState<Media | null>(null);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This prevents the browser from auto-focusing the input field and scrolling down.
    focusRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setMedia({
          url: base64String,
          contentType: file.type,
        });
        toast({
          title: "Imagen adjuntada",
          description: "La imagen está lista para ser enviada.",
        });
      };
      reader.readAsDataURL(file);
    } else {
        toast({
            variant: "destructive",
            title: "Archivo no válido",
            description: "Por favor, selecciona un archivo de imagen.",
        });
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !media) || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input, media: media || undefined };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    
    const currentInput = input;
    const currentMedia = media;

    setInput('');
    setMedia(null);
    setIsLoading(true);

    try {
      const historyForApi = newMessages.slice(1, -1).map(msg => ({
          role: msg.sender === 'user' ? 'user' : ('model' as 'user' | 'model'),
          content: [{text: msg.text, ...(msg.media && {media: msg.media})}],
      }));

      const botResponse = await conversationalChatbot({
        history: historyForApi,
        question: currentInput,
        ...(currentMedia && { media: currentMedia }),
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
      {/* This invisible div is used to programmatically grab focus and prevent scroll-on-load */}
      <div ref={focusRef} tabIndex={-1} aria-hidden="true" className="sr-only"></div>
      <CardContent className="p-4">
        <div className="space-y-4 h-96 overflow-y-auto p-4 mb-4 rounded-lg bg-background">
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
                  <AvatarFallback className="bg-transparent text-primary"><Bot /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-xs rounded-lg px-4 py-3 text-sm md:max-w-md',
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {message.media && (
                  <Image
                    src={message.media.url}
                    alt="Imagen adjunta"
                    width={200}
                    height={200}
                    className="rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
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
                  <AvatarFallback className="bg-transparent text-primary"><Bot /></AvatarFallback>
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
        
        {media && (
          <div className="p-2 mb-2 border rounded-md relative bg-muted">
            <p className="text-sm text-muted-foreground mb-2">Imagen adjunta:</p>
            <Image src={media.url} alt="Vista previa" width={80} height={80} className="rounded-md" />
            <Button variant="ghost" size="icon" className="absolute top-0 right-0 h-6 w-6" onClick={() => setMedia(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-11 w-11 flex-shrink-0"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            <Paperclip className="h-5 w-5" />
            <span className="sr-only">Adjuntar archivo</span>
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-11 w-11 flex-shrink-0"
                disabled={isLoading}
              >
                <Smile className="h-5 w-5" />
                <span className="sr-only">Añadir emoji</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-0">
              <EmojiPicker onEmojiClick={(emojiObject) => setInput(input + emojiObject.emoji)} />
            </PopoverContent>
          </Popover>

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
