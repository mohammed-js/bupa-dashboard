import { Outlet } from "react-router-dom";

const MinimalLayout = () => (
  <div style={{ backgroundColor: "#f2faff", height: "100vh" }}>
    <Outlet />
  </div>
);

export default MinimalLayout;
