import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../logo-cybersoft.png";
import { dangKyAction } from "../Redux/Action/QuanLyNguoiDungAction";

export default function DangKy() {
  const [valueDangKy, setValueDangKy] = useState();
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const handleBlur = (e) => {
    let { name, value, placeholder } = e.target;
    setValueDangKy({ ...valueDangKy, [name]: value });
    if (value.trim() === "") {
      setError({ ...error, [name]: `${placeholder} không được bỏ trống` });
      return;
    }
    if (name === "matKhau") {
      if (value.length < 6) {
        setError({
          ...error,
          [name]: `${placeholder} không được nhỏ hơn 6 ký tự`,
        });
        return;
      }
    }
    let regex = /^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/;
    if (
      name === "taiKhoan" ||
      name === "matKhau" ||
      name === "xacNhanMatKhau" ||
      name === "email"
    ) {
      if (!regex.test(value.trim())) {
        setError({
          ...error,
          [name]: `${placeholder} không được có ký tự đặc biệt`,
        });
        return;
      }
    }
    let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name === "email") {
      if (!regexEmail.test(value.trim())) {
        setError({ ...error, [name]: `${placeholder} không đúng định dạng` });
        return;
      }
    }
    if (name === "xacNhanMatKhau") {
      if (valueDangKy.matKhau !== value.trim()) {
        setError({ ...error, [name]: `${placeholder} không đúng` });
        return;
      }
    }
    setError({ ...error, [name]: "" });
    setValueDangKy({ ...valueDangKy, [name]: value });
  };
  const handleChange = (e) => {
    let { name } = e.target;
    setError({ ...error, [name]: "" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let arrValuesError = Object.values(error);
    let soInput = document.querySelectorAll("input[name]").length;
    if (arrValuesError.length < soInput) {
      Swal.fire("Thông báo", "Vui lòng nhập đầy đủ các trường trên!!", "error");
      return;
    }
    let newTaiKhoan = {
      taiKhoan: valueDangKy?.taiKhoan,
      matKhau: valueDangKy?.matKhau,
      email: valueDangKy?.email,
      soDt: valueDangKy?.soDt,
      maNhom: "GP01",
      maLoaiNguoiDung: "KhachHang",
      hoTen: valueDangKy?.hoTen,
    };
    for (let item of arrValuesError) {
      if (item) {
        return;
      }
    }
    dispatch(dangKyAction(newTaiKhoan));
  };
  return (
    <div className="dang-nhap">
      <div className="form-dang-nhap text-light">
        <div className="text-center">
          <NavLink to="/">
            <img src={logo} alt="logo-cybersoft" />
          </NavLink>
        </div>
        <h3 className="text-center text-light">Đăng ký</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group py-1">
            <input
              className="form-control"
              name="taiKhoan"
              type="text"
              placeholder="Tài khoản"
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
            />
            <div className="text-danger">{error.taiKhoan}</div>
          </div>
          <div className="form-group py-1">
            <input
              className="form-control"
              name="matKhau"
              type="password"
              placeholder="Mật khẩu"
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
            />
            <div className="text-danger">{error.matKhau}</div>
          </div>
          <div className="form-group py-1">
            <input
              className="form-control"
              name="xacNhanMatKhau"
              type="password"
              placeholder="Xác nhận mật khẩu "
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
            />
            <div className="text-danger">{error.xacNhanMatKhau}</div>
          </div>
          <div className="form-group py-1">
            <input
              className="form-control"
              name="hoTen"
              type="text"
              placeholder="Họ tên"
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
            />
            <div className="text-danger">{error.hoTen}</div>
          </div>
          <div className="form-group py-1">
            <input
              className="form-control"
              name="email"
              type="text"
              placeholder="Email"
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
            />
            <div className="text-danger">{error.email}</div>
          </div>
          <div className="form-group py-1">
            <input
              className="form-control"
              name="soDt"
              type="text"
              placeholder="Số điện thoại"
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
            />
            <div className="text-danger">{error.soDt}</div>
          </div>
          <div className="py-2">
            <button className="btn btn-submit w-100">Đăng ký</button>
          </div>
          <div>
            <p>
              Nếu bạn đã có tài khoản. Vui lòng bấm{" "}
              <NavLink to="/dangnhap">đăng nhập</NavLink>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
