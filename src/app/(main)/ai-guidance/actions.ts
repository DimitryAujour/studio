'use server';

import { quranHadithQA } from '@/ai/flows/quran-hadith-qa';
import { z } from 'zod';

const schema = z.object({
  question: z.string().min(10, { message: 'Please ask a more detailed question.' }),
});

type FormState = {
  answer: string | null;
  error: string | null;
}

export async function askQuestion(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    question: formData.get('question'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.question?.[0] ?? 'Invalid question.',
      answer: null,
    };
  }

  try {
    const result = await quranHadithQA({ question: validatedFields.data.question });
    if (result.answer) {
      return { answer: result.answer, error: null };
    }
    return { error: 'Could not get an answer. Please try again.', answer: null };

  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred. Please try again later.', answer: null };
  }
}
