import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'https://thriftdistrict.onrender.com/api';

const AnalyticsPanel = () => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/analytics/summary`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || `Could not load analytics (${response.status}).`);
        setSummary(data);
      } catch (loadError) {
        setError(loadError.message);
      }
    };

    loadSummary();
  }, []);

  if (error) {
    return <section className='mb-8 rounded border border-red-300 bg-red-50 p-4 text-red-800' role='alert'>
      <h2 className='text-2xl font-semibold'>Website analytics</h2>
      <p className='mt-2'>{error}</p>
    </section>;
  }

  if (!summary) {
    return <section className='mb-8 rounded border p-4' aria-live='polite'>Loading website analytics...</section>;
  }

  const maxDailyViews = Math.max(...summary.daily.map((day) => day.views), 1);
  const maxPageViews = Math.max(...summary.popularPages.map((page) => page.views), 1);

  return (
    <section className='mb-8 rounded-xl border border-[#335c67]/40 bg-[#eef3ee] p-4 text-[#0f4c5c] sm:p-6'>
      <div className='mb-5 flex flex-wrap items-end justify-between gap-2'>
        <div>
          <h2 className='text-2xl font-semibold'>Website analytics</h2>
          <p className='mt-1 text-sm text-[#344e41]'>Page views over the last 30 days. No visitor identities are collected.</p>
        </div>
        <p className='rounded-lg bg-white px-4 py-2 text-sm'>
          Total views <strong className='ml-2 text-lg'>{summary.totalViews.toLocaleString()}</strong>
        </p>
      </div>

      <div className='grid gap-6 lg:grid-cols-2'>
        <div className='rounded-lg bg-white p-4'>
          <h3 className='mb-4 font-semibold'>Views per day</h3>
          <div className='flex h-44 items-end gap-1' role='img' aria-label='Bar chart of page views per day for the last 30 days'>
            {summary.daily.map((day) => (
              <div key={day.date} className='flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1' title={`${day.date}: ${day.views} views`}>
                <span className='text-[10px]'>{day.views || ''}</span>
                <div
                  className='w-full rounded-t bg-[#335c67]'
                  style={{ height: `${day.views ? Math.max((day.views / maxDailyViews) * 100, 4) : 0}%` }}
                />
              </div>
            ))}
          </div>
          <div className='mt-2 flex justify-between text-xs text-[#344e41]'>
            <span>{summary.daily[0]?.date}</span>
            <span>{summary.daily[summary.daily.length - 1]?.date}</span>
          </div>
        </div>

        <div className='rounded-lg bg-white p-4'>
          <h3 className='mb-4 font-semibold'>Most viewed pages and products</h3>
          {summary.popularPages.length ? (
            <ul className='space-y-3'>
              {summary.popularPages.map((page) => (
                <li key={page.path}>
                  <div className='mb-1 flex justify-between gap-3 text-sm'>
                    <span className='break-all'>{page.path}</span>
                    <strong>{page.views.toLocaleString()}</strong>
                  </div>
                  <div className='h-2 overflow-hidden rounded bg-[#e5eeea]'>
                    <div className='h-full rounded bg-[#e36414]' style={{ width: `${(page.views / maxPageViews) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-sm text-[#344e41]'>No views recorded yet. New visits will appear here.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnalyticsPanel;
