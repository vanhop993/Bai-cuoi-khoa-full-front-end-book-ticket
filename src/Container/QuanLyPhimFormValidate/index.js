import React, { useEffect, useState } from "react";
import moment from "moment";

export default function FormValidateQLPhim({ phim, handleSubmit }) {
  const [value, setValue] = useState({
    maPhim: "",
    tenPhim: "",
    biDanh: "",
    trailer: "",
    hinhAnh: "",
    moTa: "",
    maNhom: "GP01",
    ngayKhoiChieu: "",
    danhGia: "",
  });
  const [error, setError] = useState({});
  useEffect(() => {
    if (phim) {
      setValue({
        maPhim: phim.maPhim,
        tenPhim: phim.tenPhim,
        biDanh: phim.biDanh,
        trailer: phim.trailer,
        hinhAnh: null,
        moTa: phim.moTa,
        maNhom: "GP01",
        ngayKhoiChieu: moment(phim.ngayKhoiChieu).format("yyyy-MM-DD"),
        danhGia: phim.danhGia,
      });
    }
  }, [phim]);
  const handleChange = (e) => {
    switch (e.target.name) {
      case "hinhAnh": {
        setValue({ ...value, [e.target.name]: e.target.files[0] });
        break;
      }
      case "tenPhim": {
        setValue({ ...value, tenPhim: e.target.value });
        break;
      }
      case "ngayKhoiChieu": {
        setValue({
          ...value,
          [e.target.name]: moment(e.target.value).format("DD-MM-yyyy"),
        });
        break;
      }
      default: {
        setValue({ ...value, [e.target.name]: e.target.value });
        break;
      }
    }
  };
  const handleBlur = (e) => {
    let { name, value } = e.target;
    setError({ ...error, [name]: `` });
    if (!value) {
      setError({ ...error, [name]: `${name} không được để trống` });
    }
  };
  return (
    <div>
      <form>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label>Mã phim:</label>
              <input
                className="form-control"
                name="maPhim"
                value={value.maPhim}
                type="text"
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
              />
              <span className="text-danger">{}</span>
            </div>
            <div className="form-group">
              <label>Tên phim:</label>
              <input
                className="form-control"
                name="tenPhim"
                value={value.tenPhim}
                type="text"
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
              />
            </div>
            <div className="form-group">
              <label>Trailer phim:</label>
              <input
                className="form-control"
                name="trailer"
                value={value.trailer}
                type="text"
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>Ngày khởi chiếu:</label>
              <div className="d-flex">
                <input
                  className="form-control"
                  name="ngayKhoiChieu"
                  type="date"
                  value={`${value.ngayKhoiChieu}`}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleBlur(e)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Đánh giá:</label>
              <input
                className="form-control"
                name="danhGia"
                value={value.danhGia}
                type="text"
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
              />
            </div>
            <div className="form-group">
              <label>Hình ảnh:</label>
              <br />
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  name="hinhAnh"
                  style={{ fontSize: "1.4rem" }}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleBlur(e)}
                  required
                />
                <label
                  className="custom-file-label"
                  htmlFor="validatedCustomFile"
                >
                  {value.hinhAnh?.name ? (
                    // typeof value.hinhAnh === "file" ? (
                    value.hinhAnh.name
                  ) : (
                    // ) : (
                    // value.hinhAnh
                    // )
                    <span>Choose file...</span>
                  )}
                </label>
                <div className="invalid-feedback">
                  Example invalid custom file feedback
                </div>
              </div>

              {/* <input
                className="custom-file-input"
                type="file"
                name="hinhAnh"
                label="Hình ảnh"
                style={{ fontSize: "1.4rem" }}
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
              /> */}
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label>Mô tả:</label>
              <textarea
                className="form-control"
                value={value.moTa}
                name="moTa"
                type="text"
                cols="30"
                rows="10"
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
              />
            </div>
          </div>
          <div className="text-center w-100">
            <button
              className="btn btn-primary mx-2"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(value, error);
              }}
            >
              Cập nhập phim
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
