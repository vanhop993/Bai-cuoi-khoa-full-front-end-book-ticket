import React from "react";
import { Redirect, Route } from "react-router-dom";
import AdminTemplate from "../Container/AdminTemplate/AdminTemplate";

export const ProtectedAdmin = (props) => {
  const { Component, ...resParams } = props;
  const renderNamePage = (url) => {
    switch (url) {
      case "/admin/quanlyphim": {
        return "Quản lý phim";
      }
      case "/admin/themphim": {
        return "Thêm phim";
      }
      case "/admin/quanlynguoidung": {
        return "Quản lý người dùng";
      }
      case "/admin/themnguoidung": {
        return "Thêm người dung";
      }
      default:
        break;
    }
  };
  return (
    <Route
      {...resParams}
      render={({ location, match }, propsRoute) => {
        if (props.user?.maLoaiNguoiDung === "QuanTri") {
          return (
            <AdminTemplate
              match={match}
              propsRoute={propsRoute}
              renderNamePage={renderNamePage}
              Component={<Component {...propsRoute} />}
            />
          );
        }
        if (props.user?.maLoaiNguoiDung === "KhachHang" || !props.user) {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          );
        }
        return null;
      }}
    />
  );
};
