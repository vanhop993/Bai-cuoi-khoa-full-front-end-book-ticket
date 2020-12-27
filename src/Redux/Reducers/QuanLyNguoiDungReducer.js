import { DANG_KY, DANG_NHAP, DANG_XUAT, LAY_DANH_SACH_NGUOI_DUNG_PHAN_TRANG, LAY_THONG_TIN_NGUOI_DUNG, TIM_KIEM_NGUOI_DUNG } from "../Const/QuanLyNguoiDungConst";

const { USER_LOGIN, ACCESSTOKEN } = require("../../Util/config");

let usLogin = undefined;
if (localStorage.getItem(USER_LOGIN)) {
  // lấy user login trong localstorage gán cho state
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: usLogin,
  thongTinTaiKhoan: {},
  danhSachNguoiDungPhanTrang: {},
  danhSachNguoiDungTimKiem: [],
};

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DANG_NHAP: {
      state.userLogin = action.userLogin;
      return { ...state };
    }
    case DANG_XUAT: {
      localStorage.removeItem(USER_LOGIN);
      localStorage.removeItem(ACCESSTOKEN);
      state.userLogin = action.userLogin;
      return { ...state };
    }
    case LAY_THONG_TIN_NGUOI_DUNG: {
      state.thongTinTaiKhoan = action.data;
      return { ...state };
    }
    case LAY_DANH_SACH_NGUOI_DUNG_PHAN_TRANG: {
      state.danhSachNguoiDungPhanTrang = action.data;
      return { ...state };
    }
    case TIM_KIEM_NGUOI_DUNG: {
      state.danhSachNguoiDungTimKiem = action.data;
      return {...state};
    }
    default:
      return { ...state };
  }
};