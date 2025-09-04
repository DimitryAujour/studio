
'use server';

import { db } from '@/lib/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const profileSchema = z.object({
  uid: z.string(),
  aboutMe: z.string().optional(),
  islamicBranch: z.enum(['sunni', 'shia', 'other']).optional(),
  language: z.enum(['en', 'ar', 'ur', 'fr', 'es']).optional(),
  values: z.string().optional(),
});

type FormState = {
  message: string | null;
  error: string | null;
}
