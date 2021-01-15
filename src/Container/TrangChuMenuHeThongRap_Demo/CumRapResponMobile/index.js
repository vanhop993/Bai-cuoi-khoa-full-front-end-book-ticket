import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ItemThongTinPhimMenu from "../../../Components/ItemThongTinPhimMenu";

export default function CumRapResponMobile(props) {
  // console.log(props.maHeThongRap)
  const [openRight, setOpenRight] = useState();
  const [toggle, setToggle] = useState(false);
  const [collapseShowMore, setCollapseShowMore] = useState(false);
  const { lichChieuHeThongRap } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  useEffect(() => {
    let objLichChieuHeThongRap = lichChieuHeThongRap.find(
      (item) => item.maHeThongRap === props.maHeThongRap
    );
    setOpenRight(objLichChieuHeThongRap?.lstCumRap[0]);
    setToggle(false);
  }, [props.maHeThongRap, lichChieuHeThongRap]);
  const rederMenuUpMobile = () => {
    let objLichChieuHeThongRap = lichChieuHeThongRap.find(
      (item) => item.maHeThongRap === props.maHeThongRap
    );
    return objLichChieuHeThongRap?.lstCumRap.map((itemRap, index) => {
      let tenCumRap = itemRap?.tenCumRap.split("-");
      let menuUpMobile = [];
      let menuDownMobile = [];
      if (itemRap?.maCumRap === openRight?.maCumRap) {
        menuUpMobile.push(
          <div className="d-flex menu-he-thong-rap-item poiter" key={index}>
            <div>
              <img
                className="mr-2"
                src={objLichChieuHeThongRap.logo}
                alt={objLichChieuHeThongRap.tenHeThongRap}
                width={50}
                height={50}
              />
            </div>
            <div>
              <div>
                <p className="m-0 text-menu-trang-chu-item font-weight-bold">
                  <span className="text-success">{tenCumRap[0]}</span> -{" "}
                  <span className="text-dark">{tenCumRap[1]}</span>
                </p>
                <p
                  className="m-0 text-menu-trang-chu-item text-dark"
                  data-toggle="tooltip"
                  title={itemRap.diaChi}
                >
                  Địa chỉ: {itemRap.diaChi}
                </p>
                <NavLink
                  className="text-danger"
                  to={`/chitietcumrap/${props.maHeThongRap}/${itemRap.maCumRap}`}
                >
                  [Chi tiết]
                </NavLink>
              </div>
            </div>
          </div>
        );
      } else {
        menuDownMobile.push(
          <div
            className="d-flex menu-he-thong-rap-item gach-duoi-menu-he-thong-rap-item  poiter"
            key={index}
            onClick={() => {
              setOpenRight(itemRap);
              setToggle((toggle) => !toggle);
            }}
          >
            <div>
              <img
                className="mr-2"
                src={objLichChieuHeThongRap.logo}
                alt={objLichChieuHeThongRap.tenHeThongRap}
                width={50}
                height={50}
              />
            </div>
            <div>
              <div>
                <p className="m-0 text-menu-trang-chu-item font-weight-bold">
                  <span className="text-success">{tenCumRap[0]}</span> -{" "}
                  <span className="text-dark">{tenCumRap[1]}</span>
                </p>
                <p
                  className="m-0 text-menu-trang-chu-item text-dark"
                  data-toggle="tooltip"
                  title={itemRap.diaChi}
                >
                  Địa chỉ: {itemRap.diaChi}
                </p>
                <NavLink
                  className="text-danger"
                  to={`/chitietcumrap/${props.maHeThongRap}/${itemRap.maCumRap}`}
                >
                  [Chi tiết]
                </NavLink>
              </div>
            </div>
          </div>
        );
      }
      return (
        <Fragment key={index}>
          <div onClick={() => setToggle((toggle) => !toggle)}>
            {menuUpMobile}
          </div>
          {toggle ? menuDownMobile : ""}
        </Fragment>
      );
    });
  };
  return (
    <div className="row">
      {rederMenuUpMobile()}
      <div className="col-12 border-menu-item">
        {openRight?.danhSachPhim.map((phim, index) => {
          return (
            <Fragment key={index}>
              {index < 5 ? (
                <ItemThongTinPhimMenu phim={phim} path={"/chitietphim/"} />
              ) : collapseShowMore ? (
                <div>
                  <ItemThongTinPhimMenu phim={phim} path={"/chitietphim/"} />
                  {openRight?.danhSachPhim.length - 1 === index ? (
                    <div className="text-center">
                      <button
                        className="btn"
                        onClick={() => setCollapseShowMore(false)}
                      >
                        Thu gọn
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : index === 5 ? (
                <div className="text-center">
                  <button
                    className="btn"
                    onClick={() => setCollapseShowMore(true)}
                  >
                    Xem thêm
                  </button>
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
