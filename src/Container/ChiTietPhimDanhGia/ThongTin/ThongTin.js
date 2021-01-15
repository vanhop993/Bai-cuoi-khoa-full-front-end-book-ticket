import React from "react";
import moment from "moment";

export default function ThongTin({ chiTietPhim }) {
  return (
    <div className="row bg-light mb-5 thongTin borderRadius-10">
      <div className="col-12 col-sm-6">
        <table className="table">
          <tr>
            <td>Ngày công chiếu:</td>
            <td>{moment(chiTietPhim.ngayKhoiChieu).format("DD/MM/yyyy")}</td>
          </tr>
          <tr>
            <td>Đạo diễn:</td>
            <td>Chưa xác định</td>
          </tr>
          <tr>
            <td>Diễn viên</td>
            <td>Chưa xác định</td>
          </tr>
          <tr>
            <td>Thể loại:</td>
            <td>Chưa xác định</td>
          </tr>
          <tr>
            <td>Đinh dạng:</td>
            <td>Chưa xác định</td>
          </tr>
          <tr>
            <td>Quốc gia:</td>
            <td>Chưa xác định</td>
          </tr>
        </table>
      </div>
      <div className="col-12 col-sm-6 p-3 moTaPhim">
        <div className="mb-1">Nội dung:</div>
        <div>{chiTietPhim.moTa}</div>
      </div>
      <div className="col-12 p-2">
        {/* <video className='w-100' src={chiTietPhim.trailer} controls></video> */}
        <iframe
          className="w-100 trailerDanhGia"
          src={chiTietPhim.trailer}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
