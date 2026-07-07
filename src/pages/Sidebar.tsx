import React from 'react';
import { Layout, Menu } from "antd";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';


const { Sider }= Layout;

const items = [
  {
    key: "/Home",
    icon: <HomeOutlined/>,
    label: "Home"
  },
  {
    key: 2,
    icon: <SettingOutlined/>,
    label: "Configuration",
    children: [
      { key: "/configUserManagement", label: "User Management"}
    ]
  }
];

const Sidebar : React.FC = () => {

  const navigate = useNavigate();

  const onClick = ({ key } : { key : string }) => {
    navigate(key)
  }



  return (
    <Sider width={300} className="site-layout-background">
    {/* LOGO */}
    <div
        style={{
          height: "64px",
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          padding: "10px",
          background: "#FFF"
        }}
      >
        <img
          src="../images/sims_logo.png" // Make sure your path is correct
          alt="Logo"
          style={{ width: "100px" }} // Adjust size
        />
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
        items = {items}
        onClick={onClick}
      >
        
      </Menu>
    </Sider>
  )
}

export default Sidebar