function Contact() {
  return (
    <section className="site-width py-10 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Get in touch</p>
          <h1 className="section-title">Contact us.</h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-slate-500">Have a question about a product or the storefront? Send a message using the form and we will get back to you.</p>
          <div className="mt-8 space-y-3 text-sm text-slate-500">
            <p>Phone: (+1) 000 123 456</p>
            <p>Email: hello@theluxestore.com</p>
            <p>123 Main Street, New York, NY 10001</p>
          </div>
        </div>
        <form className="border border-slate-100 bg-[#f8f8f6] p-6 sm:p-8" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-5">
            <input className="border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#c96b55]" placeholder="Your name" />
            <input type="email" className="border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#c96b55]" placeholder="Email address" />
            <textarea rows="6" className="resize-none border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#c96b55]" placeholder="Your message" />
            <button type="submit" className="bg-slate-900 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#c96b55]">Send message</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
