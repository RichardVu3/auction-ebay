import DashboardSidebar from "../../components/DashboardSidebar";
const DashboardLayout = () => {
  return (
    <div className="bg-gray-400 flex min-h-full flex-col">
      {/* 3 column wrapper */}
      <div className="bg-red-100 mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
        {/* Left sidebar & main wrapper */}
        <div className="bg-sky-100 flex-1 xl:flex">
          <div className="border-b border-gray-200 px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6">
            {/* Left column area */}
            LEFT COL AREA
            <DashboardSidebar />
          </div>

          <div className="bg-green-100 px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            {/* Main area */}
            MAIN AREA
          </div>
        </div>

        <div className="bg-yellow-100 shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
          {/* Right column area */}
          RIGHT COL
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
