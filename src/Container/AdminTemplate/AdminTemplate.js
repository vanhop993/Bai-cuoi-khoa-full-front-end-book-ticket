
import React, { useState } from "react";
import { NavLink, Redirect, Route } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import logo from '../../assets/img/logo-cybersoft.png';
import avatar from '../../assets/img/avatar.png';
import { useSelector } from "react-redux";
import HeaderMenuTaiKhoan from "../../Components/HeaderMenuTaiKhoan";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function AdminTemplate({Component,match,renderNamePage,propsRoute}) {
    console.log(match);
    const [state, setState] = useState({
        collapsed: false,
    });
    const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer);
    const onCollapse = (collapsed) => {
        setState({ collapsed });
    };
    return (
        <Layout style={{ minHeight: "100vh" }}>
              <Sider
                collapsible
                collapsed={state.collapsed}
                onCollapse={onCollapse}
              >
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                  <NavLink to='/' className="pt-5 pb-5 text-center d-block">
                    <img
                      style={{ borderRadius: "50%" }}
                      src={logo}
                    />
                    {!state.collapsed ? (
                      <div
                        className="mt-3 font-weight-bold"
                        style={{ fontSize: "1.5rem", color: "yellow" }}
                      >
                        CycberSoft
                      </div>
                    ) : (
                      ""
                    )}
                  </NavLink>
                  <SubMenu key="sub1" icon={<UserOutlined />} title="Phim">
                    <Menu.Item className='p-0' key="3">
                      <NavLink className='d-block w-100 text-center' to="/admin/quanlyphim">Quản lý phim</NavLink>
                    </Menu.Item>
                    <Menu.Item className='p-0' key="4">
                    <NavLink className='d-block w-100 text-center' to="/admin/themphim">Thêm phim</NavLink>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" icon={<TeamOutlined />} title="User">
                    <Menu.Item className='p-0' key="6">
                      <NavLink className='d-block w-100 text-center' to="/admin/quanlynguoidung">
                        Quản lý người dùng
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item className='p-0' key="8">
                      <NavLink className='d-block w-100 text-center' to="/admin/themnguoidung">
                        Thêm người dùng
                      </NavLink>
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key="9" className='p-0' icon={<FileOutlined />}>
                    Files
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background d-flex justify-content-end px-5 bg-warning"
                >
                    <HeaderMenuTaiKhoan avatar={avatar} hoTen={userLogin.hoTen}/> 
                </Header>
                <Content style={{ margin: "0 16px" }}>
                  <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Admin</Breadcrumb.Item>
                    <Breadcrumb.Item>
                      { 
                        renderNamePage(match.path)
                      }
                    </Breadcrumb.Item>
                  </Breadcrumb>
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 360 }}
                  >
                    {Component}
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  Ant Design ©2018 Created by Ant UED
                </Footer>
              </Layout>
            </Layout>
    )
}
