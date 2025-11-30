import React from 'react'

const Footer = () => {
	const year = new Date().getFullYear()
	return (
		<footer className="bg-[#344F1F] text-[#F9F5F0] overflow-hidden">
			<div className="max-w-6xl mx-auto px-4 py-10">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<h3 className="text-xl font-semibold text-[#F4991A]">Thrift District</h3>
						<p className="mt-2 text-[#F9F5F0] text-sm opacity-80">Curated second-hand fashion that feels new.</p>
						<div className="flex gap-3 mt-4">
							<a href="#" aria-label="Twitter" className="p-2 rounded-md hover:bg-[#62109F] transition">
								<svg className="w-5 h-5 text-[#F4991A]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.12 9.12 0 0 1-2.88 1.1A4.51 4.51 0 0 0 12.07 5a12.8 12.8 0 0 1-9.29-4.7 4.5 4.5 0 0 0 1.39 6.02A4.41 4.41 0 0 1 1.8 6.6v.06A4.5 4.5 0 0 0 4.5 11a4.52 4.52 0 0 1-2 .07 4.5 4.5 0 0 0 4.2 3.12A9 9 0 0 1 1 18.57 12.8 12.8 0 0 0 7 20c8.29 0 12.84-6.87 12.84-12.84v-.58A9.22 9.22 0 0 0 23 3z"/></svg>
							</a>
							<a href="#" aria-label="Instagram" className="p-2 rounded-md hover:bg-[#62109F] transition">
								<svg className="w-5 h-5 text-[#F4991A]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2A4.8 4.8 0 1 0 16.8 13 4.8 4.8 0 0 0 12 8.2zM18.5 5.2a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2z"/></svg>
							</a>
							<a href="#" aria-label="Facebook" className="p-2 rounded-md hover:bg-[#62109F] transition">
								<svg className="w-5 h-5 text-[#F4991A]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.2v-2.9h2.2V9.1c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.1h-1.07c-1.06 0-1.38.66-1.38 1.34v1.6h2.35l-.38 2.9h-1.97v7A10 10 0 0 0 22 12z"/></svg>
							</a>
						</div>
					</div>

					<nav className="md:col-span-1">
						<h4 className="text-sm font-medium text-[#F4991A]">Shop</h4>
						<ul className="mt-3 space-y-2 text-sm text-[#F9F5F0] opacity-80">
							<li><a href="#" className="hover:text-[#F4991A] transition">New Arrivals</a></li>
							<li><a href="#" className="hover:text-[#F4991A] transition">Best Sellers</a></li>
							<li><a href="#" className="hover:text-[#F4991A] transition">Categories</a></li>
							<li><a href="#" className="hover:text-[#F4991A] transition">Sale</a></li>
						</ul>
					</nav>

					<div className="md:col-span-1">
						<h4 className="text-sm font-medium text-[#F4991A]">Join our newsletter</h4>
						<p className="text-xs text-[#F9F5F0] opacity-80 mt-2">Get 10% off your first order and updates.</p>
						<form className="mt-3 flex gap-2" onSubmit={(e)=>e.preventDefault()}>
							<label htmlFor="footer-email" className="sr-only">Email</label>
							<input id="footer-email" type="email" placeholder="you@domain.com" className="flex-1 bg-[#62109F] text-[#F9F5F0] placeholder-[#F9F5F0] placeholder-opacity-50 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F4991A]" />
							<button className="px-4 py-2 rounded-md bg-[#F4991A] text-[#344F1F] text-sm font-semibold hover:bg-[#E07A0D] transition">Subscribe</button>
						</form>
					</div>
				</div>

				<div className="mt-8 border-t border-[#F4991A] border-opacity-30 pt-6 text-sm text-[#F9F5F0] opacity-70 flex flex-col md:flex-row items-center justify-between gap-4">
					<p>© {year} Thrift District. All rights reserved.</p>
					<div className="flex gap-4">
						<a href="#" className="hover:text-[#F4991A] transition">Privacy</a>
						<a href="#" className="hover:text-[#F4991A] transition">Terms</a>
						<a href="#" className="hover:text-[#F4991A] transition">Contact</a>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
