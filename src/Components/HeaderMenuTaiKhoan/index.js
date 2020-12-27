import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { dangXuatAction } from '../../Redux/Action/QuanLyNguoiDungAction';

export default function HeaderMenuTaiKhoan({avatar , hoTen}) {
    const [open , setOpen] = useState(false);
    const wrapperRef = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        document.addEventListener('click',handleClickOutsite)
    },[]);
    const dangXuat = () => {
      dispatch(dangXuatAction())
      window.location.reload();
    };
    const handleClickOutsite = (event) => {
        const {target} = event;
        if(!wrapperRef.current?.contains(target)){
            setOpen(false);
        }
    };
    return (
        <div ref={wrapperRef} className='d-flex userLogin align-items-center' onClick={() => {setOpen(open => !open)}}>
            <img className='mr-1' src={avatar}/>
            <div>{hoTen}</div>
            {
                open ? (
                    <div className='logout text-dark'>
                        <NavLink className='link-logout text-nowrap' to='/thongtintaikhoan'>Tài khoản</NavLink>
                        <div className='link-logout text-nowrap' onClick={() => dangXuat()}>Đăng xuất</div>
                    </div>
                ) : ''
            }
        </div>  
    )
}
