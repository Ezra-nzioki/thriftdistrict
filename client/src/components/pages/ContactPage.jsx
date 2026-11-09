import { useState } from 'react'

const ContactPage = () => {
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')

  const whatsappNumber = '254710865376'

  const handleSend = (event) => {
    event.preventDefault()
    const cleanMessage = message.trim()
    const cleanName = name.trim()

    if (!cleanMessage) return

    const text = encodeURIComponent(
      cleanName ? `Hello, my name is ${cleanName}. ${cleanMessage}` : cleanMessage
    )

    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-[#0f4c5c] sm:px-6 lg:py-20">
      <header className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#335c67] decoration-2 underline decoration-[#e36414] underline-offset-8">Contact</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">We’d love to hear from you</h1>
        <p className="mt-4 text-lg leading-8 text-[#344e41]">
          Ask us about a piece, get help with an order, or come visit us in Nairobi.
        </p>
      </header>

      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#335c67] bg-[#eef3ee] p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#344e41]">Phone</p>
              <a href="tel:+254710865376" className="mt-2 block text-lg font-medium text-[#0f4c5c] hover:text-[#335c67]">
                +254 710 865 376
              </a>
            </div>

            <div className="rounded-2xl border border-[#335c67] bg-[#eef3ee] p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#344e41]">Location</p>
              <p className="mt-2 text-lg text-[#344e41]">
                Opposite One Mall, River Road, Nairobi
              </p>
            </div>

            <div className="rounded-2xl border border-[#335c67] bg-[#eef3ee] p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#344e41]">Business Hours</p>
              <p className="mt-2 text-lg text-[#344e41]">Mon - Sat: 9:00 AM - 7:00 PM</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSend}
          className="rounded-3xl border-t-4 border-[#e36414] bg-[#eef3ee] p-6 shadow-[0_20px_55px_-38px_rgba(15,76,92,.24)] sm:p-8"
        >
          <h2 className="text-2xl font-semibold text-[#0f4c5c]">Send us a WhatsApp message</h2>
          <p className="mt-2 text-sm leading-6 text-[#344e41]">Your message will open in WhatsApp so you can review it before sending.</p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-[#344e41]">Your name <span className="font-normal">(optional)</span></label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                className="w-full rounded-xl border border-[#335c67] bg-[#eef3ee] px-4 py-3 focus:border-[#344e41] focus:outline-none focus:ring-2 focus:ring-[#344e41]/20"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-[#344e41]">Message</label>
              <textarea
                id="contact-message"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                required
                className="w-full resize-y rounded-xl border border-[#335c67] bg-[#eef3ee] px-4 py-3 focus:border-[#344e41] focus:outline-none focus:ring-2 focus:ring-[#344e41]/20"
              />
            </div>

            <button type="submit" className="w-full rounded-full bg-[#0f4c5c] px-5 py-3 text-base font-semibold text-[#e5eeea] transition hover:bg-[#344e41]">
              Send on WhatsApp
            </button>
          </div>
        </form>
      </div>

      <section aria-labelledby="contact-map-title" className="mt-12 overflow-hidden rounded-3xl border-t-4 border-[#e36414] bg-[#eef3ee] shadow-sm">
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#335c67]">Find us</p>
            <h2 id="contact-map-title" className="mt-2 text-2xl font-semibold text-[#0f4c5c]">Visit our Nairobi shop</h2>
            <p className="mt-1 text-[#344e41]">Opposite One Mall, River Road, Nairobi, Kenya</p>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=One+Mall+River+Road+Nairobi"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-[#344e41]/30 px-5 py-2 font-semibold text-[#344e41] transition hover:border-[#344e41] hover:bg-[#344e41]/5"
          >
            Get directions
          </a>
        </div>
        <iframe
          title="Map showing Thrift District near One Mall on River Road, Nairobi"
          src="https://www.google.com/maps?q=One%20Mall%20River%20Road%20Nairobi&z=15&output=embed"
          className="h-72 w-full border-0 sm:h-96"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </section>
  )
}

export default ContactPage
