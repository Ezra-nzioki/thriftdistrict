import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
	const year = new Date().getFullYear()
	return (
		<footer className="overflow-hidden border-t-4 border-[#e36414] bg-[#0f4c5c] text-[#e5eeea]">
			<div className="max-w-6xl mx-auto px-4 py-10">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<h3 className="text-xl font-semibold tracking-wide text-[#e5eeea]">Thrift District</h3>
						<p className="mt-2 text-sm text-[#e5eeea]/75">Curated second-hand fashion that feels new.</p>
					</div>

					<nav className="md:col-span-1">
						<h4 className="text-sm font-semibold uppercase tracking-widest text-[#e5eeea]">Shop</h4>
						<ul className="mt-3 space-y-2 text-sm text-[#e5eeea]/75">
							<li><a href="/#all-products" className="transition hover:text-[#e5eeea]">Browse all products</a></li>
							<li><Link to="/about" className="transition hover:text-[#e5eeea]">About us</Link></li>
							<li><Link to="/contact" className="transition hover:text-[#e5eeea]">Contact</Link></li>
						</ul>
					</nav>

					<div className="md:col-span-1">
						<h4 className="text-sm font-semibold uppercase tracking-widest text-[#e5eeea]">Visit or call</h4>
						<p className="mt-3 text-sm leading-relaxed text-[#e5eeea]/75">Opposite One Mall, River Road<br />Nairobi, Kenya</p>
						<a href="tel:+254710865376" className="mt-3 inline-block text-sm text-[#e5eeea]/85 transition hover:text-[#e5eeea]">+254 710 865 376</a>
					</div>
				</div>

				<div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#e5eeea]/20 pt-6 text-sm text-[#e5eeea]/60 md:flex-row">
					<p>© {year} Thrift District. All rights reserved.</p>
					<div className="flex gap-4">
						<Link to="/about" className="transition hover:text-[#e5eeea]">About</Link>
						<Link to="/contact" className="transition hover:text-[#e5eeea]">Contact</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
