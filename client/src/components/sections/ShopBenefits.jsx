import { Link } from 'react-router-dom';

const benefits = [
  {
    number: '01',
    title: 'Find something unique',
    description: 'Explore individual pre-loved pieces with their own character and story.',
  },
  {
    number: '02',
    title: 'Choose a lighter footprint',
    description: 'Give wearable fashion another chapter by choosing second-hand first.',
  },
  {
    number: '03',
    title: 'Shop with local support',
    description: 'Questions before you order? Our Nairobi team is easy to reach.',
  },
];

const ShopBenefits = () => (
  <section data-analytics-section='benefits' className='bg-[#e5eeea] px-5 py-14 text-[#0f4c5c] sm:px-8 lg:px-12'>
    <div className='mx-auto max-w-7xl'>
      <div className='mx-auto max-w-2xl text-center'>
        <p className='text-xs font-bold uppercase tracking-[0.3em] text-[#335c67] decoration-2 underline decoration-[#e36414] underline-offset-8'>A better kind of find</p>
        <h2 className='mt-3 text-3xl font-semibold tracking-tight sm:text-4xl'>Good pieces deserve another story.</h2>
      </div>
      <div className='mt-9 grid gap-4 md:grid-cols-3'>
        {benefits.map((benefit) => (
          <article key={benefit.number} className='rounded-2xl border border-[#335c67]/50 bg-[#eef3ee] p-6 shadow-sm shadow-[#0f4c5c]/10 sm:p-7'>
            <p className='text-sm font-bold tracking-[0.18em] text-[#344e41]'>{benefit.number}</p>
            <h3 className='mt-4 text-xl font-semibold'>{benefit.title}</h3>
            <p className='mt-2 leading-relaxed text-[#344e41]'>{benefit.description}</p>
          </article>
        ))}
      </div>
      <div className='mt-8 text-center'>
        <Link
          to='/contact'
          className='inline-flex min-h-11 items-center rounded-full border border-[#344e41]/40 px-6 py-2 font-semibold text-[#0f4c5c] transition hover:border-[#e36414] hover:bg-[#335c67]/20'
        >
          Need a hand? Contact us
        </Link>
      </div>
    </div>
  </section>
);

export default ShopBenefits;
