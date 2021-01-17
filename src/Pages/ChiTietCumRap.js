import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
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
  return (
    <>
      <ChiTietCumRapThongTinRap
        maCumRap={maCumRap}
        maHeThongRap={maHeThongRap}
      />
      <ChiTietCunRapDanhGia maCumRap={maCumRap} maHeThongRap={maHeThongRap} />
    </>
  );
}
