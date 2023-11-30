import { Sidebar } from "../_components/sidebar";

const OrganizationLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="pt-4 md:pt-6 px-2 max-w-7xl 2xl:max-w-screen-xl mx-6 ">
      {/* <div className="flex gap-x-7"> */}
        {/* <div className="w-64 shrink-0 hidden md:block">
          
        </div> */}
        {children}
      {/* </div> */}
    </main>
  );
};

export default OrganizationLayout;