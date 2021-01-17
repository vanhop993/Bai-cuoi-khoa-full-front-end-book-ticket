import React, { Fragment, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import PhimItem from "../../Components/ItemPhim";
import { Element } from "react-scroll";
import moment from "moment";
import MenuNavTabs from "../../Components/MenuNavTabs";
import TabItem from "../../Components/MenuNavTabs/TabItem";
import ContentItem from "../../Components/MenuNavTabs/ContentItem";
import OwlCarouselComponent from "../../Components/Owl-Carousel";
import ModalVideo from "react-modal-video";

let arrTabs = [
  { tab: "Đang chiếu", id: "dangChieu" },
  { tab: "Sắp chiếu", id: "sapChieu" },
];
let now = new Date();
export default function TrangChuDanhSachPhim() {
  const [isOpen, setOpen] = useState(false);
  const [trailer, setTrailer] = useState("");
  const [soItemsPhimMobile, setSoItemsPhimMobile] = useState(1);
  const { dsPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const newDSPhim = useMemo(() => dsPhim, [dsPhim]);
  const handleOpenModal = () => {
    setOpen(true);
  };
  const layIdTrailer = (trailer) => {
    let idTrailer = trailer?.split("/")[4];
    setTrailer(idTrailer);
  };
  const dsPhimDangChieu = (phanTuBatDau, phanTuKetThuc) => {
    return newDSPhim?.slice(phanTuBatDau, phanTuKetThuc).map((phim, index) => (
      <div className="w-100 mb-4 col-12 col-sm-6 col-lg-3" key={index}>
        <PhimItem
          phim={phim}
          handleOpenModal={handleOpenModal}
          layIdTrailer={layIdTrailer}
        />
      </div>
    ));
  };
  const dsPhimSapChieu = () => {
    let year = parseInt(moment(now).format("YYYY"));
    let month = parseInt(moment(now).format("MM"));
    let date = parseInt(moment(now).format("DD"));
    let arrSapChieu = newDSPhim?.filter((phim) => {
      let yearBeginFilm = parseInt(moment(phim.ngayKhoiChieu).format("YYYY"));
      let monthBeginFilm = parseInt(moment(phim.ngayKhoiChieu).format("MM"));
      let dateBeginFilm = parseInt(moment(phim.ngayKhoiChieu).format("DD"));
      return (
        year < yearBeginFilm ||
        (year === yearBeginFilm && month < monthBeginFilm) ||
        (month === monthBeginFilm && date < dateBeginFilm)
      );
    });
    return arrSapChieu.map((item, index) => (
      <div className="w-100 mb-4 col-12 col-sm-6 col-lg-3" key={index}>
        <PhimItem
          phim={item}
          handleOpenModal={handleOpenModal}
          layIdTrailer={layIdTrailer}
        />
      </div>
    ));
  };
  const renderDanhSachPhim = () => {
    return (
      <MenuNavTabs renderTags={renderTags()} renderContent={renderContent()} />
    );
  };
  const renderTags = () => {
    return arrTabs.map((itemTab, index) => {
      let active = index === 0 ? "active" : null;
      return (
        <Fragment key={index}>
          <TabItem idContent={itemTab.id} tab={itemTab.tab} active={active} />
        </Fragment>
      );
    });
  };
  const itemsCarousel = (arrContent, arrFilter) => {
    let arrItemsShow = [];
    for (let i = 0; i < arrFilter.length; i++) {
      if (i && i % 8 === 0) {
        arrContent.push(arrItemsShow);
        arrItemsShow = [];
      }
      arrItemsShow.push(arrFilter[i]);
      if (i === arrFilter.length - 1) {
        arrContent.push(arrItemsShow);
        arrItemsShow = [];
      }
    }
  };
  const renderContent = () => {
    let index = arrTabs.findIndex((item) => item.id === "sapChieu");
    let index1 = arrTabs.findIndex((item) => item.id === "dangChieu");
    arrTabs[index].content = [];
    arrTabs[index1].content = [];
    itemsCarousel(arrTabs[index].content, dsPhimSapChieu());
    itemsCarousel(arrTabs[index1].content, dsPhimDangChieu(0, 31));
    return arrTabs.map((itemTab, index) => {
      let active = index === 0 ? "active" : null;
      return (
        <Fragment key={index}>
          <ContentItem
            idContent={itemTab.id}
            content={
              <>
                <div className="d-none d-lg-block">
                  <OwlCarouselComponent
                    items={1}
                    dots={false}
                    loop={false}
                    content={itemTab.content.map((tabItem, index) => {
                      return (
                        <div className="row" key={index}>
                          {tabItem}
                        </div>
                      );
                    })}
                  />
                </div>
                <div className="d-block d-lg-none">
                  {itemTab.content.map((tabItem, index) => {
                    return (
                      <div className="row" key={index}>
                        {index + 1 <= soItemsPhimMobile ? tabItem : ""}
                        <div className="text-center w-100">
                          {index + 1 === soItemsPhimMobile
                            ? renderButtonXemThemVsThuGon(
                                itemTab.content.length
                              )
                            : ""}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            }
            active={active}
          />
        </Fragment>
      );
    });
  };
  const renderButtonXemThemVsThuGon = (maxItem) => {
    if (soItemsPhimMobile === 1 && maxItem > 1) {
      return (
        <button
          onClick={() => {
            setSoItemsPhimMobile(soItemsPhimMobile + 1);
          }}
          className="btn btn-warning m-2"
        >
          Xem thêm
        </button>
      );
    } else if (soItemsPhimMobile > 1 && soItemsPhimMobile < maxItem) {
      return (
        <>
          <button
            onClick={() => {
              setSoItemsPhimMobile(soItemsPhimMobile + 1);
            }}
            className="btn btn-warning m-2"
          >
            Xem thêm
          </button>
          <button
            onClick={() => {
              setSoItemsPhimMobile(soItemsPhimMobile - 1);
            }}
            className="btn btn-warning m-2"
          >
            Thu gọn
          </button>
        </>
      );
    } else if (soItemsPhimMobile === maxItem && maxItem > 1) {
      return (
        <button
          onClick={() => {
            setSoItemsPhimMobile(soItemsPhimMobile - 1);
          }}
          className="btn btn-warning m-2"
        >
          Thu gọn
        </button>
      );
    }
  };
  return (
    <Element
      name="lichChieu"
      className="container z-index20 mt-5 danhSachPhimBackGround"
      id="lichChieu"
    >
      <div>{renderDanhSachPhim()}</div>
      <div>{}</div>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={trailer}
        onClose={() => setOpen(false)}
      />
    </Element>
  );
}
