import { Sidebar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { MdCastForEducation } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { HiChartPie, HiUsers } from 'react-icons/hi';
import { HiMiniUsers } from 'react-icons/hi2';

const DashSidebar = () => {
  return (
    <div>
      <Sidebar>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to="/" className="mb-5 inline-block">
              <Sidebar.Item
                icon={MdCastForEducation}
                className="text-2xl"
                as="div"
              >
                EduAdmin
              </Sidebar.Item>
            </Link>
            <Link to="/" className="mt-8 inline-block">
              <Sidebar.Item icon={HiChartPie} as="div">
                Dashboard
              </Sidebar.Item>
            </Link>
            <Link to="/students">
              <Sidebar.Item icon={HiMiniUsers} as="div">
                Students
              </Sidebar.Item>
            </Link>
            <Link to="/teachers">
              <Sidebar.Item icon={HiUsers} as="div">
                Teachers
              </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default DashSidebar;
