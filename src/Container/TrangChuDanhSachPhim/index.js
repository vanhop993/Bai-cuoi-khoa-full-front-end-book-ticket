import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import PhimItem from "../../Components/ItemPhim";
import {
  Element,
  animateScroll as scroll,
} from "react-scroll";

export default function TrangChuDanhSachPhim() {
  const { dsPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const newDSPhim = useMemo(() => dsPhim.reverse(), [dsPhim]);
  const renderDsPhim = (phanTuBatDau, phanTuKetThuc) =>{
    return newDSPhim?.slice(phanTuBatDau, phanTuKetThuc).map((phim, index) => (
      <div className="w-100 mb-4 col-12 col-sm-6 col-md-4 col-lg-3"  key={index} >
        <PhimItem phim={phim}/>
      </div>
    ));
  }
  return (
    <Element name='lichChieu' className='container z-index100 mt-5 danhSachPhimBackGround' id='lichChieu'>
      <div style={{marginBottom:'10rem'}}>
        <ul className="nav danhSachPhimTagUl" id="myTab" role="tablist">
          <li className="nav-item danhSachPhimTagLi">
            <a
              className="danhSachPhimTagA active"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Phim sắp chiếu
              </a>
          </li>
          <li className="nav-item danhSachPhimTagLi">
            <a
              className="danhSachPhimTagA"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Phim đang chiếu
              </a>
          </li>
          <li className="nav-item danhSachPhimTagLi">
            <a
              className="danhSachPhimTagA"
              id="contact-tab"
              data-toggle="tab"
              href="#contact"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Phim hot nhất
              </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
         
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
             <div className="row">{renderDsPhim(0, 12)}</div>
          </div>
          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className='row'>{renderDsPhim(12, 24)}</div>
          </div>
          <div
            className="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <div className="row">{renderDsPhim(24, 36)}</div>
          </div>
        </div>
      </div>
    </Element>
  );
}
