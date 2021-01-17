import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import DanhGiaCumRap from "./DanhGiaCumRap/DanhGiaCumRap";
import MenuNavTabs from "../../Components/MenuNavTabs";
import ContentItem from "../../Components/MenuNavTabs/ContentItem";
import TabItem from "../../Components/MenuNavTabs/TabItem";
import ChiTietCumRapMenu from "./ChiTietCumRapMenu";
import ThongTinRap from "./ThongTinRap/ThongTinRap";

let arrNavTab = [
  { tab: "Lịch chiêu", id: "lichChieu" },
  { tab: "Thông tin", id: "thongTin" },
  { tab: "Đánh giá", id: "danhGia" },
];
export default function ChiTietCunRapDanhGia({ maCumRap, maHeThongRap }) {
  const { lichChieuHeThongRap } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  const renderDanhSachPhim = () => {
    return (
      <MenuNavTabs renderTags={renderTags()} renderContent={renderContent()} />
    );
  };
  const renderTags = () => {
    return arrNavTab.map((itemTab, index) => {
      let active = index === 0 ? "active" : null;
      return (
        <Fragment key={index}>
          <TabItem idContent={itemTab.id} tab={itemTab.tab} active={active} />
        </Fragment>
      );
    });
  };
  const renderContent = () => {
    let heThongRapItem = lichChieuHeThongRap.find(
      (item) => item.maHeThongRap === maHeThongRap
    );
    let rap = heThongRapItem?.lstCumRap.find(
      (item) => item.maCumRap === maCumRap
    );
    return arrNavTab.map((itemTab, index) => {
      switch (itemTab.id) {
        case "lichChieu": {
          itemTab.content = (
            <ChiTietCumRapMenu
              maCumRap={maCumRap}
              maHeThongRap={maHeThongRap}
            />
          );
          break;
        }
        case "thongTin": {
          itemTab.content = (
            <ThongTinRap maCumRap={maCumRap} maHeThongRap={maHeThongRap} />
          );
          break;
        }
        case "danhGia": {
          itemTab.content = (
            <DanhGiaCumRap
              title={"Hãy chấm điểm cho rạp nhé !!"}
              titleModal={"Đánh giá"}
              ten={rap?.tenCumRap}
            />
          );
          break;
        }
        default:
          break;
      }
      let active = index === 0 ? "active" : null;
      return (
        <Fragment key={index}>
          <ContentItem
            idContent={itemTab.id}
            content={itemTab.content}
            active={active}
          />
        </Fragment>
      );
    });
  };
  return <div className="mb-5">{renderDanhSachPhim()}</div>;
}
