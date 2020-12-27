import React, { useEffect, useState } from 'react'

export default function FormValidate({user,handleSubmit,titleBtn}) {
    const [valueDangKy, setValueDangKy] = useState({});
    const [error, setError] = useState({});
    useEffect(() => {
        if(user) {
        setValueDangKy(user);
            for(let item of document.querySelectorAll('input[name]')){
                for(let keyUserInfo of Object.keys(user)){
                    if(item.name === keyUserInfo){
                        item.value = user[keyUserInfo];
                    }
                }
            }
        }
    }, [user])
    // const dispatch = useDispatch();
    const handleBlur = (e) => {
        let {name , value, placeholder} = e.target;
        setValueDangKy({...valueDangKy, [name] : value});
        if (value === '') {
            setError({ ...error, [name] : `${placeholder} không được bỏ trống`});
            return;
        }
        if(name === 'matKhau') {
            if(value.length < 6){
                setError({ ...error, [name] : `${placeholder} không được nhỏ hơn 6 ký tự`});
            return;
            }
        }
        let regex = /^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/;
        if(name === 'taiKhoan' || name === 'matKhau' || name === 'xacNhanMatKhau' || name === 'email'){
            if(!regex.test(value.trim())){
                setError({...error, [name]: `${placeholder} không được có ký tự đặc biệt`});
                return;
            }
        }
        let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(name === 'email') {
            if(!regexEmail.test(value.trim())){
                setError({...error, [name]: `${placeholder} không đúng định dạng`});
                return;
            }
        }
        setError({...error,[name]: ''});
        setValueDangKy({...valueDangKy, [name]: value});
    }
    const handleChange = (e) => {
        let {name} = e.target;
        setError({...error, [name]: ''});
    }
    return (
        <div className='container'>
             <form onSubmit = {(e) => {
                 e.preventDefault();
                 handleSubmit( valueDangKy, error)
                 }}>
                    <div className="row">
                        <div className="col-6">
                            <div className='form-group py-1'>
                                <input className='form-control' name='taiKhoan' type="text" placeholder='Tài khoản'onBlur = {(e) => handleBlur(e)} onChange={(e) =>handleChange(e)} />
                                <div className='text-danger'>{error.taiKhoan}</div>
                            </div>   
                            <div className='form-group py-1'>
                                <input className='form-control' name='matKhau' type="password" placeholder='Mật khẩu' onBlur = {(e) =>handleBlur(e)} onChange={(e) =>handleChange(e)}/>
                                <div className='text-danger'>{error.matKhau}</div>
                            </div>    
                            <div className='form-group py-1'>
                                <input className='form-control' name='hoTen' type="text" placeholder='Họ tên'onBlur = {(e) =>handleBlur(e)} onChange={(e) =>handleChange(e)}/>
                                <div className='text-danger'>{error.hoTen}</div>
                            </div> 
                        </div>
                        <div className="col-6">  
                            <div className='form-group py-1'>
                                <input className='form-control' name='email' type="text" placeholder='Email' onBlur = {(e) =>handleBlur(e)} onChange={(e) =>handleChange(e)}/>
                                <div className='text-danger'>{error.email}</div>
                            </div>    
                            <div className='form-group py-1'>
                                <input className='form-control' name='soDt' type="text" placeholder='Số điện thoại' onBlur = {(e) =>handleBlur(e)} onChange={(e) =>handleChange(e)}/>
                                <div className='text-danger'>{error.soDt}</div>
                            </div> 
                            <div className='form-group py-1'>
                                <select className='form-control' name='maLoaiNguoiDung' type="text" placeholder='Loại người dùng' onBlur = {(e) =>handleBlur(e)} onChange={(e) =>handleChange(e)}>
                                <option value="khachHang">Khách hàng</option>
                                <option value="quanTri">Quản trị</option>
                                </select>
                            </div> 
                        </div>
                    </div>
                    <div className='py-2 text-center'>
                            <button className="btn btn-success btn-submit w-100">{titleBtn}</button>
                    </div>
            </form>   
        </div>
    )
}
