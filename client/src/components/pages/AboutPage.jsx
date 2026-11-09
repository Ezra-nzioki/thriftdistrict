const AboutPage = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-[#17372e] sm:px-6">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a47b35]">About us</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Thrift District</h1>
          <p className="mt-6 text-lg leading-8 text-[#626c63]">
            We bring together sustainable style, curated second-hand fashion, and everyday affordability.
            Every item is selected to feel unique, useful, and fresh while helping shoppers embrace a more
            conscious way of dressing.
          </p>
          <p className="mt-5 text-lg leading-8 text-[#626c63]">
            Visit us opposite One Mall, along River Road, where you can explore handpicked styles, discover
            hidden gems, and shop with confidence.
          </p>

          <div className="mt-8 space-y-4 rounded-2xl border border-[#c4a15a]/35 bg-[#fffdf8] p-6 shadow-[0_12px_35px_-24px_rgba(16,42,35,.3)]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a47b35]">Location</p>
              <p className="mt-2 text-base text-[#626c63]">
                Opposite One Mall, River Road, Nairobi, Kenya
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a47b35]">Call us</p>
              <a href="tel:+254710865376" className="mt-2 inline-block text-base font-medium text-[#17372e] hover:text-[#a47b35]">
                +254 710 865 376
              </a>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#c4a15a]/25 p-1 shadow-xl shadow-[#102a23]/10">
          <iframe
            title="Thrift District location"
            src="https://www.google.com/maps?q=One%20Mall%20River%20Road%20Nairobi&z=15&output=embed"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}

export default AboutPage
