import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChiTietPhimThongTinPhim from "../Container/ChiTietPhimThongTinPhim";
import ChiTietPhimMenu from "../Container/ChiTietPhimMenu";
import { layChiTietPhimApiAction } from "../Redux/Action/QuanLyPhimAction";

export default function ChiTietPhim(props) {
  const { chiTietPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  let maPhim = props.match.params.maphim;
  useEffect(() => {
    async function fetchData() {
      dispatch(await layChiTietPhimApiAction(maPhim));
    }
    fetchData()
  }, [maPhim]);
  return (
    <>
    <div className='container chi-tiet-phim'>
      <ChiTietPhimThongTinPhim chiTietPhim ={chiTietPhim} />
      <ChiTietPhimMenu chiTietPhim ={chiTietPhim}/>
      <div  className="ChiTietPhimBackground"style={{backgroundImage: `url('${chiTietPhim.hinhAnh}')`,}}/> 
      <div className="PhimBackground" style={{ background:"linear-gradient(to top, rgb(10, 32, 41), transparent 100%)", }} />
    </div>
    </>
  )
}
