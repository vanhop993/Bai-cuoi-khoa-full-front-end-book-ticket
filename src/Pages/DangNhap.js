import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo-cybersoft.png';
import {useDispatch} from 'react-redux';
import { dangNhapAction } from '../Redux/Action/QuanLyNguoiDungAction';
// import Swal from 'sweetalert2';

export default function DangNhap() {
    const [inputValue, setInputValue] = useState({});
    const [inputError, setInputError] = useState({});
    const [inputErrorOnChange, setInputErrorOnChange] = useState({});
    const [btnSubmit, setBtnSubmit] = useState(true);
    const dispatch = useDispatch()
    const handleBlur = (e) =>{
        let {name, value} = e.target;
        if(value.trim() === ""){
            let newError = {...inputError,[name]: "Trường không được bỏ trống!!"};
            setInputError(newError);
            enableBtn(newError);
            return
        }
        let regex = /^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/;
        if(!regex.test(value.trim())){
            let newError = {...inputError,[name]: "Vui lòng không nhập ký tự đặc biệt"};
            setInputError(newError);
            enableBtn(newError);
            return
        }
        let newError = { ...inputError,[name] : ''};
        let newValue = { ...inputValue, [name] : value };
        setInputError(newError);
        enableBtn(newError);
        setInputValue(newValue);
    }

    const enableBtn = newError => {
        console.log('newError',newError);
        let arrNewError = Object.values(newError);
        let arrInputValue = Object.values(inputValue);
        let soValues = document.querySelectorAll('input[name]').length;
        for(let item of arrInputValue){
            if(!item){
                setBtnSubmit(true);
                return;
            }
        }
        if(arrNewError.length < soValues){
            setBtnSubmit(true);
            return;
        }
        if(newError.taiKhoan || newError.matKhau){
            setBtnSubmit(true);
        }else{
            setBtnSubmit(false);
        }
    }

    const handleChange = (e) => {
        let {name, value} = e.target;
        let newError = { ...inputError,[name] : ''};
        enableBtn(newError);
    }
    const submitHandle = (e) =>{
        e.preventDefault();
        let arrValuesError = Object.values(inputError);
        let soValues = document.querySelectorAll('input[name]').length;
        for(let item of arrValuesError){
            if(item){
                return;
            }
        }
        dispatch(dangNhapAction(inputValue));
    }
    return (
        <div className="dang-nhap">
            <div className='form-dang-nhap text-light'>
                <div className='text-center'>
                    <NavLink to='/'><img src={logo} alt="logo-cybersoft"/></NavLink>
                </div>
                <h3 className='text-center text-light'>Đăng nhập</h3>
                <form onSubmit={(e) => submitHandle(e)}>
                    <div className='form-group py-2'>
                        <input className='form-control' name="taiKhoan" type="text" placeholder='Tài khoản' onBlur={(e) =>handleBlur(e)} onChange={(e)=> handleChange(e)}/>
                        <span className="text-danger">{inputError.taiKhoan}</span>
                    </div>   
                    <div className='form-group py-2'>
                        <input className='form-control' name="matKhau" type="password" placeholder='Mật khẩu' onBlur={(e) =>handleBlur(e)} onChange={(e)=> handleChange(e)}/>
                        <span className="text-danger">{inputError.matKhau}</span>
                    </div>    
                    <div className='py-2'>
                        <button disabled = {btnSubmit} className="btn btn-submit w-100">Đăng nhập</button>
                    </div>
                    <div>
                        <p>Nếu bạn chưa có tài khoản. Vui lòng bấm <NavLink to='/dangky'>đăng ký</NavLink>.</p>
                    </div>
                </form>
            </div>
        </div>
    )
}
