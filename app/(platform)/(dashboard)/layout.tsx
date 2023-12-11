import Navbar from "./_components/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <div className="h-full">{children}</div>
    </main>
  );
};
export default DashboardLayout;
