import Axios from "axios";
import { ACCESSTOKEN, DOMAIN, USER_LOGIN } from "../../Util/config";
import swal from "sweetalert2";
import { history } from "../../Util/History";
import {
  DANG_NHAP,
  LAY_DANH_SACH_NGUOI_DUNG_PHAN_TRANG,
  LAY_THONG_TIN_NGUOI_DUNG,
  TIM_KIEM_NGUOI_DUNG,
} from "../Const/QuanLyNguoiDungConst";
import { DANG_XUAT } from "../Const/QuanLyNguoiDungConst";
import { hideLoading } from "./LoadingAction";

export const dangNhapAction = (userLogin) => {
  return (dispatch) => {
    const promise = Axios({
      url: DOMAIN + "/api/quanlynguoidung/dangnhap",
      method: "POST",
      data: userLogin,
    });
    promise
      .then((result) => {
        // đăng nhập thành công lưu thông tin người dùng vào local store
        localStorage.setItem(USER_LOGIN, JSON.stringify(result.data));
        // lưu token vào local store
        localStorage.setItem(ACCESSTOKEN, result.data.accessToken);
        swal.fire("Thông báo", "Đăng nhập thành công", "success");
        dispatch({
          type: DANG_NHAP,
          userLogin: result.data,
        });
        if (history.location.pathname === "/dangky") {
          history.push("/");
        } else {
          history.goBack();
        }
      })
      .catch((error) => swal.fire("thông báo", error.response.data, "error"));
  };
};
export const dangKyAction = (newTaiKhoan) => {
  return (dispatch) => {
    const promise = Axios({
      url: DOMAIN + "/api/QuanLyNguoiDung/DangKy",
      method: "POST",
      data: newTaiKhoan,
    });
    promise
      .then(() => {
        // đăng nhập thành công lưu thông tin người dùng vào local store
        // localStorage.setItem(USER_LOGIN, JSON.stringify(result.data));
        // lưu token vào local store
        // localStorage.setItem(ACCESSTOKEN, result.data.accessToken);
        swal.fire("Thông báo", "Đăng ký tài khoản thành công", "success");
        // dispatch({
        //   type: DANG_KY,
        //   taiKhoan: result.data,
        // });
        history.push("/dangnhap");
      })
      .catch((error) => swal.fire("thông báo", error.response.data, "error"));
  };
};

export const thongTinTaiKhoanAction = async (taiKhoan) => {
  return async (dispatch) => {
    try {
      let result = await Axios({
        url: DOMAIN + `/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
        method: "POST",
        data: taiKhoan,
        headers: {
          Authorization: "Bearer " + localStorage.getItem(ACCESSTOKEN),
        },
      });
      dispatch({
        type: LAY_THONG_TIN_NGUOI_DUNG,
        data: result.data,
      });
      if (result.status === 200) {
        setTimeout(() => {
          dispatch(hideLoading());
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const layDanhSachNguoiDungPhanTrangApi = (page, items) => {
  return async (dispatch) => {
    try {
      // dispatch (displayLoading());
      let result = await Axios({
        url:
          DOMAIN +
          `/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&soTrang=${page}&soPhanTuTrenTrang=${items}`,
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem(ACCESSTOKEN),
        },
      });
      dispatch({
        type: LAY_DANH_SACH_NGUOI_DUNG_PHAN_TRANG,
        data: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteNguoiDungAction = (taiKhoan, page, items) => {
  return async (dispatch) => {
    try {
      await Axios({
        url: DOMAIN + `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
        method: "DELETE",
        data: taiKhoan,
        headers: {
          Authorization: "Bearer " + localStorage.getItem(ACCESSTOKEN),
        },
      });
      swal.fire(
        "Thông báo",
        `Đã xóa tài khoản ${taiKhoan} thành công !`,
        "success"
      );
      dispatch(await layDanhSachNguoiDungPhanTrangApi(page, items));
    } catch (err) {
      swal.fire("thông báo", err.response.data, "error");
    }
  };
};

export const themNguoiDungAction = (newNguoiDung) => {
  return async (dispatch) => {
    try {
      await Axios({
        url: DOMAIN + `/api/QuanLyNguoiDung/ThemNguoiDung`,
        method: "POST",
        data: newNguoiDung,
        headers: {
          Authorization: "Bearer " + localStorage.getItem(ACCESSTOKEN),
        },
      });
      swal.fire("thông báo", "Đã thêm thành công !", "success");
    } catch (err) {
      swal.fire("thông báo", err.response.data, "error");
    }
  };
};

export const suaThongTinUserAction = (data, page, items) => {
  return async (dispatch) => {
    try {
      await Axios({
        url: DOMAIN + "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method: "PUT",
        data,
        headers: {
          Authorization: "Bearer " + localStorage.getItem(ACCESSTOKEN),
        },
      });
      console.log(page, items);
      dispatch(await layDanhSachNguoiDungPhanTrangApi(page, items));
      swal.fire("thông báo", "Cập nhập thông tin thành công !", "success");
    } catch (err) {
      swal.fire("thông báo", err.response?.data, "error");
    }
  };
};

export const timKiemNguoiDungPhanTrangAPiAction = (valueSearch,page,items) => {
  return async (dispatch) => {
    try {
      let results = await Axios({
        url:
          DOMAIN +
          `/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=GP01&tuKhoa=${valueSearch}&soTrang=${page}&soPhanTuTrenTrang=${items}`,
        method: "GET",
      });
      dispatch({
        type: TIM_KIEM_NGUOI_DUNG,
        data: results.data,
      });
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const dangXuatAction = () => {
  return {
    type: DANG_XUAT,
    userLogin: undefined,
  };
};
