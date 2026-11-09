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
    <section className="mx-auto max-w-6xl px-4 py-16 text-[#17372e] sm:px-6">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a47b35]">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Let’s talk</h1>

          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-[#e7dfd1] bg-[#fffdf8] p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a47b35]">Phone</p>
              <a href="tel:+254710865376" className="mt-2 block text-lg font-medium text-[#17372e] hover:text-[#a47b35]">
                +254 710 865 376
              </a>
            </div>

            <div className="rounded-2xl border border-[#e7dfd1] bg-[#fffdf8] p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a47b35]">Location</p>
              <p className="mt-2 text-lg text-[#626c63]">
                Opposite One Mall, River Road, Nairobi
              </p>
            </div>

            <div className="rounded-2xl border border-[#e7dfd1] bg-[#fffdf8] p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a47b35]">Business Hours</p>
              <p className="mt-2 text-lg text-[#626c63]">Mon - Sat: 9:00 AM - 7:00 PM</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#e7dfd1] bg-[#fffdf8] p-6 shadow-[0_20px_55px_-38px_rgba(16,42,35,.45)]">
          <h2 className="text-2xl font-semibold text-[#17372e]">Send us a WhatsApp message</h2>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#48564e]">Your name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl border border-[#e7dfd1] bg-white px-3 py-3 focus:border-[#c4a15a] focus:outline-none focus:ring-2 focus:ring-[#c4a15a]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#48564e]">Message</label>
              <textarea
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full rounded-xl border border-[#e7dfd1] bg-white px-3 py-3 focus:border-[#c4a15a] focus:outline-none focus:ring-2 focus:ring-[#c4a15a]/20"
              />
            </div>

            <button
              type="button"
              onClick={handleSend}
              className="w-full rounded-full bg-[#17372e] px-5 py-3 text-base font-semibold text-[#fffdf8] transition hover:bg-[#c4a15a] hover:text-[#102a23]"
            >
              Send on WhatsApp
            </button>
          </div>
        </div>
      </div>

    </section>
  )
}

export default ContactPage
