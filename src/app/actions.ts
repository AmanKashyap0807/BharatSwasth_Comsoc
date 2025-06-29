'use server';

import { symptomAnalysis } from '@/ai/flows/symptom-analysis';

export async function getAiResponse(message: string): Promise<{ assessment: string, recommendations: string } | { error: string }> {
  if (!message || message.trim().length < 10) {
    return { error: 'Please provide a more detailed description of your symptoms.' };
  }
  try {
    const response = await symptomAnalysis({ input: message });
    return response;
  } catch (e) {
    console.error(e);
    return { error: 'Sorry, I encountered an issue. Please try again later.' };
  }
}
