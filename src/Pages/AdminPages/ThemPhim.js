import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { themPhimUpLoadHinh } from "../../Redux/Action/QuanLyPhimAction";
import FormValidateQLPhim from "../../Container/QuanLyPhimFormValidate";

export default function ThemPhim() {
  const [showError, setShowError] = useState("");
  const dispatch = useDispatch();
  const handleThemPhim = (value, error) => {
    const formData = new FormData();
    value.biDanh = value.tenPhim.replace(" ", "-");
    for (let item of Object.values(value)) {
      if (item === "") {
        setShowError("Vui lòng nhập đầy đủ tất cả các trường!!");
        return;
      }
    }
    for (let key in value) {
      if (key === "hinhAnh") {
        if (!value[key].name) {
          return;
        }
      }
      formData.append(key, value[key]);
    }
    dispatch(themPhimUpLoadHinh(formData));
  };
  return (
    <div>
      <div className="text-center text-danger">{showError}</div>
      <FormValidateQLPhim handleSubmit={handleThemPhim} />
    </div>
  );
}
