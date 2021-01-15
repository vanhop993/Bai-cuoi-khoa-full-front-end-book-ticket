import React from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import RenderStar from "../RenderStar";
import { IoIosPlay } from "react-icons/io";
import defaultFilm from "../../assets/img/default-film.webp";

export default function PhimItem({ phim, handleOpenModal, layIdTrailer }) {
  return (
    <>
      <div className="card">
        <img
          className="card-img"
          height={300}
          alt={phim.hinhAnh}
          src={phim.hinhAnh ? phim.hinhAnh : defaultFilm}
        />
        <div className="card-body">
          <h4 className="card-title">{phim.tenPhim}</h4>
          <div className="d-flex justify-content-between align-items-center">
            <div>{moment(phim.ngayKhoiChieu).format("yyyy")}</div>
            <div>
              <RenderStar danhGia={phim.danhGia} />
            </div>
          </div>
        </div>
        <NavLink className="btn-card" to={"/chitietphim/" + phim.maPhim} />
        <IoIosPlay
          className="btn-play-center"
          onClick={() => {
            handleOpenModal();
            layIdTrailer(phim.trailer);
          }}
        />
        <NavLink className="btn btn-style" to={"/chitietphim/" + phim.maPhim}>
          Đặt vé
        </NavLink>
      </div>
    </>
  );
}
