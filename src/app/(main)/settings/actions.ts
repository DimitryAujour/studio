
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

export async function updateUserProfile(prevState: FormState, formData: FormData): Promise<FormState> {
   const validatedFields = profileSchema.safeParse({
    uid: formData.get('uid'),
    aboutMe: formData.get('aboutMe'),
    islamicBranch: formData.get('islamicBranch'),
    language: formData.get('language'),
    values: formData.get('values'),
  });

  if (!validatedFields.success) {
    return {
      message: null,
      error: 'Invalid data provided.',
    };
  }

  const { uid, ...profileData } = validatedFields.data;

  if (!uid) {
     return {
      message: null,
      error: 'You must be logged in to update your profile.',
    };
  }

  try {
    const userProfileRef = doc(db, 'users', uid);
    await setDoc(userProfileRef, profileData, { merge: true });
    
    revalidatePath('/settings'); // Re-renders the settings page with new data
    return {
      message: 'Profile updated successfully!',
      error: null,
    };
  } catch (e) {
    console.error('Error updating profile:', e);
    return {
      message: null,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
