import DashboardSidebar from "../../components/DashboardSidebar";
const DashboardLayout = () => {
  return (
    <div className="hidden lg:fixed lg:inset-y-20 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <DashboardSidebar />
      <div>hello from DashboardLayout</div>
    </div>
  );
};

export default DashboardLayout;
