import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export function useUser() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        const { data, error } = await supabase
          .from('users')
          .select('name')
          .eq('email', session.user.email)
          .single();

        if (!error) setUserName(data?.name);
      }
    };
    fetchUser();
  }, []);

  return userName;
}
