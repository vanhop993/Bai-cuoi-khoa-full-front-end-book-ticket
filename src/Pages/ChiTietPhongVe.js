import React, { useEffect } from "react";
import {
  layDanhSachPhongVeAction,
  layThongTinLichChieuHeThongRapApiAction,
} from "../Redux/Action/QuanLyPhimAction";
import { useDispatch, useSelector } from "react-redux";
import DatVe from "../Container/ChiTietPhongVe";
import { displayLoading } from "../Redux/Action/LoadingAction";
import HelmetComponent from "../Components/HelmetComponent";

export default function ChiTietPhongVe(props) {
  let maLichChieu = props.match.params.malichchieu;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(displayLoading());
    async function fetchData() {
      dispatch(await layDanhSachPhongVeAction(maLichChieu));
      dispatch(await layThongTinLichChieuHeThongRapApiAction());
    }
    fetchData();
  }, []);
  const { danhSachPhongVe } = useSelector((state) => state.QuanLyPhimReducer);
  return (
    <>
      <HelmetComponent
        title={danhSachPhongVe.thongTinPhim?.tenPhim}
        description={danhSachPhongVe.thongTinPhim?.tenPhim}
      />
      <DatVe maLichChieu={maLichChieu} />
    </>
  );
}
