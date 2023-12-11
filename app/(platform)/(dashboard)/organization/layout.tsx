const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="pt-20 px-5 mx-auto">
      <div className="flex gap-x-7">
        <div className="w-64 shrink-0 hidden md:block">Sidebar</div> {children}
      </div>
    </main>
  );
};
export default OrganizationLayout;
