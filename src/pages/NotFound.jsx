import { Link } from "react-router";

function NotFound() {
  return (
    <div className="site-width py-24 text-center">
      <p className="eyebrow">Oops</p>
      <h1 className="mt-2 text-6xl font-black text-slate-900">Sorry</h1>
      <p className="mt-4 text-slate-500">This page does not exist.</p>
      <Link to="/" className="mt-7 inline-block bg-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white">Go back home</Link>
    </div>
  );
}

export default NotFound;
