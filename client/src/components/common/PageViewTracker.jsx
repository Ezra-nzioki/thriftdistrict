import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'https://thriftdistrict.onrender.com/api';

const PageViewTracker = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith('/admin')) return;

    const recordView = (view) => {
      fetch(`${API_URL}/analytics/pageview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(view),
        keepalive: true,
      }).then((response) => {
        if (!response.ok) throw new Error(`Analytics request failed (${response.status}).`);
      }).catch((error) => {
        console.error('Could not record analytics view:', error);
      });
    };

    recordView({ path: pathname });

    const viewedSections = new Set();
    const observedSections = new WeakSet();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const section = entry.target.getAttribute('data-analytics-section');
        if (!entry.isIntersecting || !section || viewedSections.has(section)) return;
        viewedSections.add(section);
        recordView({ section });
      });
    }, { threshold: 0 });

    const observeSections = () => {
      document.querySelectorAll('[data-analytics-section]').forEach((section) => {
        if (observedSections.has(section)) return;
        observedSections.add(section);
        observer.observe(section);
      });
    };

    observeSections();
    const mutationObserver = new MutationObserver(observeSections);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
};

export default PageViewTracker;
