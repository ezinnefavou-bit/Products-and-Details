import { useEffect, useState } from "react";
import { Link } from "react-router";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=30");
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

  if (loading) return <div className="site-width py-20"><div className="loading-box">Loading products...</div></div>;
  if (error) return <div className="site-width py-20"><div className="loading-box text-red-500">{error}</div></div>;

  return (
    <section className="site-width py-10 sm:py-16">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">The collection</p>
          <h1 className="section-title">All Products</h1>
          <p className="mt-2 text-sm text-slate-400">Browse products directly from DummyJSON.</p>
        </div>
        <span className="text-xs text-slate-400">{products.length} products</span>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`} className="product-card group">
            <div className="product-image-wrap">
              {product.discountPercentage > 0 && <span className="sale-badge">SALE</span>}
              <img src={product.thumbnail} alt={product.title} loading="lazy" />
              <span className="quick-view">View</span>
            </div>
            <div className="pt-4">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-category">{product.category}</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <p className="font-semibold text-[#c96b55]">${product.price.toFixed(2)}</p>
                <span className="text-[10px] tracking-wider text-amber-500"><svg className="inline-block" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" /></svg> {product.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Products;
