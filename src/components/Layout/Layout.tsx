import { Outlet } from "react-router-dom";
import DashSidebar from "../DashSidebar";
import Header from "../Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <DashSidebar />
    </div>
  );
};

export default Layout;
