import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import moment from 'moment';

export default function FormValidateQLPhim({phim, handleSubmit}) {
    console.log('phim', phim);
    const [value, setValue] = useState({
        maPhim: 0,
        tenPhim: '',
        biDanh: '',
        trailer: '',
        hinhAnh: '',
        moTa: '',
        maNhom: "GP01",
        ngayKhoiChieu: '',
        danhGia: 0,
    });
    const [error,setError] = useState(
    );
    useEffect(()=> {
        setValue({
            maPhim: phim.maPhim,
            tenPhim: phim.tenPhim,
            biDanh: phim.biDanh,
            trailer: phim.trailer,
            hinhAnh: phim.hinhAnh,
            moTa: phim.moTa,
            maNhom: "GP01",
            ngayKhoiChieu: moment(phim.ngayKhoiChieu).format('DD/MM/yyyy'),
            danhGia: phim.danhGia,
        });
    },[phim])
    const dispatch = useDispatch();
    const handleChange = (e) => {
        e.target.name === 'hinhAnh' ? setValue({...value,[e.target.name]: e.target.files[0]}) : setValue({...value,[e.target.name]: e.target.value});
        if(e.target.name === 'tenPhim'){
            setValue({...value,tenPhim: e.target.value})
        }
        if(e.target.name === 'ngayKhoiChieu'){
            setValue({...value,[e.target.name]: moment(e.target.value).format('DD-MM-yyyy')});
        }
    }
    const handleBlur = (e) => {
        // let {name , value, label} = e.target;
        // if(!value){
        //     setError({...error,[e.target.name]: `${label} không được để trống`});
        // }
    }
    return (
        <div>
            <form>
                <div className='text-center text-danger'>{error}</div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label>Mã phim:</label>
                            <input className='form-control' name='maPhim' label='Mã phim' value={value.maPhim} type='text' onChange={(e) => handleChange(e)} onBlur={(e) => handleBlur(e)}/>
                            <span className='text-danger'>{}</span>
                        </div>
                        <div className="form-group">
                            <label>Tên phim:</label>
                            <input className='form-control' name='tenPhim' label='Tên phim'  value={value.tenPhim} type='text' onChange={(e) => handleChange(e)} onBlur={(e) => handleBlur(e)}/>
                        </div>
                        <div className="form-group">
                            <label>Trailer phim:</label>
                            <input className='form-control' name='trailer' label='Trailer phim'  value={value.trailer} type='text' onChange={(e) => handleChange(e)} onBlur={(e) => handleBlur(e)}/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Ngày khởi chiếu:</label>
                            <div className="d-flex">  
                                <input className='form-control' name='ngayKhoiChieu' label='Ngày khời chiếu' type='date'  onChange={(e) => handleChange(e)} onBlur={(e) => handleBlur(e)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Đánh giá:</label>
                            <input className='form-control' name='danhGia' label='Đánh giá'  value={value.danhGia} type='text'onChange={(e) => handleChange(e)} onBlur={(e) => handleBlur(e)}/>
                        </div>
                        <div className="form-group">
                            <label>Hình ảnh:</label><br/>
                            <input type='file' name='hinhAnh' label='Hình ảnh' style={{fontSize:'1.4rem'}} onChange={(e) => handleChange(e)} onBlur={(e) => handleBlur(e)}/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label>Mô tả:</label>
                            <textarea className='form-control'  value={value.moTa} name='moTa' type='text' cols='30' rows='10' onChange={(e) => handleChange(e)} onBlur={(e) => handleBlur(e)}/>
                        </div>
                    </div>
                    <div className='text-center w-100'>
                        <button className='btn btn-primary mx-2' onClick={(e) => {
                            e.preventDefault();
                            handleSubmit(value, error)}}>Cập nhập phim</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
