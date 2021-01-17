import React from "react";
import { useDispatch } from "react-redux";
import FormValidate from "../../Container/QuanLyNguoiDungFormValidate";
import swal from "sweetalert2";
import { themNguoiDungAction } from "../../Redux/Action/QuanLyNguoiDungAction";

export default function ThemNguoiDung() {
  const dispatch = useDispatch();
  const handleSubmit = (valueDangKy, error) => {
    let newTaiKhoan = {
      taiKhoan: valueDangKy?.taiKhoan,
      matKhau: valueDangKy?.matKhau,
      email: valueDangKy?.email,
      soDt: valueDangKy?.soDt,
      maNhom: "GP01",
      maLoaiNguoiDung: valueDangKy?.maLoaiNguoiDung,
      hoTen: valueDangKy?.hoTen,
    };
    if (!Object.values(error).length) {
      swal.fire(
        "Thông báo",
        "vui lòng nhập đầy đủ các trường!",
        "notification"
      );
      return;
    }
    for (let item of Object.values(error)) {
      if (item) {
        return;
      }
    }
    dispatch(themNguoiDungAction(newTaiKhoan));
  };
  return (
    <FormValidate handleSubmit={handleSubmit} titleBtn={"Thêm người dùng"} />
  );
}
