import { useState } from 'react'

const ContactPage = () => {
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')

  const whatsappNumber = '254710865376'

  const handleSend = () => {
    const cleanMessage = message.trim()
    const cleanName = name.trim()

    if (!cleanMessage) return

    const text = encodeURIComponent(
      cleanName ? `Hello, my name is ${cleanName}. ${cleanMessage}` : cleanMessage
    )

    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 text-[#344F1F]">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F4991A]">Contact</p>
          <h1 className="mt-4 text-4xl font-bold">Let’s talk</h1>

          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-[#F9F5F0] p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#62109F]">Phone</p>
              <a href="tel:+254710865376" className="mt-2 block text-lg font-medium text-[#344F1F] hover:text-[#F4991A]">
                +254 710 865 376
              </a>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-[#F9F5F0] p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#62109F]">Location</p>
              <p className="mt-2 text-lg text-gray-700">
                Opposite One Mall, River Road, Nairobi
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-[#F9F5F0] p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#62109F]">Business Hours</p>
              <p className="mt-2 text-lg text-gray-700">Mon - Sat: 9:00 AM - 7:00 PM</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-[#344F1F]">Send us a WhatsApp message</h2>

          <div className="mt-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl border border-gray-300 px-3 py-3 focus:border-[#62109F] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full rounded-xl border border-gray-300 px-3 py-3 focus:border-[#62109F] focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleSend}
              className="w-full rounded-xl bg-[#25D366] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#1DAE52]"
            >
              Send on WhatsApp
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
        <iframe
          title="Thrift District map"
          src="https://www.google.com/maps?q=One%20Mall%20River%20Road%20Nairobi&z=15&output=embed"
          width="100%"
          height="420"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}

export default ContactPage
