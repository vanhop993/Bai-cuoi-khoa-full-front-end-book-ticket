import React, { useState } from "react";
import ChamDiemBangStar from "../ChamDiemBangStar";

export default function DanhGiaCumRapVsComment({ ten }) {
  const [match, setMatch] = useState({
    khongGian: 5,
    phongChieu: 5,
    giaCa: 5,
    phucVu: 5,
    dichVuKhac: 5,
  });
  const [commentInfo, setCommentInfo] = useState({
    email: "",
    phone: "",
    comment: "",
  });
  const handleMatch = (typeMatch, rating) => {
    switch (typeMatch) {
      case "khongGian": {
        setMatch({ ...match, khongGian: rating });
        break;
      }
      case "phongChieu": {
        setMatch({ ...match, phongChieu: rating });
        break;
      }
      case "giaCa": {
        setMatch({ ...match, giaCa: rating });
        break;
      }
      case "phucVu": {
        setMatch({ ...match, phucVu: rating });
        break;
      }
      case "dichVuKhac": {
        setMatch({ ...match, dichVuKhac: rating });
        break;
      }
      default:
        break;
    }
  };
  const handleChangeComment = (e) => {
    let { value } = e.target;
    setCommentInfo(value);
  };
  const handleDang = () => {
    for (let item of Object.values(commentInfo)) {
      if (!item) {
        return;
      }
    }
    console.log(match, commentInfo);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-5">
          <table className="table">
            <tr>
              <td>Không gian:</td>
              <td>
                <ChamDiemBangStar
                  styleCss={
                    "d-flex align-items-center justify-content-between flex-row-reverse"
                  }
                  title={"khongGian"}
                  widthStar={11}
                  heightStar={24}
                  handleMatch={handleMatch}
                />
              </td>
            </tr>
            <tr>
              <td>Phòng chiếu:</td>
              <td>
                <ChamDiemBangStar
                  styleCss={
                    "d-flex align-items-center justify-content-between flex-row-reverse"
                  }
                  title={"phongChieu"}
                  fontSizeStar={1}
                  widthStar={11}
                  heightStar={24}
                  handleMatch={handleMatch}
                />
              </td>
            </tr>
            <tr>
              <td>Giá cả:</td>
              <td>
                <ChamDiemBangStar
                  styleCss={
                    "d-flex align-items-center justify-content-between flex-row-reverse"
                  }
                  title={"giaCa"}
                  fontSizeStar={1}
                  widthStar={11}
                  heightStar={24}
                  handleMatch={handleMatch}
                />
              </td>
            </tr>
            <tr>
              <td>Phục vụ:</td>
              <td>
                <ChamDiemBangStar
                  styleCss={
                    "d-flex align-items-center justify-content-between flex-row-reverse"
                  }
                  title={"phucVu"}
                  widthStar={11}
                  heightStar={24}
                  handleMatch={handleMatch}
                />
              </td>
            </tr>
            <tr>
              <td>Dich vụ khác:</td>
              <td>
                <ChamDiemBangStar
                  styleCss={
                    "d-flex align-items-center justify-content-between flex-row-reverse"
                  }
                  title={"dichVuKhac"}
                  widthStar={11}
                  heightStar={24}
                  handleMatch={handleMatch}
                />
              </td>
            </tr>
          </table>
        </div>
        <div className="col-12 col-md-7">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="E-mail"
              name="email"
              onChange={(e) => handleChangeComment(e)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Phone"
              name="phone"
              onChange={(e) => handleChangeComment(e)}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              type="text"
              placeholder={`Hãy nói cho mọi người bạn nghĩ gì về ${ten}...`}
              rows="10"
              onChange={(e) => handleChangeComment(e)}
            />
          </div>
        </div>
        <hr />
        <div className="text-center text-md-right w-100 d-block d-md-flex justify-content-between">
          <div></div>
          <div>
            <p className="text-danger">Email không được bỏ trống</p>
            <p className="text-danger">Phone không được bỏ trống</p>
          </div>
          <button
            className="btn btn-warning btn-dang"
            onClick={() => {
              handleDang();
            }}
          >
            Đăng
          </button>
        </div>
      </div>
    </div>
  );
}
