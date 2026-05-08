import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";
import Expenses from "../components/Expenses";

export default function Landing({
  showNews,
  setShowNews,
  showBlogs,
  setShowBlogs
}) {
  return (
    <>
      <Hero
        username="Mayoor"
        showNews={showNews}
        setShowNews={setShowNews}
        showBlogs={showBlogs}
        setShowBlogs={setShowBlogs}
      />

      <Portfolio showNews={showNews} />

      {/* ✅ FIX */}
      <Expenses showBlogs={showBlogs} />
    </>
  );
}