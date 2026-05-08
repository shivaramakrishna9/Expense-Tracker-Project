import PortfolioPie from "./PortfolioPie";
import NewsCard from "./NewsCard";

export default function Portfolio({ showNews }) {
  return (
    <section id="portfolio" className="h-screen flex flex-col justify-center px-20">

      {/* TITLE */}
      <h2 className="text-5xl font-bold text-center mb-12">
        Portfolio Overview
      </h2>

      <div className="flex justify-between items-center">

        {/* LEFT PIE */}
        <div className="w-1/2 flex justify-center">
          <PortfolioPie />
        </div>

        {/* RIGHT DATA */}
        <div className="w-1/2 space-y-4">

          <div className="flex justify-between font-semibold border-b pb-2">
            <span>Investment</span>
            <span>Amount</span>
            <span>Returns</span>
          </div>

          <div className="flex justify-between">
            <span>Nifty50</span>
            <span>₹40,000</span>
            <span className="text-green-600">+8%</span>
          </div>

          <div className="flex justify-between">
            <span>HDFC Fund</span>
            <span>₹30,000</span>
            <span className="text-green-600">+6%</span>
          </div>

          <div className="flex justify-between">
            <span>Gold ETF</span>
            <span>₹20,000</span>
            <span className="text-red-500">-2%</span>
          </div>

        </div>
      </div>

      {/* CONDITIONAL NEWS */}
      {showNews && (
        <div className="grid grid-cols-3 gap-4 mt-10">
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </div>
      )}

    </section>
  );
}