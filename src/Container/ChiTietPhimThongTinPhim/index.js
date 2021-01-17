import React, { useState } from "react";
import moment from "moment";
import RenderStar from "../../Components/RenderStar";
import ModalVideo from "react-modal-video";
import { IoIosPlay } from "react-icons/io";
import RenderDiemCirCle from "../../Components/RenderDiemCirCle";
import ThoiLuongPhim from "../../Components/ThoiLuongPhim";
import { scrollSpyAction } from "../../Redux/Action/ScrollSpyAction";
import { useDispatch } from "react-redux";
import defaultFilm from "../../assets/img/default-film.webp";

export default function ChiTietPhimThongTinPhim(props) {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const layIdTrailer = () => {
    let idTrailer = props.chiTietPhim.trailer?.split("/")[4];
    return idTrailer;
  };
  const handleScrollSpy = (name) => {
    let tabs = document.querySelectorAll(".danhSachPhimTagA");
    let contentTabs = document.querySelectorAll(".contentTabItem");
    for (let item of tabs) {
      item.classList.remove("active");
    }
    for (let item of contentTabs) {
      item.classList.remove("show", "active");
    }
    tabs[0].classList.add("active");
    contentTabs[0].classList.add("show", "active");
    dispatch(scrollSpyAction(name));
  };
  return (
    <>
      <div className="row chi-tiet-noi-dung-phim">
        <div className="col-3 position-relative d-none d-md-block">
          <img
            className="w-100"
            src={
              props.chiTietPhim.hinhAnh
                ? props.chiTietPhim.hinhAnh
                : defaultFilm
            }
            alt={props.chiTietPhim.tenPhim}
          />
          <div className="border-btn-trailer">
            <IoIosPlay
              className="btn-trailer-play-center"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
        <div className="col-6 my-auto d-none d-md-block">
          <div className="text-light text-shadow">
            <p>
              {moment(props.chiTietPhim.ngayKhoiChieu).format("DD-MM-YYYY")}
            </p>
            <h3 className="text-light">{props.chiTietPhim.tenPhim}</h3>
            <p>
              <ThoiLuongPhim chiTietPhim={props.chiTietPhim} /> - 0 IMDb -
              2D/Digital
            </p>
            <p>{props.chiTietPhim.moTa}</p>
            <button
              className="btn btn-mua-ve"
              onClick={() => handleScrollSpy("menuDatVe")}
            >
              Mua vé
            </button>
          </div>
        </div>
        <div className="col-3 m-auto d-none d-md-block">
          <div>
            <RenderDiemCirCle danhGia={props.chiTietPhim.danhGia} />
          </div>
          <div className="StarNumber w-100">
            <div className="mx-auto mt-4 w-fit-content">
              <RenderStar danhGia={props.chiTietPhim.danhGia} />
            </div>
          </div>
        </div>
        <iframe
          title={props.chiTietPhim.tenPhim}
          className="w-100 d-block d-md-none"
          src={props.chiTietPhim.trailer}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
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
