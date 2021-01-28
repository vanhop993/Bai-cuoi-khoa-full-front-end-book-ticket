import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HelmetComponent from "../Components/HelmetComponent";
import ChiTietCunRapDanhGia from "../Container/ChiTietCumRapDanhGia";
import ChiTietCumRapThongTinRap from "../Container/ChiTietCumRapThongTinRap";
import { displayLoading } from "../Redux/Action/LoadingAction";
import { layThongTinLichChieuHeThongRapApiAction } from "../Redux/Action/QuanLyPhimAction";

export default function ChiTietCumRap(props) {
  let maCumRap = props.match.params.macumrap;
  let maHeThongRap = props.match.params.mahethongrap;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(displayLoading());
    async function fetchData() {
      dispatch(await layThongTinLichChieuHeThongRapApiAction());
    }
    fetchData();
  }, []);
  const { lichChieuHeThongRap } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  const thongTinRap = () => {
    let heThongRap = lichChieuHeThongRap.find(
      (item) => item.maHeThongRap === maHeThongRap
    );
    let cumRap = heThongRap?.lstCumRap.find(
      (item) => item.maCumRap === maCumRap
    );
    return cumRap?.tenCumRap;
  };
  return (
    <>
      <HelmetComponent title={thongTinRap()} description={thongTinRap()} />
      <ChiTietCumRapThongTinRap
        maCumRap={maCumRap}
        maHeThongRap={maHeThongRap}
      />
      <ChiTietCunRapDanhGia maCumRap={maCumRap} maHeThongRap={maHeThongRap} />
    </>
  );
}
