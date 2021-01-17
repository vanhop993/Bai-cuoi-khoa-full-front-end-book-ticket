import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ItemThongTinPhimMenu from "../../../Components/ItemThongTinPhimMenu";
import ItemThongTinRapChieuPhim from "../../../Components/ItemThongTinRapChieuPhim";
import MobiPillsMenuResponsive from "../../../Components/ResponsiveMobiPillsMenu";
import TinhThuNgay from "../../../Components/TinhThuNgay";
import moment from "moment";
import {
  displayLoading,
  hideLoading,
} from "../../../Redux/Action/LoadingAction";

let now = new Date();
export default function ChiTietCumRapMenu({ maCumRap, maHeThongRap }) {
  const [ngayChon, setNgayChon] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setNgayChon(moment(now).format("yyyy-MM-DD HH:mm"));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      dispatch(hideLoading());
    }, 1000);
  }, [maCumRap]);
  const chonNgay = (item) => {
    setNgayChon(item);
  };
  const { lichChieuHeThongRap } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  // const [toggle, setToggle] = useState(maCumRap);
  const renderLichChieuHeThongRapChinh = () => {
    let heThongRap = lichChieuHeThongRap.find(
      (item) => item.maHeThongRap === maHeThongRap
    );
    let index = heThongRap?.lstCumRap.findIndex(
      (item1) => item1?.maCumRap === maCumRap
    );
    let tenCumRap = heThongRap?.lstCumRap[index]?.tenCumRap.split("-");
    return tenCumRap ? (
      <div
        key={index}
        className="chi-tiet-cum-rap-menu-left itemChiTietCumRapMenu menuActive"
      >
        <ItemThongTinRapChieuPhim
          logo={heThongRap?.logo}
          maCumRap={maCumRap}
          tenCumRapx={tenCumRap[0]}
          tenCumRap={tenCumRap[1]}
          maHeThongRap={maHeThongRap}
        />
      </div>
    ) : (
      ""
    );
  };
  const renderMenuLeft = () => {
    let heThongRap = lichChieuHeThongRap.find(
      (item) => item.maHeThongRap === maHeThongRap
    );
    let index = heThongRap?.lstCumRap.findIndex(
      (item1) => item1?.maCumRap === maCumRap
    );
    // let dsCumRapConLai = heThongRap?.lstCumRap.splice(index,1);
    return heThongRap?.lstCumRap.map((rap, index1) => {
      let tenCumRap = rap ? rap.tenCumRap.split("-") : [];
      let key = index1 > index ? index1 - 1 : index1;
      return rap !== heThongRap?.lstCumRap[index] ? (
        <div key={key} className="chi-tiet-cum-rap-menu-left ">
          <NavLink
            to={`/chitietcumrap/${maHeThongRap}/${rap?.maCumRap}`}
            onClick={() => {
              // setToggle(rap.maCumRap);
              dispatch(displayLoading());
            }}
          >
            <ItemThongTinRapChieuPhim
              logo={heThongRap.logo}
              maCumRap={rap?.maCumRap}
              tenCumRapx={tenCumRap[0]}
              tenCumRap={tenCumRap[1]}
              maHeThongRap={maHeThongRap}
            />
          </NavLink>
        </div>
      ) : (
        ""
      );
    });
  };
  const renderDanhSachPhimCuaRap = () => {
    let heThongRap = lichChieuHeThongRap.find(
      (item) => item.maHeThongRap === maHeThongRap
    );
    let rap = heThongRap?.lstCumRap.find(
      (item1) => item1?.maCumRap === maCumRap
    );
    return rap?.danhSachPhim
      .filter((phim) => {
        let indexLichChieuTheoNgay = phim.lstLichChieuTheoPhim.findIndex(
          (item) => {
            return (
              moment(item.ngayChieuGioChieu).format("yyyy-MM-DD") ===
                moment(ngayChon).format("yyyy-MM-DD") &&
              moment(ngayChon).format("HH:mm") <
                moment(item.ngayChieuGioChieu).format("HH:mm")
            );
          }
        );
        return indexLichChieuTheoNgay !== -1;
      })
      .map((phim, index) => (
        <div className="chi-tiet-cum-rap-menu-right" key={index}>
          <ItemThongTinPhimMenu
            phim={phim}
            ngayChon={ngayChon}
            menuChoTrang={"trangChiTietCumRap"}
            path={"/chitietphongve/"}
          />
        </div>
      ));
  };
  const renderLichChieuHeThongRapMobile = () => {
    let heThongRap = lichChieuHeThongRap.find(
      (item) => item.maHeThongRap === maHeThongRap
    );
    let index = heThongRap?.lstCumRap.findIndex(
      (item1) => item1?.maCumRap === maCumRap
    );
    let rap = heThongRap?.lstCumRap.find(
      (item1) => item1?.maCumRap === maCumRap
    );
    heThongRap?.lstCumRap.splice(index, 1);
    heThongRap?.lstCumRap.unshift(rap);
    let menuIndexX = [];
    let menuIndex0 = [];
    heThongRap?.lstCumRap.forEach((rap, index) => {
      let tenCumRap = rap ? rap.tenCumRap.split("-") : [];
      if (index === 0) {
        menuIndex0.push(
          <div key={index} className="chi-tiet-cum-rap-menu-left menuActive">
            <ItemThongTinRapChieuPhim
              className="p-3"
              logo={heThongRap.logo}
              maCumRap={rap?.maCumRap}
              tenCumRapx={tenCumRap[0]}
              tenCumRap={tenCumRap[1]}
              maHeThongRap={maHeThongRap}
            />
          </div>
        );
      }
      if (index !== 0) {
        menuIndexX.push(
          <div key={index} className="chi-tiet-cum-rap-menu-left">
            <NavLink
              to={`/chitietcumrap/${maHeThongRap}/${rap?.maCumRap}`}
              onClick={() => {
                dispatch(displayLoading());
              }}
            >
              <ItemThongTinRapChieuPhim
                className="p-3"
                logo={heThongRap.logo}
                maCumRap={rap?.maCumRap}
                tenCumRapx={tenCumRap[0]}
                tenCumRap={tenCumRap[1]}
                maHeThongRap={maHeThongRap}
              />
            </NavLink>
          </div>
        );
      }
    });
    return (
      <MobiPillsMenuResponsive
        key={index}
        menuUp={menuIndex0}
        menuDown={menuIndexX}
        maCumRap={rap?.maCumRap}
      />
    );
  };
  return (
    <div className="container">
      <div className="row bg-white chi-tiet-cum-rap-border d-none d-md-flex">
        <div className="col-5 chi-tiet-cum-rap-border pr-0">
          {renderLichChieuHeThongRapChinh()}
          <div className=" menu-he-thong-rap-scroll">{renderMenuLeft()}</div>
        </div>
        <div className="col-7 p-0">
          <TinhThuNgay handleClick={chonNgay} />
          <div className=" menu-he-thong-rap-scroll position-relative">
            <div className="position-absolute w-100 text-center pt-5">
              Hiện không có lịch chiếu
            </div>
            {renderDanhSachPhimCuaRap()}
          </div>
        </div>
      </div>
      <div className="d-block d-md-none">
        <TinhThuNgay handleClick={chonNgay} />
      </div>
      <div className="d-block d-md-none chi-tiet-cum-rap-border">
        {renderLichChieuHeThongRapMobile()}
        <div className="menu-he-thong-rap-scroll position-relative">
          {renderDanhSachPhimCuaRap()?.length === 0 ? (
            <div className=" w-100 text-center py-2">
              Hiện không có lịch chiếu
            </div>
          ) : (
            renderDanhSachPhimCuaRap()
          )}
        </div>
      </div>
    </div>
  );
}
