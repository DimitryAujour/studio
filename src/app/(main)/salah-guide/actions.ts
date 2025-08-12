'use server';

import { generateSpeech } from '@/ai/flows/text-to-speech';
import { z } from 'zod';

const schema = z.object({
  text: z.string().min(1, { message: 'Text cannot be empty.' }),
});

type FormState = {
  audioDataUri: string | null;
  error: string | null;
};

export async function getPronunciation(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    text: formData.get('text'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.text?.[0] ?? 'Invalid text.',
      audioDataUri: null,
    };
  }

  try {
    const result = await generateSpeech({ text: validatedFields.data.text });
    if (result.audioDataUri) {
      return { audioDataUri: result.audioDataUri, error: null };
    }
    return { error: 'Could not generate audio. Please try again.', audioDataUri: null };
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred. Please try again later.', audioDataUri: null };
  }
}
