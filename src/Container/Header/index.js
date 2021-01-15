import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../logo-cybersoft.png";
import avatar from "./img/avatar.png";
import { dangXuatAction } from "../../Redux/Action/QuanLyNguoiDungAction";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import HeaderMenuTaiKhoan from "../../Components/HeaderMenuTaiKhoan";
import { scrollSpyAction } from "../../Redux/Action/ScrollSpyAction";

function Header() {
  const [navMobile, setNavMoble] = useState(false);
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   setNavMoble(false);
  // }, [])
  const handleNavMoble = () => {
    setNavMoble(!navMobile);
  };
  const dangXuat = () => {
    dispatch(dangXuatAction());
    window.location.reload();
  };
  const handleScrollSpy = (name) => {
    dispatch(scrollSpyAction(name));
  };
  return (
    <header className="header-container">
      <nav className="nav-container">
        <NavLink className="nav-logo" to="/">
          <h1 className="text-dark m-0">
            <img src={logo} alt="CyberSoft Logo" />
          </h1>
        </NavLink>
        <FaBars className="nav-bars" onClick={handleNavMoble} />
        <div className={navMobile ? "nav-menu active" : "nav-menu"}>
          <div className="nav-mobile">
            <a className="nav-item" onClick={handleNavMoble}>
              X
            </a>
            {userLogin ? (
              <div className="d-flex w-100 nav-user-container">
                <img className="mr-1 nav-user-avatar" src={avatar} />
                <div className="text-dark">{userLogin.hoTen}</div>
              </div>
            ) : (
              <>
                <NavLink className="nav-btn-link" to="/dangnhap">
                  Đăng nhập
                </NavLink>
                <NavLink className="nav-btn-link" to="/dangky">
                  Đăng ký
                </NavLink>
              </>
            )}
          </div>
          <NavLink
            className="nav-item"
            to="/"
            onClick={() => {
              handleScrollSpy("lichChieu");
              handleNavMoble();
            }}
          >
            Lich chiếu
          </NavLink>
          <NavLink
            className="nav-item"
            to="/"
            onClick={() => {
              handleScrollSpy("cumRap");
              handleNavMoble();
            }}
          >
            Cụm rạp
          </NavLink>
          <NavLink
            className="nav-item"
            to="/"
            onClick={() => {
              handleScrollSpy("tinTuc");
              handleNavMoble();
            }}
          >
            Tin tức
          </NavLink>
          <NavLink
            className="nav-item"
            to="/"
            onClick={() => {
              handleScrollSpy("ungDung");
              handleNavMoble();
            }}
          >
            Ứng dụng
          </NavLink>
          <a
            className="w-100 d-block d-md-none nav-logout-mobile"
            onClick={() => dangXuat()}
          >
            Đăng xuất
          </a>
        </div>
        <nav className="nav-btn">
          {userLogin ? (
            <HeaderMenuTaiKhoan avatar={avatar} hoTen={userLogin.hoTen} />
          ) : (
            <>
              <NavLink className="nav-btn-link text-nowrap" to="/dangnhap">
                Đăng nhập
              </NavLink>
              <NavLink className="nav-btn-link text-nowrap" to="/dangky">
                Đăng ký
              </NavLink>
            </>
          )}
        </nav>
      </nav>
    </header>
  );
}

export default React.memo(Header);
