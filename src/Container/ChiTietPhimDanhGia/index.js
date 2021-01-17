import React, { Fragment } from "react";
import ChiTietPhimMenu from "./ChiTietPhimMenu";
import MenuNavTabs from "../../Components/MenuNavTabs";
import { useSelector } from "react-redux";
import ContentItem from "../../Components/MenuNavTabs/ContentItem";
import TabItem from "../../Components/MenuNavTabs/TabItem";
import ThongTin from "./ThongTin/ThongTin";
import DanhGia from "./DanhGia/DanhGia";

let arrNavTab = [
  { tab: "Lịch chiêu", id: "lichChieu" },
  { tab: "Thông tin", id: "thongTin" },
  { tab: "Đánh giá", id: "danhGia" },
];
export default function ChiTietPhimDanhGia() {
  const { chiTietPhim } = useSelector((state) => state.QuanLyPhimReducer);
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
    return arrNavTab.map((itemTab, index) => {
      switch (itemTab.id) {
        case "lichChieu": {
          itemTab.content = <ChiTietPhimMenu chiTietPhim={chiTietPhim} />;
          break;
        }
        case "thongTin": {
          itemTab.content = <ThongTin chiTietPhim={chiTietPhim} />;
          break;
        }
        case "danhGia": {
          itemTab.content = <DanhGia chiTietPhim={chiTietPhim} />;
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
