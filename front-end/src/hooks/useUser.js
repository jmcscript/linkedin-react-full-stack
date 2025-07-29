import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const useUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Run once, only as there are no dependencies. Then unsubscribe.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), function (user) {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return { isLoading, user };
};

export default useUser;
