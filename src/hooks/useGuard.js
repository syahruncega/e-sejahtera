import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuth from './useAuth';

export default function useGuard(roles) {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!roles.includes(user.role)) {
      router.push('/404', router.asPath);
    }
  }, [user, router, roles]);
}
