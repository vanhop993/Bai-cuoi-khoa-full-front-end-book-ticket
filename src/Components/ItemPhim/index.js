import React, { useState } from "react";
import moment from "moment";
import {NavLink} from 'react-router-dom';
import ModalVideo from "react-modal-video";
import RenderStar from "../RenderStar";
import  {IoIosPlay} from 'react-icons/io';

export default function PhimItem(props) {
  const [isOpen, setOpen] = useState(false);
  const layIdTrailer = () => {
    let idTrailer = props.phim.trailer.split("/")[4];
    return idTrailer;
  };
  return (
    <>
      <div className="card">
        <img
          className="card-img"
          height={300}
          alt={props.phim.hinhAnh}
          src={props.phim.hinhAnh}
        />
        <div className="card-body">
          <h4 className="card-title">{props.phim.tenPhim}</h4>
          <div className="d-flex justify-content-between align-items-center">
            <div>{moment(props.phim.ngayKhoiChieu).format("yyyy")}</div>
            <div><RenderStar danhGia={props.phim.danhGia} /></div>
          </div>
        </div>
        <NavLink className="btn-card" to={"/chitietphim/" + props.phim.maPhim} />
        <IoIosPlay className="btn-play-center" onClick={() => setOpen(true)} />
        <NavLink className="btn btn-style" to={"/chitietphim/" + props.phim.maPhim}>
          Đặt vé
        </NavLink>
      </div>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={layIdTrailer()}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
