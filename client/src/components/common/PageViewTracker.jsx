import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'https://thriftdistrict.onrender.com/api';

const PageViewTracker = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith('/admin')) return;

    fetch(`${API_URL}/analytics/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    }).then((response) => {
      if (!response.ok) throw new Error(`Analytics request failed (${response.status}).`);
    }).catch((error) => {
      console.error('Could not record page view:', error);
    });
  }, [pathname]);

  return null;
};

export default PageViewTracker;
