function About() {
  return (
    <section className="site-width py-14 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Our story</p>
        <h1 className="section-title">Simple shopping, beautifully presented.</h1>
        <p className="mt-6 text-sm leading-7 text-slate-500">The Luxe is a frontend e-commerce experience built around the DummyJSON product catalog. The goal is to combine a clean editorial layout with straightforward navigation and useful product information.</p>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          ["Live catalog", "Products and product details are loaded directly from DummyJSON."],
          ["Easy navigation", "Each section has its own route, while the shared layout stays consistent."],
          ["Responsive design", "The storefront adapts smoothly across desktop, tablet, and mobile screens."]
        ].map(([title, text]) => (
          <div key={title} className="border border-slate-100 bg-[#f8f8f6] p-7">
            <h2 className="font-semibold text-slate-800">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
