// interactive-lead-gen-chatbot.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for an interactive chatbot that collects lead information.
 *
 * The chatbot asks a few questions to qualify leads before collecting contact information.
 *
 * @interface InteractiveLeadGenChatbotInput - Defines the input schema for the chatbot flow.
 * @interface InteractiveLeadGenChatbotOutput - Defines the output schema for the chatbot flow.
 * @function interactiveLeadGenChatbot - The main function to run the chatbot flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InteractiveLeadGenChatbotInputSchema = z.object({
  companyName: z.string().describe('The name of the company.'),
  securityConcern: z.string().describe('The major security concern of the company.'),
});

export type InteractiveLeadGenChatbotInput = z.infer<typeof InteractiveLeadGenChatbotInputSchema>;

const InteractiveLeadGenChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response.'),
});

export type InteractiveLeadGenChatbotOutput = z.infer<typeof InteractiveLeadGenChatbotOutputSchema>;

export async function interactiveLeadGenChatbot(input: InteractiveLeadGenChatbotInput): Promise<InteractiveLeadGenChatbotOutput> {
  return interactiveLeadGenChatbotFlow(input);
}

const interactiveLeadGenChatbotPrompt = ai.definePrompt({
  name: 'interactiveLeadGenChatbotPrompt',
  input: {schema: InteractiveLeadGenChatbotInputSchema},
  output: {schema: InteractiveLeadGenChatbotOutputSchema},
  prompt: `You are a chatbot on a cybersecurity consulting firm's landing page.
  Your goal is to qualify leads by asking a few key questions before collecting contact information.
  Keep responses concise and friendly, and in markdown format.

  Based on the following information, formulate a relevant question to continue the conversation:

  Company Name: {{{companyName}}}
  Security Concern: {{{securityConcern}}}

  Possible next questions include:
  - What specific types of security threats are you most concerned about?
  - Have you experienced any security breaches in the past?
  - What is the size of your company, and how many employees do you have?
  - What is your budget for cybersecurity?
  - How familiar are you with cybersecurity frameworks and standards?
  - What are the critical assets that need to be protected?
  - What is your current security infrastructure?
  - Do you have any compliance requirements?
  - Who is responsible for cybersecurity in your company?
  - Are there any specific regulations you need to comply with?

  Respond with the next logical question.
  `,
});

const interactiveLeadGenChatbotFlow = ai.defineFlow(
  {
    name: 'interactiveLeadGenChatbotFlow',
    inputSchema: InteractiveLeadGenChatbotInputSchema,
    outputSchema: InteractiveLeadGenChatbotOutputSchema,
  },
  async input => {
    const {output} = await interactiveLeadGenChatbotPrompt(input);
    return output!;
  }
);
