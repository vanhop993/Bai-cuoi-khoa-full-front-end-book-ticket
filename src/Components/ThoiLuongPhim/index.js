import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  layDanhSachPhimApiAction,
  layThoiLuongPhimTrongChiTietPhimApiAction,
} from "../../Redux/Action/QuanLyPhimAction";
import { DOMAIN } from "../../Util/config";

let thoiLuong;
export default function ThongLuonPhim(props) {
  const [thoiLuongPhim, setThoiLuonPhim] = useState();
  useEffect(() => {
    if (!props.chiTietPhim) {
      let promise = Axios({
        url:
          DOMAIN +
          `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${props.maPhim}`,
        method: "GET",
      });
      promise.then((res) => {
        setThoiLuonPhim(
          res.data.heThongRapChieu[0]?.cumRapChieu[0]?.lichChieuPhim[0]
            ?.thoiLuong
        );
      });
      // thất bại
      promise.catch((error) => {
        console.log(error.response?.data);
      });
    }
  }, [props.maPhim]);
  if (props.chiTietPhim) {
    if (props.chiTietPhim.heThongRapChieu) {
      thoiLuong =
        props.chiTietPhim.heThongRapChieu[0]?.cumRapChieu[0]?.lichChieuPhim[0]
          ?.thoiLuong;
    }
  }
  return (
    <>
      {/* {thoiLuong?.heThongRapChieu[0].cumRapChieu[0].lichChieuPhim[0].thoiLuong}  */}
      {thoiLuong ? thoiLuong : thoiLuongPhim} phút
    </>
  );
}
