import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../../Components/DropDown";
import OptionSelect from "../../Components/DropDown/Option";
import moment from "moment";
import { layChiTietPhimApiAction } from "../../Redux/Action/QuanLyPhimAction";
import { LAY_CHI_TIET_PHIM_API } from "../../Redux/Const/QuanLyPhimConst";
import { history } from "../../Util/History";

export default function TrangChuCarouselMenu({ dsPhim }) {
  const { chiTietPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const [luaChon, setLuaChon] = useState({
    maPhim: 0,
    maCumRap: 0,
    ngayChieu: "",
    gioChieu: "",
  });
  const [btnSubmit, setBtnSubmit] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      dispatch(await layChiTietPhimApiAction(luaChon.maPhim));
    }
    if (luaChon.maPhim) {
      fetchData();
    } else {
      luaChon.maCumRap = 0;
      dispatch({
        type: LAY_CHI_TIET_PHIM_API,
        chiTietPhim: {},
      });
    }
  }, [luaChon.maPhim]);
  const renderDanhSachPhimDangChieu = () => {
    return dsPhim.map((item, index) => (
      <Fragment key={index}>
        <OptionSelect content={item.tenPhim} value={item.maPhim} />
      </Fragment>
    ));
  };
  const renderDanhSachRapDangChieu = () => {
    return chiTietPhim.heThongRapChieu?.map((itemHeThongRap) => {
      return itemHeThongRap.cumRapChieu.map((cumRap, index) => (
        <Fragment key={index}>
          <OptionSelect content={cumRap.tenCumRap} value={cumRap.maCumRap} />
        </Fragment>
      ));
    });
  };
  const renderNgayChieuPhim = () => {
    let arrRapChieu = chiTietPhim.heThongRapChieu?.find((item) =>
      item.cumRapChieu.find((item1) => item1.maCumRap === luaChon.maCumRap)
    );
    let cumRapChieu = arrRapChieu?.cumRapChieu.find(
      (item) => item.maCumRap === luaChon.maCumRap
    );
    return cumRapChieu?.lichChieuPhim.map((item, index) => (
      <Fragment key={index}>
        <OptionSelect
          content={moment(item.ngayChieuGioChieu).format("DD/MM/yyyy")}
          value={moment(item.ngayChieuGioChieu).format("yyyy-MM-DD")}
        />
      </Fragment>
    ));
  };
  const renderGioChieuPhim = () => {
    let arrRapChieu = chiTietPhim.heThongRapChieu?.find((item) =>
      item.cumRapChieu.find((item1) => item1.maCumRap === luaChon.maCumRap)
    );
    let cumRapChieu = arrRapChieu?.cumRapChieu.find(
      (item) => item.maCumRap === luaChon.maCumRap
    );
    if (luaChon.ngayChieu) {
      return cumRapChieu?.lichChieuPhim.map((item, index) => (
        <Fragment key={index}>
          <OptionSelect
            content={moment(item.ngayChieuGioChieu).format("HH:mm")}
            value={moment(item.ngayChieuGioChieu).format("HH:mm:ss")}
          />
        </Fragment>
      ));
    } else {
      return null;
    }
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setLuaChon({ ...luaChon, [name]: value });
    if (name === "gioChieu" && value) {
      setBtnSubmit(false);
    } else {
      setBtnSubmit(true);
    }
  };
  const handleSubmit = () => {
    let itemSearch = chiTietPhim.heThongRapChieu.find((item) =>
      item.cumRapChieu.find((item1) => item1.maCumRap === luaChon.maCumRap)
    );
    let itemSearch1 = itemSearch.cumRapChieu.find(
      (item) => item.maCumRap === luaChon.maCumRap
    );
    let itemCanTim = itemSearch1.lichChieuPhim.find(
      (item) =>
        item.ngayChieuGioChieu === luaChon.ngayChieu + "T" + luaChon.gioChieu
    );
    // history.push(`chitietphongve/${itemCanTim.maLichChieu}`);
    window.open(`chitietphongve/${itemCanTim.maLichChieu}`, "_blank");
  };
  return (
    <>
      <DropDown
        title="Phim"
        name="maPhim"
        content={renderDanhSachPhimDangChieu()}
        handleChange={handleChange}
      />
      <DropDown
        title="Rạp"
        name="maCumRap"
        content={renderDanhSachRapDangChieu()}
        handleChange={handleChange}
      />
      <DropDown
        title="Ngày xem"
        name="ngayChieu"
        content={renderNgayChieuPhim()}
        handleChange={handleChange}
      />
      <DropDown
        title="Suất chiếu"
        name="gioChieu"
        content={renderGioChieuPhim()}
        handleChange={handleChange}
      />
      <button
        disabled={btnSubmit}
        className="btn btn-warning text-nowrap w-20"
        onClick={() => handleSubmit()}
      >
        Mua vé ngay
      </button>
    </>
  );
}
