'use server';

/**
 * @fileOverview A symptom analysis AI agent.
 *
 * - symptomAnalysis - A function that handles the symptom analysis process.
 * - SymptomAnalysisInput - The input type for the symptomAnalysis function.
 * - SymptomAnalysisOutput - The return type for the symptomAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomAnalysisInputSchema = z.object({
  input: z.string().describe('The symptoms, described via text, voice, or image.'),
});
export type SymptomAnalysisInput = z.infer<typeof SymptomAnalysisInputSchema>;

const SymptomAnalysisOutputSchema = z.object({
  assessment: z.string().describe('A preliminary assessment of the symptoms.'),
  recommendations: z.string().describe('Healthcare recommendations based on the symptoms.'),
});
export type SymptomAnalysisOutput = z.infer<typeof SymptomAnalysisOutputSchema>;

export async function symptomAnalysis(input: SymptomAnalysisInput): Promise<SymptomAnalysisOutput> {
  return symptomAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomAnalysisPrompt',
  input: {schema: SymptomAnalysisInputSchema},
  output: {schema: SymptomAnalysisOutputSchema},
  prompt: `You are a medical chatbot named MediBot. A user will provide you with their symptoms, and you will provide a preliminary assessment and healthcare recommendations.

Symptoms: {{{input}}}`,
});

const symptomAnalysisFlow = ai.defineFlow(
  {
    name: 'symptomAnalysisFlow',
    inputSchema: SymptomAnalysisInputSchema,
    outputSchema: SymptomAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
