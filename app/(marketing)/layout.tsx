import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="pt-24 bg-slate-100">{children}</main>
      <Footer />
    </div>
  );
};
export default MarketingLayout;
