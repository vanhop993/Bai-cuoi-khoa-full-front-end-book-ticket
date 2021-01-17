import TrangChuCarousel from "../Container/TrangChuCarousel";
import React, { useEffect } from "react";
import TrangChuDanhSachPhim from "../Container/TrangChuDanhSachPhim";
import TrangChuMenu from "../Container/TrangChuMenu";
import {
  layDanhSachPhimApiAction,
  layThongTinHeThongRapApiAction,
  layThongTinLichChieuHeThongRapApiAction,
} from "../Redux/Action/QuanLyPhimAction";
import { useDispatch } from "react-redux";
// import HeThongRapDemo from "../Container/TrangChuMenuHeThongRap_Demo";
import TinTuc from "../Container/TrangChuTinTuc";
import UngDung from "../Container/TrangChuUngDung";
import { displayLoading } from "../Redux/Action/LoadingAction";
// import TrangChuMenu from '../Container/TrangChuMenu';

export default function TrangChu() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(displayLoading());
    async function fetchData() {
      dispatch(await layDanhSachPhimApiAction());
      dispatch(await layThongTinHeThongRapApiAction());
      dispatch(await layThongTinLichChieuHeThongRapApiAction());
    }
    fetchData();
  }, []);
  return (
    <>
      <TrangChuCarousel />
      <TrangChuDanhSachPhim />
      <TrangChuMenu />
      {/* <HeThongRapDemo /> */}
      <TinTuc />
      <UngDung />
    </>
  );
}
