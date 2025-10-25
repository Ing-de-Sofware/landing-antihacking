'use server';

/**
 * @fileOverview This file defines a Genkit flow for a general-purpose conversational chatbot.
 *
 * It takes conversation history and a new question to provide a coherent response.
 *
 * @interface ConversationalChatbotInput - Defines the input schema for the chatbot flow.
 * @interface ConversationalChatbotOutput - Defines the output schema for the chatbot flow.
 * @function conversationalChatbot - The main function to run the chatbot flow.
 */

import {ai} from '@/ai/genkit';
import {Message} from 'genkit';
import {z} from 'zod';

const ConversationalChatbotInputSchema = z.object({
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        content: z.array(z.object({text: z.string()})),
      })
    )
    .describe('The conversation history between the user and the bot.'),
  question: z.string().describe('The new question from the user.'),
});

export type ConversationalChatbotInput = z.infer<
  typeof ConversationalChatbotInputSchema
>;

const ConversationalChatbotOutputSchema = z.object({
  answer: z.string().describe("The chatbot's response to the question."),
});

export type ConversationalChatbotOutput = z.infer<
  typeof ConversationalChatbotOutputSchema
>;

export async function conversationalChatbot(
  input: ConversationalChatbotInput
): Promise<ConversationalChatbotOutput> {
  return conversationalChatbotFlow(input);
}

const conversationalChatbotFlow = ai.defineFlow(
  {
    name: 'conversationalChatbotFlow',
    inputSchema: ConversationalChatbotInputSchema,
    outputSchema: ConversationalChatbotOutputSchema,
  },
  async ({history, question}) => {
    const systemPrompt = `You are a friendly and helpful AI assistant for CyberGuard, a cybersecurity consulting firm.
Your goal is to have a natural conversation, answer user questions, and be a helpful resource.
Keep responses concise, friendly, and use markdown for formatting if needed.`;

    // Transform the history from the input schema to Genkit Message objects
    const fullHistory = history.map(msg => new Message(msg.role, msg.content));

    const {output} = await ai.generate({
      prompt: [
        new Message('system', [{text: systemPrompt}]),
        ...fullHistory,
        new Message('user', [{text: question}]),
      ],
      output: {
        schema: ConversationalChatbotOutputSchema,
      },
    });

    return output!;
  }
);
