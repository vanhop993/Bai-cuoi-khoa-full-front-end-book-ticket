import Axios from "axios";
import swal from "sweetalert2";
import { ACCESSTOKEN, DOMAIN } from "../../Util/config";
import {
  DANG_DAT_GHE,
  LAY_DANH_SACH_PHIM_API,
  LAY_THONG_TIN_HE_THONG_RAP_API,
  LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG_API,
  LAY_THONG_TIN_LICH_CHIEU_HE_THONG_RAP_API,
  LAY_CHI_TIET_PHIM_API,
  LAY_DANH_SACH_PHONG_VE_API,
  DAT_VE_THANH_CONG,
  LAY_DANH_SACH_PHIM_PHAN_TRANG,
  COMMENT_DANH_GIA,
} from "../Const/QuanLyPhimConst";
import { hideLoading } from "./LoadingAction";
// action gọi API
export const layDanhSachPhimApiAction = async () => {
  return async (dispatch) => {
    try {
      let result = await Axios({
        url: DOMAIN + `/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`,
        method: "GET",
      });
      dispatch({
        type: LAY_DANH_SACH_PHIM_API,
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

export const layThongTinHeThongRapApiAction = async () => {
  return async (dispatch) => {
    try {
      let result = await Axios({
        url: DOMAIN + "/api/QuanLyRap/LayThongTinHeThongRap",
      });
      dispatch({
        type: LAY_THONG_TIN_HE_THONG_RAP_API,
        heThongRap: result.data,
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

export const layThongTinCumRapTheoHeThongApiAction = async (maHeThongRap) => {
  return async (dispatch) => {
    try {
      let result = await Axios({
        url:
          DOMAIN +
          `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
        method: "GET",
      });
      dispatch({
        type: LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG_API,
        dataCumRap: result.data,
        maHeThongRap: maHeThongRap,
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

export const layThongTinLichChieuHeThongRapApiAction = async () => {
  return async (dispatch) => {
    try {
      let result = await Axios({
        url:
          DOMAIN + `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01`,
        method: "GET",
      });
      dispatch({
        type: LAY_THONG_TIN_LICH_CHIEU_HE_THONG_RAP_API,
        dataLichChieuHeThongRap: result.data,
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

export const layChiTietPhimApiAction = async (maPhim) => {
  return async (dispatch) => {
    try {
      let result = await Axios({
        url:
          DOMAIN + `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
        method: "GET",
      });
      dispatch({
        type: LAY_CHI_TIET_PHIM_API,
        chiTietPhim: result.data,
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

export const layDanhSachPhongVeAction = async (maLichChieu) => {
  return async (dispatch) => {
    try {
      let result = await Axios({
        url:
          DOMAIN +
          `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
        method: "GET",
      });
      dispatch({
        type: LAY_DANH_SACH_PHONG_VE_API,
        danhSachPhongVe: result.data,
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

export const datVeAction = (thongTinVe) => {
  return async (dispatch) => {
    try {
      let result = await Axios({
        url: DOMAIN + `/api/QuanLyDatVe/DatVe`,
        method: "POST",
        data: thongTinVe,
        headers: {
          Authorization: "Bearer " + localStorage.getItem(ACCESSTOKEN),
        },
      });
      if (result.status === 200) {
        setTimeout(() => {
          dispatch(hideLoading());
        }, 1000);
      }
      dispatch(await layDanhSachPhongVeAction(thongTinVe.maLichChieu));
      dispatch(datVeThanhCong());
      swal.fire("Thông báo", `Đặt vé thành công!`, "success");
    } catch (err) {
      console.log(err);
      swal.fire("Đặt vé thất bại!", `${err.response.data}`, "error");
    }
  };
};

export const layDanhSachPhimPhanTrangAction = (page, items) => {
  return async (dispatch) => {
    try {
      let result = await Axios({
        url:
          DOMAIN +
          `/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=${page}&soPhanTuTrenTrang=${items}`,
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem(ACCESSTOKEN),
        },
      });
      dispatch({
        type: LAY_DANH_SACH_PHIM_PHAN_TRANG,
        data: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deletePhimAction = (maPhim, page, items) => {
  return async (dispatch) => {
    try {
      await Axios({
        url: DOMAIN + `/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem(ACCESSTOKEN),
        },
      });
      swal.fire("Thông báo", "Xóa phim thành công!!", "success");
      dispatch(await layDanhSachPhimPhanTrangAction(page, items));
    } catch (err) {
      console.log(err.response.data);
      swal.fire("Xóa thất bại!", `${err.response.data}`, "error");
    }
  };
};

export const themPhimUpLoadHinh = (formData) => {
  return async (dispatch) => {
    try {
      await Axios({
        url: DOMAIN + `/api/QuanLyPhim/ThemPhimUploadHinh`,
        method: "POST",
        data: formData,
        // headers:{'Authorization': 'Bearer '+localStorage.getItem(ACCESSTOKEN)}
      });
      swal.fire("Thông báo", "Thêm phim thành công!", "success");
      dispatch(await layDanhSachPhimApiAction());
    } catch (err) {
      console.log(err.response.data);
      swal.fire("Thêm phim thất bại!", ` ${err.response.data}`, "error");
    }
  };
};

export const taoLichChieuAction = (thongTinLichChieuNew) => {
  return async (dispatch) => {
    try {
      await Axios({
        url: DOMAIN + "/api/QuanLyDatVe/TaoLichChieu",
        method: "POST",
        data: thongTinLichChieuNew,
        headers: {
          Authorization: "Bearer " + localStorage.getItem(ACCESSTOKEN),
        },
      });
      dispatch(await layThongTinLichChieuHeThongRapApiAction());
      swal.fire("Thông báo", "Tạo lịch chiếu thành công!", "success");
    } catch (err) {
      console.log(err);
      swal.fire("Thêm lịch chiếu thất bại! ", `${err.response.data}`, "error");
    }
  };
};

export const capNhapPhimUploadAction = (data, page, items) => {
  return async (dispatch) => {
    try {
      await Axios({
        url: DOMAIN + "/api/QuanLyPhim/CapNhatPhimUpload",
        method: "POST",
        data,
        headers: {
          Authorization: "Bearer " + localStorage.getItem(ACCESSTOKEN),
        },
      });
      swal.fire("Thông báo", "Cập nhập thông tin thành công!", "success");
      dispatch(await layDanhSachPhimPhanTrangAction(page, items));
    } catch (err) {
      swal.fire(
        "Cập nhập thông tin thất bại!",
        `${err.response?.data}`,
        "error"
      );
    }
  };
};

export const capNhapPhimAction = (data, dataUpHinh, page, items) => {
  return async (dispatch) => {
    try {
      let result = await Axios({
        url: DOMAIN + "/api/QuanLyPhim/CapNhatPhim",
        method: "POST",
        data,
        headers: {
          Authorization: "Bearer " + localStorage.getItem(ACCESSTOKEN),
        },
      });
      // dispatch(await layDanhSachPhimPhanTrangAction(page, items));
      if (result.status === 200) {
        // swal.fire("Thông báo", result.data, "success");
        dispatch(await uploadHinhAnhPhimAction(dataUpHinh, page, items));
      }
    } catch (err) {
      console.log(err.response);
      swal.fire(
        "Cập nhập thông tin thất bại! ",
        `${err.response?.data}`,
        "error"
      );
    }
  };
};

export const uploadHinhAnhPhimAction = (data, page, items) => {
  return async (dispatch) => {
    try {
      let result = await Axios({
        url: DOMAIN + "/api/QuanLyPhim/UploadHinhAnhPhim",
        method: "POST",
        data,
        // headers: {
        //   Authorization: "Bearer " + localStorage.getItem(ACCESSTOKEN),
        // },
      });
      dispatch(await layDanhSachPhimPhanTrangAction(page, items));
      swal.fire("Thông báo", result.data, "success");
    } catch (err) {
      console.log(err);
      swal.fire(
        "Thông báo",
        `Cập nhập thông tin thất bại!
         ${err.response?.data}`,
        "error"
      );
    }
  };
};

// dispatch local
export const dangChonGhe = (obj) => {
  return {
    type: DANG_DAT_GHE,
    objGhe: obj,
  };
};

export const datVeThanhCong = () => {
  return {
    type: DAT_VE_THANH_CONG,
  };
};

export const commentAction = (content) => {
  return {
    type: COMMENT_DANH_GIA,
    content,
  };
};
