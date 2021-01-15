import React, { useEffect, useState } from "react";
import moment from "moment";

let arrLayThuNgay = [];
let now = new Date();
export default function TinhThuNgay({ handleClick }) {
  const [activeButton, setActiveButton] = useState(0);
  // hàm tính thế kỷ
  const century = (y) => {
    return Math.floor(y / 100);
  };

  // hàm tính tháng cho công thức zeller
  const month = (m) => {
    return m < 3 ? m + 10 : m - 2;
  };

  // hàm tính năm trong thể kỷ
  const year = (y) => {
    return y % 100;
  };

  // công thức zeller
  const _zeller = (day, month, year, century) => {
    return (
      ((13 * month - 1) / 5 +
        year / 4 +
        century / 4 +
        day +
        year -
        2 * century) %
      7
    );
  };

  // viết lại cho dễ dùng
  const zeller = (d, m, y) => {
    return _zeller(d, month(m), year(y), century(y));
  };
  // tinh năm nhuận
  // trả 0 là năm thường trả về 1 là năm nhuận
  const ktNamNhuan = (year) => {
    if (year % 4 || (year % 100 === 0 && year % 400)) return 0;
    else return 1;
  };
  // tính số ngày trong tháng
  const daysIn = (month, year) => {
    return month === 2 ? 28 + ktNamNhuan(year) : 31 - (((month - 1) % 7) % 2);
  };
  // Tháng 3 = 1, Tháng 4 = 2,…, Tháng 12 = 10, Tháng 1 = 11, Tháng 2 = 12
  const chuyenThuSangTiengViet = (day, mobile) => {
    if (mobile) {
      switch (day) {
        case "Monday": {
          return "T2";
        }
        case "Tuesday": {
          return "T3";
        }
        case "Wednesday": {
          return "T4";
        }
        case "Thursday": {
          return "T5";
        }
        case "Friday": {
          return "T6";
        }
        case "Saturday": {
          return "T7";
        }
        case "Sunday": {
          return "CN";
        }
      }
    } else {
      switch (day) {
        case "Monday": {
          return "Thứ 2";
        }
        case "Tuesday": {
          return "Thứ 3";
        }
        case "Wednesday": {
          return "Thứ 4";
        }
        case "Thursday": {
          return "Thứ 5";
        }
        case "Friday": {
          return "Thứ 6";
        }
        case "Saturday": {
          return "Thứ 7";
        }
        case "Sunday": {
          return "Chủ nhật";
        }
      }
    }
  };
  const arrThuNgayDungRender = (mobile) => {
    let arrThuNgay = [];
    let nowDate = now.getDate();
    let nowMonth = now.getMonth() + 1;
    let nowYear = now.getFullYear();
    let soNgayTrongThang = daysIn(nowMonth, nowYear);
    for (let i = 0; i < 14; i++) {
      if (nowDate + i <= soNgayTrongThang) {
        arrThuNgay.push(`${nowYear}-${nowMonth}-${nowDate + i}`);
      } else {
        if (nowMonth === 12) {
          nowYear++;
          nowMonth = 0;
        }
        arrThuNgay.push(
          `${nowYear}-${nowMonth + 1}-${nowDate + i - soNgayTrongThang}`
        );
      }
    }
    return arrThuNgay.map((item, index) => {
      let active = index === activeButton ? "active" : "";
      return (
        <>
          <div
            key={index}
            className={`thuNgayItem font-weight-bold  ${active}`}
            onClick={() => {
              setActiveButton(index);
              handleClick(item);
            }}
          >
            <div className="text-center text-nowrap thu">
              {chuyenThuSangTiengViet(moment(item).format("dddd"), mobile)}
            </div>
            <div className="text-center ngay">
              {mobile
                ? moment(item).format("DD")
                : moment(item).format("DD/MM")}
            </div>
          </div>
        </>
      );
    });
  };

  return (
    <>
      <div className="d-none d-md-block scroll-bar">
        <div className="thuNgayContainer">{arrThuNgayDungRender(false)}</div>
      </div>
      <div className="d-block d-md-none scroll-bar">
        <div className="thuNgayContainer">{arrThuNgayDungRender(true)}</div>
      </div>
    </>
  );
}
