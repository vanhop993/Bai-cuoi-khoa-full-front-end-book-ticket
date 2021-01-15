import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChiTietPhimThongTinPhim from "../Container/ChiTietPhimThongTinPhim";
import { layChiTietPhimApiAction, layThongTinLichChieuHeThongRapApiAction } from "../Redux/Action/QuanLyPhimAction";
import { displayLoading } from "../Redux/Action/LoadingAction";
import ChiTietPhimDanhGia from "../Container/ChiTietPhimDanhGia";
import TinhThuNgay from "../Components/TinhThuNgay";

export default function ChiTietPhim(props) {
  const { chiTietPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    let maPhim = props.match.params.maphim;
    dispatch(displayLoading());
    async function fetchData() {
      dispatch(await layThongTinLichChieuHeThongRapApiAction());
      dispatch(await layChiTietPhimApiAction(maPhim));
    }
    fetchData();
  }, []);
  return (
    <>
    <div className='container chi-tiet-phim'>
      <ChiTietPhimThongTinPhim chiTietPhim ={chiTietPhim} />
      <ChiTietPhimDanhGia />
      <div  className="ChiTietPhimBackground"style={{backgroundImage: `url('${chiTietPhim.hinhAnh}')`,}}/> 
      <div className="PhimBackground" style={{ background:"linear-gradient(to top, rgb(10, 32, 41), transparent 100%)", }} />
    </div>
    </>
  )
}
