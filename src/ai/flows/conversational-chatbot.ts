'use server';

/**
 * @fileOverview This file defines a Genkit flow for a general-purpose conversational chatbot.
 *
 * It takes conversation history and a new question to provide a coherent response.
 * It supports multimodal input, including images.
 *
 * @interface ConversationalChatbotInput - Defines the input schema for the chatbot flow.
 * @interface ConversationalChatbotOutput - Defines the output schema for the chatbot flow.
 * @function conversationalChatbot - The main function to run the chatbot flow.
 */

import {ai} from '@/ai/genkit';
import {Message, Part} from 'genkit';
import {z} from 'zod';

const ConversationalChatbotInputSchema = z.object({
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        content: z.array(
          z.object({
            text: z.string().optional(),
            media: z
              .object({
                contentType: z.string(),
                url: z.string(),
              })
              .optional(),
          })
        ),
      })
    )
    .describe('The conversation history between the user and the bot.'),
  question: z.string().describe('The new question from the user.'),
  media: z
    .object({
      contentType: z.string(),
      url: z.string(),
    })
    .optional()
    .describe('Optional media (image) to include with the question.'),
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
  async ({history, question, media}) => {
    const systemPrompt = `You are a friendly and helpful AI assistant for PentGuin, a cybersecurity consulting firm.
Your goal is to have a natural conversation, answer user questions, and be a helpful resource.
Keep responses concise, friendly, and use markdown for formatting if needed.
If the user provides an image, analyze it and respond to their question about it.`;

    const fullHistory: Message[] = history.map(
      msg => new Message(msg.role, msg.content as Part[])
    );

    const userParts: Part[] = [{text: question}];
    if (media) {
      userParts.push({media});
    }

    const {output} = await ai.generate({
      prompt: [
        new Message('system', [{text: systemPrompt}]),
        ...fullHistory,
        new Message('user', userParts),
      ],
      output: {
        schema: ConversationalChatbotOutputSchema,
      },
    });

    return output!;
  }
);
