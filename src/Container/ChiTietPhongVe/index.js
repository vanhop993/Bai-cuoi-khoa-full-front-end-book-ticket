import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import screen from "../../screen.png";
import DongHoDemNguoc from "../../Components/DongHoDemNguoc";
import { dangChonGhe, datVeAction } from "../../Redux/Action/QuanLyPhimAction";
import swal from "sweetalert2";
import moment from "moment";

let now = new Date();
export default function DatVe(props) {
  const [batDauDemNguoc, setBatDauDemNguoc] = useState(false);
  const { danhSachPhongVe } = useSelector((state) => state.QuanLyPhimReducer);
  const { lichChieuHeThongRap } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  const { mangGheDangDat } = useSelector((state) => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    setBatDauDemNguoc(true);
  }, []);
  const renderThongTinCumRap = () => {
    let tenCumRap = danhSachPhongVe.thongTinPhim?.tenCumRap?.split("-");
    let lichChieuItem = lichChieuHeThongRap.find((item) =>
      item.lstCumRap.find(
        (item1) => item1.tenCumRap === danhSachPhongVe.thongTinPhim?.tenCumRap
      )
    );
    return (
      <>
        {tenCumRap ? (
          <div className="d-block d-md-flex align-items-center">
            <div className="mr-2">
              <img
                width={50}
                height={50}
                src={lichChieuItem?.logo}
                alt={lichChieuItem?.tenHeThongRap}
              />
            </div>
            <div>
              <div>
                <span className="text-success">{tenCumRap[0]}</span> -{" "}
                {tenCumRap[1]}
              </div>
              <div>
                {danhSachPhongVe.thongTinPhim.ngayChieu ===
                moment(now).format("DD/MM/yyyy")
                  ? "Hôm nay"
                  : danhSachPhongVe.thongTinPhim.ngayChieu}{" "}
                - {danhSachPhongVe.thongTinPhim.gioChieu} -{" "}
                {danhSachPhongVe.thongTinPhim.tenRap}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  };
  const datVe = () => {
    if (mangGheDangDat.length === 0) {
      swal.fire("Thông báo", "Vui lòng chọn ghế trước khi đặt vé", "warning");
    } else if (localStorage.getItem("USER_LOGIN")) {
      let useLogin = JSON.parse(localStorage.getItem("USER_LOGIN"));
      let objDanhSachVe = {
        maLichChieu: props.maLichChieu,
        danhSachVe: mangGheDangDat,
        taiKhoanNguoiDung: useLogin.taiKhoan,
      };
      dispatch(datVeAction(objDanhSachVe));
    } else {
      props.history.push("/dangnhap");
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        {/* <div className="col-1">
                    <div
                        className=""
                        style={{
                        backgroundImage: `url('${danhSachPhongVe.thongTinPhim?.hinhAnh}')`
                        }}
                    />
                </div> */}
        <div className="col-12 col-xl-9 mb-5 overflow-auto">
          <div className="mx-0 mx-lg-5 minWidthDsGhe">
            <div className="d-block d-md-flex justify-content-between align-items-center text-center text-md-left">
              <div className="p-1 p-md-4">{renderThongTinCumRap()}</div>
              <div className="p-1 p-md-4">
                <div>Thời gian giữ ghế:</div>
                <h2 className="m-0 text-danger">
                  {batDauDemNguoc ? (
                    <DongHoDemNguoc
                      seconds={5}
                      maLichChieu={props.maLichChieu}
                    />
                  ) : (
                    ""
                  )}
                </h2>
              </div>
            </div>
            <div>
              <img className="w-100" src={screen} alt="screen.png" />
              <div className="mx-auto text-center">
                {danhSachPhongVe.danhSachGhe?.map((ghe, index) => {
                  let gheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
                  let disabled = ghe.daDat ? true : false;
                  let gheDaDat = ghe.daDat ? "gheDaDat" : "";
                  let indexGheDangDat = mangGheDangDat.findIndex(
                    (gheDangDat) => gheDangDat.maGhe === ghe.maGhe
                  );
                  let gheDangDat = indexGheDangDat !== -1 ? "gheDangDat" : "";
                  return (
                    <Fragment key={index}>
                      <button
                        disabled={disabled}
                        className={`ghe font-weight-bold ${gheVip} ${gheDaDat} ${gheDangDat}`}
                        onClick={() => {
                          dispatch(
                            dangChonGhe({
                              giaVe: ghe.giaVe,
                              maGhe: ghe.maGhe,
                              stt: ghe.stt,
                            })
                          );
                        }}
                      >
                        {ghe.daDat ? "x" : ghe.tenGhe}
                      </button>
                      {(index + 1) % 16 === 0 ? <br /> : ""}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-3 thong-tin-dat-ve p-3 p-md-0">
          <div>
            <div className="display-4 text-center mt-3 p-3 text-success">
              {mangGheDangDat
                .reduce((tongTien, gheDangDat) => {
                  tongTien += gheDangDat.giaVe;
                  return tongTien;
                }, 0)
                .toLocaleString()}{" "}
              đ
            </div>
            <hr />
            <div className="mt-3 p-3">
              <h4 className="font-weight-bold">
                {danhSachPhongVe.thongTinPhim?.tenPhim}
              </h4>
              <div>{danhSachPhongVe.thongTinPhim?.tenCumRap}</div>
              <div>
                {danhSachPhongVe.thongTinPhim?.ngayChieu} -{" "}
                {danhSachPhongVe.thongTinPhim?.gioChieu} -{" "}
                {danhSachPhongVe.thongTinPhim?.tenRap}
              </div>
            </div>
            <hr />
            <div className="mt-3 p-3 d-flex flex-wrap">
              <div className="text-danger">Ghế:</div>
              {mangGheDangDat.map((gheDangDat, index) => (
                <div key={index} className="px-1">
                  {gheDangDat.stt}
                </div>
              ))}
            </div>
            <hr />
            <div>
              <button
                className="btn btn-success mt-3 p-3 w-100"
                onClick={() => datVe()}
              >
                Đặt vé
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
