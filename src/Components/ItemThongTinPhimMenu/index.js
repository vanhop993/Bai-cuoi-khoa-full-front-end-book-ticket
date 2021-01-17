import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import ThoiLuongPhim from '../ThoiLuongPhim';
import moment from "moment";

export default function ItemThongTinPhimMenu({
  phim,
  path,
  ngayChon,
  moreContent,
  menuChoTrang,
}) {
  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    setToggle(true);
  }, [phim]);
  const sapXepNgayGio = (a, b) => {
    var nameA = moment(a.ngayChieuGioChieu)
      .format("yyyy-MM-DD HH:mm")
      .toUpperCase(); // bỏ qua hoa thường
    var nameB = moment(b.ngayChieuGioChieu)
      .format("yyyy-MM-DD HH:mm")
      .toUpperCase(); // bỏ qua hoa thường
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // name trùng nhau
    return 0;
  };
  const renderGioChieu = (lichChieuPhimItem, index) => {
    switch (path) {
      case "/chitietphim/": {
        return (
          <NavLink to={path + phim.maPhim} className="mr-3 my-3" key={index}>
            <span className="gioChieu text-success">
              {moment(lichChieuPhimItem.ngayChieuGioChieu).format("HH:mm")}
            </span>
          </NavLink>
        );
      }
      case "/chitietphongve/": {
        return (
          <NavLink
            to={path + lichChieuPhimItem.maLichChieu}
            className="mr-3 my-3"
            key={index}
          >
            <span className="gioChieu text-success">
              {moment(lichChieuPhimItem.ngayChieuGioChieu).format("HH:mm")}
            </span>
          </NavLink>
        );
      }
      default:
        break;
    }
  };
  return (
    <div className="w-100 position-relative thong-tin-phim-item p-4 bg-white">
      <div
        className=" d-flex poiter align-items-center"
        onClick={() => setToggle(!toggle)}
      >
        <img
          className="mr-3"
          src={phim.hinhAnh}
          alt={phim.tenPhim}
          width={50}
          height={50}
        />
        <div className="font-weight-bold">
          {phim.tenPhim}
          {/* {phim.maPhim ? <div><ThoiLuongPhim maPhim = {phim.maPhim}/> - 0 IMDb - 2D/Digital</div> : ''} */}
          {moreContent}
        </div>
      </div>
      {toggle ? (
        <div>
          <p className="font-weight-bold">Giờ chiếu phim: </p>
          <div className="d-flex flex-wrap">
            {phim.lstLichChieuTheoPhim
              .sort(sapXepNgayGio)
              .filter((lichChieuPhimItem) => {
                return (
                  moment(ngayChon).format("yyyy-MM-DD") ===
                    moment(lichChieuPhimItem.ngayChieuGioChieu).format(
                      "yyyy-MM-DD"
                    ) &&
                  moment(ngayChon).format("HH:mm") <
                    moment(lichChieuPhimItem.ngayChieuGioChieu).format("HH:mm")
                );
              })
              .map((lichChieuPhimItem, index) => (
                <div key={index}>
                  {renderGioChieu(lichChieuPhimItem, index)}
                </div>
              ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
