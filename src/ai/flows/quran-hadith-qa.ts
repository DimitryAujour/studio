'use server';
/**
 * @fileOverview An AI agent that answers questions about Islam grounded in the Quran and Hadith.
 *
 * - quranHadithQA - A function that handles the question answering process.
 * - QuranHadithQAInput - The input type for the quranHadithQA function.
 * - QuranHadithQAOutput - The return type for the quranHadithQA function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuranHadithQAInputSchema = z.object({
  question: z.string().describe('The question about Islam.'),
});
export type QuranHadithQAInput = z.infer<typeof QuranHadithQAInputSchema>;

const QuranHadithQAOutputSchema = z.object({
  answer: z.string().describe('The answer to the question, grounded in the Quran and Hadith.'),
});
export type QuranHadithQAOutput = z.infer<typeof QuranHadithQAOutputSchema>;

export async function quranHadithQA(input: QuranHadithQAInput): Promise<QuranHadithQAOutput> {
  return quranHadithQAFlow(input);
}

const prompt = ai.definePrompt({
  name: 'quranHadithQAPrompt',
  input: {schema: QuranHadithQAInputSchema},
  output: {schema: QuranHadithQAOutputSchema},
  prompt: `You are a knowledgeable Islamic scholar who provides answers to questions based on the Quran and Hadith.

  Question: {{{question}}}
  Answer:`,
});

const quranHadithQAFlow = ai.defineFlow(
  {
    name: 'quranHadithQAFlow',
    inputSchema: QuranHadithQAInputSchema,
    outputSchema: QuranHadithQAOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
