import { NavLink, Outlet } from "react-router-dom";
import { Button, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Content, Header } from "antd/es/layout/layout";
import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CalendarOutlined,
  PhoneOutlined,
  MedicineBoxOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="w-full h-screen">
      <Layout className="m-0 p-0 w-full h-full">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={220}
          className="bg-white"
          style={{
            position: "fixed",
            height: "100vh",
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          <div className="text-black py-4 text-center font-bold text-xl">
            {collapsed ? "" : "College"}
          </div>
          <Menu theme="light" mode="inline" className="bg-transparent" style={{ color: "black" }}>
            <Menu.Item icon={<DashboardOutlined />} key="1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "font-semibold text-black" : "text-black"
                }
              >
                Dashboard
              </NavLink>
            </Menu.Item>
            <Menu.Item icon={<CalendarOutlined />} key="2">
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  isActive ? "font-semibold text-black" : "text-black"
                }
              >
                Courses
              </NavLink>
            </Menu.Item>
            <Menu.Item icon={<CalendarOutlined />} key="3">
              <NavLink
                to="/university"
                className={({ isActive }) =>
                  isActive ? "font-semibold text-black" : "text-black"
                }
              >
                University
              </NavLink>
            </Menu.Item>
            <Menu.Item icon={<MedicineBoxOutlined />} key="4">
              <NavLink
                to="/UniversityCourses"
                className={({ isActive }) =>
                  isActive ? "font-semibold text-black" : "text-black"
                }
              >
                University Courses
              </NavLink>
            </Menu.Item>
            <Menu.Item icon={<AppstoreAddOutlined />} key="5">
              <NavLink
                to="/college"
                className={({ isActive }) =>
                  isActive ? "font-semibold text-black" : "text-black"
                }
              >
                College
              </NavLink>
            </Menu.Item>
            <Menu.Item icon={<PhoneOutlined />} key="6">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "font-semibold text-black" : "text-black"
                }
              >
                Contact
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout style={{ marginLeft: collapsed ? 80 : 220 }}>
          <Header
            className="bg-white"
            style={{
              padding: 0,
              position: "fixed",
              top: 0,
              width: `calc(100% - ${collapsed ? 80 : 220}px)`,
              zIndex: 10,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "16px", width: 64, height: 64 }}
            />
          </Header>
          <Content
            className="overflow-y-auto"
            style={{
              margin: "88px 16px 24px",
              padding: 5,
              minHeight: "calc(100vh - 88px)",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
