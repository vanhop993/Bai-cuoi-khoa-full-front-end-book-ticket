import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ItemLeftPillsMenu from "../../Components/PillsMenu/ItemLeftPillsMenu";
import PillsMenu from "../../Components/PillsMenu";
import ItemRightPillsMenu from "../../Components/PillsMenu/ItemRightPillsMenu";
import { NavLink } from "react-router-dom";
import ItemThongTinPhimMenu from "../../Components/ItemThongTinPhimMenu";
import _ from "lodash";
import ItemThongTinRapChieuPhim from "../../Components/ItemThongTinRapChieuPhim";
import moment from "moment";
import { Element, animateScroll as scroll } from "react-scroll";
import MobiPillsMenuResponsive from "../../Components/ResponsiveMobiPillsMenu";

let now = new Date();
export default function TrangChuMenu(props) {
  const [ngayChon, setNgayChon] = useState(now);
  const { heThongRap } = useSelector((state) => state.QuanLyPhimReducer);
  const { lichChieuHeThongRap } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  const renderLeftMenu = () => {
    return heThongRap?.map((rap, index) => {
      let active = index === 0 ? "active" : "";
      return (
        <ItemLeftPillsMenu
          key={index}
          active={active}
          idItem={rap.maHeThongRap.trim()}
          content={<img src={rap.logo} alt={rap.ten} width={50} height={50} />}
        />
      );
    });
  };
  const renderRightMenu = () => {
    return heThongRap?.map((rap, index) => {
      let active = index === 0 ? "active" : "";
      return (
        <ItemRightPillsMenu
          key={index}
          active={active}
          idItem={rap.maHeThongRap.trim()}
          content={
            <PillsMenu
              menuLeft={renderLeftMenuChild(rap.maHeThongRap, rap.logo)}
              menuRight={renderRightMenuChild(rap.maHeThongRap)}
              moreMenuRight={renderMobiPillsMenu(rap.maHeThongRap)}
              colLeft={
                "menu-he-thong-rap-scroll col-12 col-md-6 d-none d-md-block p-0 "
              }
              colRight={"menu-he-thong-rap-scroll col-12 col-md-6 p-0"}
              menuRightStyle={"d-none d-md-block"}
            />
          }
        />
      );
    });
  };
  const renderLeftMenuChild = (maHeThongRap) => {
    let lichChieuRap = lichChieuHeThongRap.find(
      (lichChieuItem) => lichChieuItem.maHeThongRap === maHeThongRap
    );
    if (lichChieuRap) {
      let { maHeThongRap } = lichChieuRap;
      return lichChieuRap.lstCumRap.map((danhSachItem, index) => {
        let tenCumRap = danhSachItem?.tenCumRap.split("-");
        let active = index === 0 ? "active" : "";
        return (
          <ItemLeftPillsMenu
            key={index}
            active={active}
            idItem={danhSachItem?.maCumRap.trim()}
            content={
              <ItemThongTinRapChieuPhim
                logo={lichChieuRap.logo}
                maCumRap={danhSachItem?.maCumRap}
                tenCumRapx={tenCumRap ? tenCumRap[0] : ""}
                tenCumRap={tenCumRap ? tenCumRap[1] : ""}
                maHeThongRap={lichChieuRap.maHeThongRap}
                moreContent={
                  <NavLink
                    className="text-danger"
                    to={`/chitietcumrap/${maHeThongRap}/${danhSachItem?.maCumRap}`}
                  >
                    [Chi tiết]
                  </NavLink>
                }
              />
            }
          />
        );
      });
    }
  };
  const renderRightMenuChild = (maHeThongRap) => {
    let lichChieuRap = lichChieuHeThongRap.find(
      (lichChieuItem) => lichChieuItem.maHeThongRap === maHeThongRap
    );
    if (lichChieuRap) {
      return lichChieuRap.lstCumRap.map((danhSachItem, index) => {
        let active = index === 0 ? "active" : "";
        return (
          <Fragment key={index}>
            <ItemRightPillsMenu
              active={active}
              idItem={danhSachItem?.maCumRap.trim()}
              content={danhSachItem?.danhSachPhim
                .filter((phimItem) => {
                  let indexLichChieuTheoNgay = phimItem.lstLichChieuTheoPhim.findIndex(
                    (item) =>
                      moment(ngayChon).format("yyyy-MM-DD") ===
                        moment(item.ngayChieuGioChieu).format("yyyy-MM-DD") &&
                      moment(ngayChon).format("HH:mm") <
                        moment(item.ngayChieuGioChieu).format("HH:mm")
                  );
                  return indexLichChieuTheoNgay !== -1;
                })
                .map((phimItem, index1) => (
                  <Fragment key={index1}>
                    <ItemThongTinPhimMenu
                      phim={phimItem}
                      key={index}
                      path={"/chitietphongve/"}
                      moreContent={phimItem.moTa}
                      menuChoTrang={"trangChu"}
                    />
                  </Fragment>
                ))}
            />
          </Fragment>
        );
      });
    }
  };
  const renderMobiPillsMenu = (maHeThongRap) => {
    let lichChieuRap = lichChieuHeThongRap.find(
      (lichChieuItem) => lichChieuItem?.maHeThongRap === maHeThongRap
    );
    if (lichChieuRap) {
      return lichChieuRap.lstCumRap.map((danhSachItem, index) => {
        let tenCumRap = danhSachItem?.tenCumRap.split("-");
        return (
          <MobiPillsMenuResponsive
            key={index}
            responsive="d-block d-md-none"
            menuUp={
              <div key={index} className="menuRapItemResponsive gach-duoi-item">
                <ItemThongTinRapChieuPhim
                  logo={lichChieuRap.logo}
                  maCumRap={danhSachItem?.maCumRap}
                  tenCumRapx={tenCumRap ? tenCumRap[0] : ""}
                  tenCumRap={tenCumRap ? tenCumRap[1] : ""}
                  maHeThongRap={lichChieuRap.maHeThongRap}
                  moreContent={
                    <NavLink
                      className="text-danger"
                      to={`/chitietcumrap/${maHeThongRap}/${danhSachItem?.maCumRap}`}
                    >
                      [Chi tiết]
                    </NavLink>
                  }
                />
              </div>
            }
            menuDown={danhSachItem?.danhSachPhim
              .filter((phimItem) => {
                let indexLichChieuTheoNgay = phimItem.lstLichChieuTheoPhim.findIndex(
                  (item) =>
                    moment(ngayChon).format("yyyy-MM-DD") ===
                      moment(item.ngayChieuGioChieu).format("yyyy-MM-DD") &&
                    moment(ngayChon).format("HH:mm") <
                      moment(item.ngayChieuGioChieu).format("HH:mm")
                );
                return indexLichChieuTheoNgay !== -1;
              })
              .map((phimItem, index) => (
                <Fragment key={index}>
                  <ItemThongTinPhimMenu
                    phim={phimItem}
                    key={index}
                    path={"/chitietphongve/"}
                    moreContent={phimItem.moTa}
                    menuChoTrang={"trangChu"}
                  />
                </Fragment>
              ))}
          />
        );
      });
    }
  };
  return (
    <Element name="cumRap">
      <div className="container my-5">
        <PillsMenu
          menuLeft={renderLeftMenu()}
          menuLeftStyle={"flex-xl-column flex-nowrap scroll-bar "}
          menuRight={renderRightMenu()}
          colLeft={"col-12 col-xl-1 flex-row flex-xl-column p-0"}
          colRight={"col-12 col-xl-11"}
        />
      </div>
    </Element>
  );
}
