import { Btn } from '../common/btn'

export const Hero = ({ content }) => {
  return (
    <>
      <div
        className="relative isolate flex min-h-[540px] w-full flex-col items-center justify-center gap-6 overflow-hidden px-6 py-16 text-center font-bold sm:min-h-[620px] sm:px-10"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(15, 76, 92, .86), rgba(15, 76, 92, .5)), url(${content.hero?.image || 'https://via.placeholder.com/800'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#e5eeea]">Considered style. A lighter footprint.</p>
        <h1 className="max-w-4xl text-3xl leading-tight text-white drop-shadow-lg sm:text-4xl md:text-6xl">
          {content.hero?.title || 'Find pieces with a past. Style them your way.'}
        </h1>
        <Btn text="shop now" className="relative z-0" />
      </div>
    </>
  )
}
