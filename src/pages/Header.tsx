import React, { useState } from 'react'
import axios from 'axios';
import { Layout, Menu, Avatar, Dropdown, Typography, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Loader } from '../components/Loader';
import "../styles/header.css"

const { Header } = Layout;
const { Title } = Typography;

const AppHeader: React.FC = () => {

  const API_URL = import.meta.env.VITE_API_URL; 
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async() =>{
    try{
      setIsLoading(true);
      await axios.post(`${API_URL}/auth/logout`, {}, {withCredentials: true})
      message.success("Logged out successfully!");

      window.location.href = '/';
    }
    catch{
      message.error("Unable to log out!")
    }
    finally{
      setIsLoading(false)
    }
  };


  if (isLoading) return <Loader/> 
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "40px 20px",
      }}
    >
      {/* LOGO ON THE LEFT */}
      <Title level={4} className="headerTitle" >MULTI-FACTOR AUTHENTICATION ADMINISTRATOR</Title>

      {/* USER PROFILE ON THE RIGHT */}
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="1">Profile</Menu.Item>
            <Menu.Item key="2" onClick={handleLogout}>Logout</Menu.Item>
          </Menu>
        }
      >
        <Avatar  style={{ cursor: "pointer", backgroundColor: "#1677ff" }} icon={<UserOutlined></UserOutlined>}/>
      </Dropdown>
    </Header>
  )
}

export default AppHeader