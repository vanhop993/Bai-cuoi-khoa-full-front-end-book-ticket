import React from "react";
import DiaChiCumRap from "../DiaChiCumRap";
import moment from "moment";
import { NavLink } from "react-router-dom";

export default function ItemThongTinRapChieuPhim({
  logo,
  maCumRap,
  tenCumRapx,
  tenCumRap,
  maHeThongRap,
  lichChieuPhim,
  path,
  moreContent,
  diaChi,
  ngayChon,
  styleCss,
}) {
  const sapXepNgayGio = (a, b) => {
    let nameA = moment(a.ngayChieuGioChieu)
      .format("yyyy-MM-DD HH:mm")
      .toUpperCase(); // bỏ qua hoa thường
    let nameB = moment(b.ngayChieuGioChieu)
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
  const renderItemThongTinRapChieu = () => {
    let index = lichChieuPhim?.findIndex(
      (lichChieu) =>
        moment(ngayChon).format("yyyy-MM-DD") ===
        moment(lichChieu.ngayChieuGioChieu).format("yyyy-MM-DD")
    );
    if (index !== -1) {
      return (
        <>
          <div className="d-flex align-items-center w-100">
            <img
              className="mr-2 d-none d-lg-block"
              src={logo}
              alt={logo}
              width={50}
              height={50}
            />
            <div>
              <div
                className="font-weight-bold tenRap text-dark text-menu-trang-chu-item"
                data-toggle="tooltip"
                title={`${tenCumRapx}-${tenCumRap}`}
              >
                <span className="text-success">{tenCumRapx}</span> - {tenCumRap}
              </div>

              <div className="text-menu-trang-chu-item">
                <span className="text-primary">Địa chỉ: </span>
                {diaChi ? (
                  diaChi
                ) : (
                  <DiaChiCumRap
                    maHeThongRap={maHeThongRap}
                    maCumRap={maCumRap}
                  />
                )}
              </div>
              {moreContent}
            </div>
          </div>
          {lichChieuPhim ? (
            <>
              <p>Giờ chiếu:</p>
              {lichChieuPhim
                .sort(sapXepNgayGio)
                .filter((lichChieu) => {
                  return (
                    moment(ngayChon).format("yyyy-MM-DD") ===
                      moment(lichChieu.ngayChieuGioChieu).format(
                        "yyyy-MM-DD"
                      ) &&
                    moment(ngayChon).format("HH:mm") <=
                      moment(lichChieu.ngayChieuGioChieu).format("HH:mm")
                  );
                })
                .map((lichChieu, index) => (
                  <NavLink
                    to={`/chitietphongve/${lichChieu.maLichChieu}`}
                    className="text-success mr-3 gioChieu"
                    key={index}
                  >
                    {moment(lichChieu.ngayChieuGioChieu).format("HH:mm")}
                  </NavLink>
                ))}
            </>
          ) : (
            ""
          )}
        </>
      );
    } else return null;
  };
  return <>{renderItemThongTinRapChieu()}</>;
}
