const AboutPage = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 text-[#344F1F]">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F4991A]">About us</p>
          <h1 className="mt-4 text-4xl font-bold">Thrift District</h1>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            We bring together sustainable style, curated second-hand fashion, and everyday affordability.
            Every item is selected to feel unique, useful, and fresh while helping shoppers embrace a more
            conscious way of dressing.
          </p>
          <p className="mt-5 text-lg leading-8 text-gray-700">
            Visit us opposite One Mall, along River Road, where you can explore handpicked styles, discover
            hidden gems, and shop with confidence.
          </p>

          <div className="mt-8 space-y-4 rounded-2xl border border-[#F4991A]/50 bg-[#F9F5F0] p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#62109F]">Location</p>
              <p className="mt-2 text-base text-gray-700">
                Opposite One Mall, River Road, Nairobi, Kenya
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#62109F]">Call us</p>
              <a href="tel:+254710865376" className="mt-2 inline-block text-base font-medium text-[#344F1F] hover:text-[#F4991A]">
                +254 710 865 376
              </a>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
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
