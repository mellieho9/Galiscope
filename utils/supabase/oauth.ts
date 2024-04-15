import { createClient } from './client';

const supabase = createClient();

export const LoginWithGoogle = () => {
  console.log("Login with Google", window.location.origin)
  supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};

export const LoginWithGithub = () => {
  supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};
