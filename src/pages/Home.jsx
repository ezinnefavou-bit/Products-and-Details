import { useEffect, useState } from "react";
import { Link } from "react-router";

const categories = ["All", "Beauty", "Fragrances", "Furniture", "Groceries"];

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/products?limit=12");
        if (!response.ok) throw new Error("Unable to load products");
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory.toLowerCase());

  const hero = products[0];
  const featured = products.slice(0, 4);

  return (
    <>
      <section className="site-width pt-5 sm:pt-8">
        {loading ? (
          <div className="loading-box">Loading products...</div>
        ) : error ? (
          <div className="loading-box text-red-500">{error}</div>
        ) : (
          <>
            <div className="hero-grid">
              <div className="hero-copy">
                <div className="relative z-10 max-w-md">
                  <p className="eyebrow">Featured collection</p>
                  <h1>Always Be<br />A Gentleman.</h1>
                  <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">
                    Discover carefully selected products from DummyJSON, presented in a clean luxury-inspired storefront.
                  </p>
                  <Link to={hero ? `/products/${hero.id}` : "/products"} className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c96b55]">
                    Shop now <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
                  </Link>
                </div>
                {hero && <img src={hero.thumbnail} alt={hero.title} className="hero-image" />}
              </div>

              <div className="hero-side">
                <p className="eyebrow">Today's highlight</p>
                <h2>{hero?.title || "New arrivals"}</h2>
                <p className="mt-2 text-sm text-white/80">Up to {hero?.discountPercentage || 10}% off selected items.</p>
                <Link to={hero ? `/products/${hero.id}` : "/products"} className="mt-5 inline-block border border-white/60 px-5 py-2 text-[11px] font-semibold uppercase tracking-widest hover:bg-white hover:text-[#d85b43] transition">View item</Link>
              </div>
            </div>

            <div className="promo-grid mt-3">
              {featured.slice(1, 4).map((product) => (
                <Link key={product.id} to={`/products/${product.id}`} className="promo-card group">
                  <img src={product.thumbnail} alt={product.title} />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400">Featured</p>
                    <h3>{product.title}</h3>
                    <p className="mt-2 font-semibold text-[#c96b55]">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      <section className="site-width py-14 sm:py-20">
        <div className="brand-row" aria-label="Brand partners">
          {['LUMI', 'NOVA', 'MARA', 'STUDIO 20', 'GLOBE'].map((brand) => <span key={brand}>{brand}</span>)}
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:mt-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Shop the edit</p>
            <h2 className="section-title">Trending Products</h2>
            <p className="mt-2 text-sm text-slate-400">The most interesting products from our live catalog.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
            {categories.map((category) => (
              <button key={category} onClick={() => setActiveCategory(category)} className={activeCategory === category ? "category-active" : "hover:text-[#c96b55]"}>{category}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loading-box mt-8">Loading products...</div>
        ) : error ? (
          <div className="loading-box mt-8 text-red-500">Could not load products.</div>
        ) : (
          <div className="product-grid mt-8">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link to="/products" className="outline-btn">View all products</Link>
        </div>
      </section>
    </>
  );
}

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="product-card group">
      <div className="product-image-wrap">
        {product.discountPercentage > 0 && <span className="sale-badge">SALE</span>}
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
        <span className="quick-view">View</span>
      </div>
      <div className="pt-4">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="font-semibold text-[#c96b55]">${product.price.toFixed(2)}</p>
          <span className="text-[10px] tracking-wider text-amber-500"><svg className="inline-block" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" /></svg> {product.rating}</span>
        </div>
      </div>
    </Link>
  );
}

export default Home;
