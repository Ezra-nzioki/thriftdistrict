import { Btn } from '../common/btn'

export const Hero = ({ content }) => {
  return (
    <>
      <div
        className="relative isolate flex min-h-[540px] w-full flex-col items-center justify-center gap-6 overflow-hidden px-6 py-16 text-center font-bold sm:min-h-[620px] sm:px-10"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(16, 42, 35, .78), rgba(16, 42, 35, .46)), url(${content.hero?.image || 'https://via.placeholder.com/800'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#dfc58c]">Considered style. A lighter footprint.</p>
        <h1 className="max-w-4xl text-3xl leading-tight text-[#fffdf8] drop-shadow-lg sm:text-4xl md:text-6xl">
          {content.hero?.title || 'Reduce, Reuse, Revamp!<br/>Explore our online thrift shop<br/>For unique, eco-friendly fashion finds.<br/>Shop with us and join the sustainable fashion movement'}
        </h1>
        <Btn text="shop now" className="relative z-0" />
      </div>

      <div className='relative z-20 mx-4 -mt-7 mb-4 grid grid-cols-2 items-center gap-0 rounded-2xl border border-white/10 bg-[#17372e] p-4 text-[#fffdf8] shadow-2xl shadow-[#102a23]/20 sm:mx-8 sm:p-6 lg:mx-auto lg:max-w-6xl lg:grid-cols-4'>
        <div className="border-r border-b border-white/15 p-4 text-center sm:p-5 md:border-b-0">
          <h2 className="text-2xl font-bold text-[#dfc58c] md:text-3xl">7</h2>
          <p className="text-sm text-white/75 md:text-base">years of experience</p>
        </div>
        <div className="border-b border-white/15 p-4 text-center sm:p-5 md:border-r md:border-b-0">
          <h2 className="text-2xl font-bold text-[#dfc58c] md:text-3xl">2</h2>
          <p className="text-sm text-white/75 md:text-base">locations in Kenya</p>
        </div>
        <div className="border-r border-white/15 p-4 text-center sm:p-5">
          <h2 className="text-2xl font-bold text-[#dfc58c] md:text-3xl">1k+</h2>
          <p className="text-sm text-white/75 md:text-base">pieces re-loved</p>
        </div>
        <div className="p-4 text-center sm:p-5">
          <h2 className="text-2xl font-bold text-[#dfc58c] md:text-3xl">260+</h2>
          <p className="text-sm text-white/75 md:text-base">one-of-a-kind finds</p>
        </div>
      </div>
    </>
  )
}
