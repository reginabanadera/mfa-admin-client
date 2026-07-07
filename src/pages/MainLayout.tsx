import { Layout, Breadcrumb } from "antd";
import AppHeader from "./Header";
import Sidebar from "./Sidebar"; // Import Sidebar
import React from "react";


const {  Content, Footer } = Layout;

interface MainLayoutProps {
  title: string,
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({title, children}) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar /> 

      <Layout style={{ padding: "0 24px 24px" }}>
        <AppHeader />
        <Content
          style={{ padding: 24, margin: 0, minHeight: 280, background: "#fff" }}
        >
        
          <Breadcrumb 
            style={{ margin: "5px 24px" }}
            items={[
              { title: "Home" },
              { title: title }
            ]}
          />
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>© 2025 KINTETSU WORLD EXPRESS (PHILIPPINES) INC.</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;