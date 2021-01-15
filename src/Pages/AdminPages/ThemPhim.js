import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { themPhimUpLoadHinh } from "../../Redux/Action/QuanLyPhimAction";
import moment from "moment";
import FormValidateQLPhim from "../../Container/QuanLyPhimFormValidate";
import Swall from "sweetalert2";

export default function ThemPhim() {
  // const [value, setValue] = useState({
  //     maPhim: 0,
  //     tenPhim: "",
  //     biDanh: "",
  //     trailer: "",
  //     hinhAnh: {},
  //     moTa: "",
  //     maNhom: "GP01",
  //     ngayKhoiChieu: "",
  //     danhGia: 0
  //   });
  // const [error,setError] = useState();
  const [showError, setShowError] = useState("");
  const dispatch = useDispatch();
  // const handleChange = (e) => {
  //     setError('');
  //     e.target.name === 'hinhAnh' ? setValue({...value,[e.target.name]: e.target.files[0]}) : setValue({...value,[e.target.name]: e.target.value});
  //     if(e.target.name === 'tenPhim'){
  //         setValue({...value,tenPhim: e.target.value})
  //     }
  //     if(e.target.name === 'ngayKhoiChieu'){
  //         setValue({...value,[e.target.name]: moment(e.target.value).format('DD-MM-yyyy')});
  //     }
  // }
  const handleThemPhim = (value, error) => {
    console.log(error);
    // e.preventDefault();
    const formData = new FormData();
    value.biDanh = value.tenPhim.replace(" ", "-");
    for (let item of Object.values(value)) {
      if (item === "") {
        setShowError("Vui lòng nhập đầy đủ tất cả các trường!!");
        return;
      }
    }
    // if(!Object.values(error).length){
    //   w
    // }
    // for (let item of Object.values(error)) {
    //   if (!item) {
    //     setShowError(item);
    //     return;
    //   }
    // }
    for (let key in value) {
      if (key === "hinhAnh") {
        if (!value[key].name) {
          //   setError("Vui lòng chọn file upload!!");
          return;
        }
      }
      formData.append(key, value[key]);
    }
    // formData.append('image', hinhUpload , hinhUpload.name);
    dispatch(themPhimUpLoadHinh(formData));
  };
  return (
    <div>
      <div className="text-center text-danger">{showError}</div>
      <FormValidateQLPhim handleSubmit={handleThemPhim} />
      {/* <form>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label>Mã phim:</label>
                            <input className='form-control' name='maPhim' type='text' onChange={(e) => handleChange(e)}/>
                            <span className='text-danger'>{}</span>
                        </div>
                        <div className="form-group">
                            <label>Tên phim:</label>
                            <input className='form-control' name='tenPhim' type='text' onChange={(e) => handleChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label>Trailer phim:</label>
                            <input className='form-control' name='trailer' type='text' onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Ngày khởi chiếu:</label>
                            <div className="d-flex">  
                                <input className='form-control' name='ngayKhoiChieu' type='date'  onChange={(e) => handleChange(e)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Đánh giá:</label>
                            <input className='form-control' name='danhGia' type='text'onChange={(e) => handleChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label>Hình ảnh:</label><br/>
                            <input type='file' name='hinhAnh' style={{fontSize:'1.4rem'}} onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label>Mô tả:</label>
                            <textarea className='form-control' name='moTa' type='text' cols='30' rows='10' onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>
                    <div className='text-center w-100'>
                        <button className='btn btn-primary mx-2' onClick={(e) => handleThemPhim(e)}>Thêm phim</button>
                        <button className='btn btn-danger mx-2' >Xóa tất cả</button>
                    </div>
                </div>
            </form> */}
    </div>
  );
}
