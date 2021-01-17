import React, { Fragment, useEffect, useState } from "react";
import ItemThongTinRapChieuPhim from "../../../Components/ItemThongTinRapChieuPhim";
import PillsMenu from "../../../Components/PillsMenu";
import ItemLeftPillsMenu from "../../../Components/PillsMenu/ItemLeftPillsMenu";
import ItemRightPillsMenu from "../../../Components/PillsMenu/ItemRightPillsMenu";
import MobiPillsMenuResponsive from "../../../Components/ResponsiveMobiPillsMenu";
import { Element } from "react-scroll";
import moment from "moment";
import TinhThuNgay from "../../../Components/TinhThuNgay";

let now = new Date();
export default function ChiTietPhimMenu(props) {
  const [ngayChon, setNgayChon] = useState();
  useEffect(() => {
    setNgayChon(moment(now).format("yyyy-MM-DD HH:mm"));
  }, []);
  const chonNgay = (item) => {
    setNgayChon(item);
  };
  const renderLeftMenu = () => {
    return props.chiTietPhim.heThongRapChieu?.map((heThongRap, index) => {
      let active = index === 0 ? "active" : "";
      return (
        <ItemLeftPillsMenu
          key={index}
          active={active}
          idItem={heThongRap.maHeThongRap}
          content={
            <>
              <img
                className="mr-2"
                src={heThongRap.logo}
                alt={heThongRap.ten}
                width={50}
                height={50}
              />
              <span className="text-dark d-none d-lg-flex">
                {heThongRap.tenHeThongRap}
              </span>
            </>
          }
        />
      );
    });
  };
  const renderRightMenu = () => {
    return props.chiTietPhim.heThongRapChieu?.map((heThongRap, index) => {
      let active = index === 0 ? "show active" : "";
      return (
        <ItemRightPillsMenu
          key={index}
          active={active}
          idItem={heThongRap.maHeThongRap}
          content={renderThongTinRap(heThongRap)}
        />
      );
    });
  };
  const renderThongTinRap = (heThongRap) => {
    let { maHeThongRap } = heThongRap;
    return heThongRap.cumRapChieu
      .filter((rap) => {
        let index1 = rap.lichChieuPhim?.findIndex(
          (lichChieu) =>
            moment(ngayChon).format("yyyy-MM-DD") ===
              moment(lichChieu.ngayChieuGioChieu).format("yyyy-MM-DD") &&
            moment(ngayChon).format("HH:mm") <
              moment(lichChieu.ngayChieuGioChieu).format("HH:mm")
        );
        return index1 !== -1;
      })
      .map((rap, index) => {
        let tenCumRap = rap.tenCumRap.split("-");
        return (
          <Fragment key={index}>
            {rap.lichChieuPhim.length > 0 ? (
              <div className="gach-duoi-item p-4 bg-white">
                <ItemThongTinRapChieuPhim
                  maCumRap={rap.maCumRap}
                  logo={heThongRap.logo}
                  tenCumRapx={tenCumRap[0]}
                  tenCumRap={tenCumRap[1]}
                  maHeThongRap={maHeThongRap}
                  lichChieuPhim={rap.lichChieuPhim}
                  diaChi={rap.diaChi}
                  ngayChon={ngayChon}
                />
              </div>
            ) : (
              ""
            )}
          </Fragment>
        );
      });
  };
  const renderMobiPillsMenu = () => {
    return props.chiTietPhim.heThongRapChieu?.map((heThongRap, index) => {
      let active = index === 0 ? "active" : "";
      return (
        <MobiPillsMenuResponsive
          key={index}
          responsive="d-block d-md-none"
          menuUp={
            <ItemLeftPillsMenu
              active={active}
              idItem={heThongRap.maHeThongRap}
              content={
                <div className="gach-duoi-items-chi-tiet-phim-menu">
                  <img
                    className="mr-2"
                    src={heThongRap.logo}
                    alt={heThongRap.ten}
                    width={50}
                    height={50}
                  />
                  <span className="text-dark">{heThongRap.tenHeThongRap}</span>
                </div>
              }
            />
          }
          menuDown={renderThongTinRap(heThongRap)}
        />
      );
    });
  };
  return (
    <Element name="menuDatVe" className="mb-5">
      <PillsMenu
        responsive="d-none d-md-flex"
        menuLeft={renderLeftMenu()}
        menuLeftStyle={"flex-column menu-he-thong-rap-scroll"}
        menuRight={renderRightMenu()}
        menuRightStyle={"menu-he-thong-rap-scroll"}
        moreMenuRight={<TinhThuNgay handleClick={chonNgay} />}
        colLeft={"col-2 col-lg-4"}
        colRight={"col-10 col-lg-8 p-0"}
        styleScroll={"menu-he-thong-rap-scroll "}
      />
      <div className="d-block d-md-none">
        <TinhThuNgay handleClick={chonNgay} />
      </div>
      {renderMobiPillsMenu()}
    </Element>
  );
}
