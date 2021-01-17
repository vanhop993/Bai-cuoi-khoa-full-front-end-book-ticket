import React from "react";
import { useSelector } from "react-redux";

export default function ThongTinRap({ maCumRap, maHeThongRap }) {
  const { lichChieuHeThongRap } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  const renderThongTinRap = () => {
    let heThongRap = lichChieuHeThongRap.find(
      (item) => item.maHeThongRap === maHeThongRap
    );
    let cumRap = heThongRap?.lstCumRap.find(
      (item) => item.maCumRap === maCumRap
    );
    return (
      <div className="container thongTinRap">
        <div className="row p-2">
          <div className="col-12 col-md-6">
            <table className="table">
              <tbody>
                <tr>
                  <td>Địa điểm:</td>
                  <td>{cumRap?.diaChi}</td>
                </tr>
                <tr>
                  <td>Điện thoại:</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>info@bhdstar.vn</td>
                </tr>
                <tr>
                  <td>Phòng chiếu:</td>
                  <td>7 2D. 4 3D</td>
                </tr>
                <tr>
                  <td>Giờ mở cửa:</td>
                  <td>8:00 - 24:00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-12 col-md-6">
            <p>Giới thiệu:</p>
          </div>
        </div>
      </div>
    );
  };
  return <>{renderThongTinRap()}</>;
}
