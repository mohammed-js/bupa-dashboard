import { Outlet } from 'react-router-dom';

// project imports
import Customization from '../Customization';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
  <div style={{ backgroundColor: '#f2faff', height: '100vh' }}>
    <Outlet />
    {/* <Customization /> */}
  </div>
);

export default MinimalLayout;
