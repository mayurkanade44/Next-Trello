import OrgControl from "./_components/OrgControl";

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <OrgControl />
      {children}
    </div>
  );
};
export default OrganizationIdLayout;
