import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  layChiTietPhimApiAction,
  layThongTinCumRapTheoHeThongApiAction,
  layThongTinLichChieuHeThongRapApiAction,
  taoLichChieuAction,
} from "../../Redux/Action/QuanLyPhimAction";
import moment from "moment";
import Swal from "sweetalert2";
import ThongLuonPhim from "../../Components/ThoiLuongPhim";

let arrLichChieuTheoRap = [];
let now = new Date();
export default function TaoLichChieu(props) {
  const [cumRapMenu, setCumRapMenu] = useState({
    maHeThongRap: "",
    disabled: true,
  });
  const [rapMenu, setRapMenu] = useState({ dsRap: [], disabled: true });
  const [thongTinLichChieu, setThongTinLichChieu] = useState({
    maPhim: props.phim.maPhim,
    ngayChieuGioChieu: "",
    maRap: 0,
    giaVe: 0,
  });
  const [error, setError] = useState({});
  const [dsLichChieu, setDsLichChieu] = useState();
  const [showLichChieuTheoRap, setShowLichChieuTheoRap] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    for (let item of document.querySelectorAll("input[name]")) {
      item.value = "";
    }
    document.querySelector("#heThongRap").value = "";
    setCumRapMenu({ maHeThongRap: "", disabled: true });
    setRapMenu({ dsRap: [], disabled: true });
    setShowLichChieuTheoRap([]);
    setThongTinLichChieu({
      maPhim: props.phim.maPhim,
      ngayChieuGioChieu: "",
      maRap: 0,
      giaVe: 0,
    });
  }, [props.phim]);
  useEffect(() => {
    async function fetchData() {
      dispatch(await layThongTinLichChieuHeThongRapApiAction());
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      dispatch(
        await layThongTinCumRapTheoHeThongApiAction(cumRapMenu.maHeThongRap)
      );
    }
    if (cumRapMenu.maHeThongRap) {
      fetchData();
    }
  }, [cumRapMenu]);
  useEffect(() => {
    async function fetchData() {
      dispatch(await layChiTietPhimApiAction(props.phim.maPhim));
    }
    fetchData();
  }, [props.phim]);
  const { lichChieuHeThongRap } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  const { cumRap } = useSelector((state) => state.QuanLyPhimReducer);
  const handleChange = (e) => {
    let { name, value, label } = e.target;
    setError({ ...error, [name]: `` });
    if (name === "heThongRap") {
      if (!value) {
        setShowLichChieuTheoRap([]);
        arrLichChieuTheoRap = [];
        setCumRapMenu({ maHeThongRap: value, disabled: true });
        setRapMenu({ dsRap: value, disabled: true });
        setError({ ...error, [name]: `${label} chưa được chọn` });
        setDsLichChieu("");
        return;
      } else {
        setCumRapMenu({ maHeThongRap: value, disabled: false });
        setDsLichChieu({ maHeThongRap: value });
        return;
      }
    } else if (name === "cumRap") {
      if (!value) {
        setShowLichChieuTheoRap([]);
        arrLichChieuTheoRap = [];
        setRapMenu({ dsRap: value, disabled: true });
        setError({ ...error, [name]: `${label} chưa được chọn` });
        setDsLichChieu("");
        return;
      } else {
        let rap = cumRap.find((rapItem) => rapItem.maCumRap === value);
        setRapMenu({ dsRap: rap.danhSachRap, disabled: false });
        setDsLichChieu({ ...dsLichChieu, maCumRap: value });
        return;
      }
    } else if (name === "maRap") {
      if (!value) {
        setError({ ...error, [name]: `${label} chưa được chọn` });
        return;
      } else {
        setThongTinLichChieu({ ...thongTinLichChieu, [name]: value });
        setDsLichChieu({ ...dsLichChieu, maRap: value });
        renderLichChieu(value);
        return;
      }
    } else if (name === "ngayChieuGioChieu") {
      if (!value) {
        setError({ ...error, [name]: `${label} chưa được chọn` });
        return;
      } else {
        let newValue = moment(value).format("DD-MM-yyyy HH:mm:ss");
        setThongTinLichChieu({ ...thongTinLichChieu, [name]: newValue });
        return;
      }
    } else {
      if (!value) {
        setError({ ...error, [name]: `${label} không được để trống` });
      } else {
        setThongTinLichChieu({ ...thongTinLichChieu, [name]: value });
      }
    }
  };
  const renderLichChieu = (value) => {
    arrLichChieuTheoRap = [];
    if (dsLichChieu?.maHeThongRap) {
      let heThongRap = lichChieuHeThongRap?.find(
        (item) => item.maHeThongRap === dsLichChieu?.maHeThongRap
      );
      if (heThongRap !== -1) {
        let rap = heThongRap?.lstCumRap.find(
          (item) => item.maCumRap === dsLichChieu?.maCumRap
        );
        if (value) {
          rap?.danhSachPhim.forEach((itemPhim) => {
            itemPhim?.lstLichChieuTheoPhim.forEach((item) => {
              if (item.maRap === value) {
                arrLichChieuTheoRap.push(
                  <tr key={arrLichChieuTheoRap.length}>
                    <td>{item.maLichChieu}</td>
                    <td>{heThongRap.tenHeThongRap}</td>
                    <td>{rap.tenCumRap}</td>
                    <td>{item.tenRap}</td>
                    <td>{itemPhim.tenPhim}</td>
                    <td>{item.ngayChieuGioChieu}</td>
                    <td>{item.giaVe}</td>
                    <td>
                      <ThongLuonPhim maPhim={itemPhim.maPhim} />
                    </td>
                  </tr>
                );
              }
            });
          });
          setShowLichChieuTheoRap(arrLichChieuTheoRap.slice(0, 5));
        }
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Object.keys(error).length) {
      Swal.fire(
        "Thông báo",
        "Vui lòng điền đầy đủ thông tin để tạo lịch chiếu",
        "error"
      );
      return;
    }
    for (let item of Object.values(thongTinLichChieu)) {
      if (!item) {
        Swal.fire(
          "Thông báo",
          "Vui lòng điền đầy đủ thông tin để tạo lịch chiếu",
          "error"
        );
        return;
      }
    }
    for (let item of Object.values(error)) {
      if (item) {
        Swal.fire("Thông báo", item, "error");
        return;
      }
    }
    dispatch(taoLichChieuAction(thongTinLichChieu));
  };
  return (
    <div className="container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <select
                lable="Hệ thông rạp"
                className="custom-select"
                id="heThongRap"
                name="heThongRap"
                onChange={(e) => handleChange(e)}
              >
                <option value="">Chọn hệ thống rạp</option>
                {lichChieuHeThongRap.map((heThongRap, index) => (
                  <option key={index} value={heThongRap.maHeThongRap}>
                    {heThongRap.tenHeThongRap}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <select
                label="Cụm rạp"
                disabled={cumRapMenu.disabled}
                id=""
                name="cumRap"
                className="custom-select"
                onChange={(e) => handleChange(e)}
              >
                <option value="">Chọn cụm rạp</option>
                {cumRapMenu.maHeThongRap !== ""
                  ? cumRap.map((rap, index) => (
                      <option key={index} value={rap.maCumRap}>
                        {rap.tenCumRap}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
            <div className="form-group">
              <select
                label="Rạp"
                disabled={rapMenu.disabled}
                id=""
                className="custom-select"
                name="maRap"
                onChange={(e) => handleChange(e)}
              >
                <option value="">Chọn rạp</option>
                {rapMenu.dsRap
                  ? rapMenu.dsRap?.map((item, index) => (
                      <option key={index} value={item.maRap}>
                        {item.tenRap}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label className="label">Chọn ngày chiếu giờ chiếu:</label>
              <input
                className="form-control"
                name="ngayChieuGioChieu"
                type="datetime-local"
                onChange={(e) => handleChange(e)}
                min={moment(now).format("yyyy-MM-DDTHH:mm")}
              />
            </div>
            <div className="form-group">
              <label className="label">Giá vé:</label>
              <input
                className="form-control"
                name="giaVe"
                type="number"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-success">Thêm lịch chiếu</button>
        </div>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Mã lịch chiếu</th>
            <th>Hệ thống rạp</th>
            <th>Cụm rạp</th>
            <th>Tên rạp</th>
            <th>Tên phim chiếu</th>
            <th>Ngày chiếu giờ chiếu</th>
            <th>giá vé</th>
            <th>Thời lượng</th>
          </tr>
        </thead>
        <tbody className="dsLichChieuRap">{showLichChieuTheoRap}</tbody>
      </table>
      <div className="text-center">
        <Pagination
          defaultCurrent={1}
          total={arrLichChieuTheoRap.length}
          pageSize={5}
          onChange={(current, showLessItems, defaultPageSize) => {
            let showItems = showLessItems * current;
            setShowLichChieuTheoRap(
              arrLichChieuTheoRap.slice(showItems - showLessItems, showItems)
            );
          }}
        />
      </div>
    </div>
  );
}
