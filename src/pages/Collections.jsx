import { useEffect, useState } from "react";
import { Link } from "react-router";

function Collections() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch("https://dummyjson.com/products?limit=100"),
          fetch("https://dummyjson.com/products/category-list")
        ]);

        if (!productsResponse.ok || !categoriesResponse.ok) throw new Error("Unable to load collections");

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();
        setProducts(productsData.products || []);
        setCategories(categoriesData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  const filtered = activeCategory === "all"
    ? products
    : products.filter((product) => product.category === activeCategory);

  if (loading) return <div className="site-width py-20"><div className="loading-box">Loading collections...</div></div>;
  if (error) return <div className="site-width py-20"><div className="loading-box text-red-500">{error}</div></div>;

  return (
    <section className="site-width py-10 sm:py-16">
      <div className="mb-10">
        <p className="eyebrow">Explore the edit</p>
        <h1 className="section-title">Collections</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">Shop the live DummyJSON catalog by category.</p>
      </div>

      <div className="mb-10 flex flex-wrap gap-3">
        <button onClick={() => setActiveCategory("all")} className={activeCategory === "all" ? "category-active text-xs" : "text-xs text-slate-400 hover:text-[#c96b55]"}>All</button>
        {categories.map((category) => (
          <button key={category} onClick={() => setActiveCategory(category)} className={activeCategory === category ? "category-active text-xs" : "text-xs capitalize text-slate-400 hover:text-[#c96b55]"}>
            {category.replaceAll("-", " ")}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`} className="product-card group">
            <div className="product-image-wrap">
              {product.discountPercentage > 0 && <span className="sale-badge">SALE</span>}
              <img src={product.thumbnail} alt={product.title} loading="lazy" />
              <span className="quick-view">View</span>
            </div>
            <div className="pt-4">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-category">{product.category}</p>
              <p className="mt-2 font-semibold text-[#c96b55]">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Collections;
