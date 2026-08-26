const posts = [
  { title: "How to choose products with confidence", text: "A simple guide to comparing descriptions, ratings, prices, and available stock." },
  { title: "Building a cleaner online storefront", text: "Small layout choices can make a product catalog feel easier to explore." },
  { title: "A closer look at our collections", text: "Browse the live catalog by category and discover products that match your interests." }
];

function Blog() {
  return (
    <section className="site-width py-10 sm:py-16">
      <div className="mb-10">
        <p className="eyebrow">From the journal</p>
        <h1 className="section-title">Blog</h1>
        <p className="mt-2 text-sm text-slate-400">Ideas and notes from The Luxe.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((post, index) => (
          <article key={post.title} className="border border-slate-100 bg-[#f7f7f5] p-7">
            <span className="text-xs text-[#c96b55]">0{index + 1}</span>
            <h2 className="mt-5 text-xl font-medium tracking-tight text-slate-800">{post.title}</h2>
            <p className="mt-4 text-sm leading-6 text-slate-500">{post.text}</p>
            <button className="mt-6 text-[10px] font-bold uppercase tracking-widest text-[#c96b55]">Read more</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Blog;
