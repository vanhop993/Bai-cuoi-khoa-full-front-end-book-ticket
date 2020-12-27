import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import ThoiLuongPhim from '../ThoiLuongPhim';
import moment from 'moment';

export default function ItemThongTinPhimMenu({phim, path}) {
    const [toggle , setToggle] = useState(true);
    useEffect(() => {
        setToggle(true)
    }, [phim]);
    const renderGioChieu = (lichChieuPhimItem , index) => {
        switch (path){
            case '/chitietphim/' : {
                return (
                    <NavLink to={path + phim.maPhim} className="mr-3 my-3" key={index}>
                        <span className='gioChieu text-success'>{moment(lichChieuPhimItem.ngayChieuGioChieu).format('hh:mm')}</span>
                    </NavLink>
                )
            }
            case '/chitietphongve/' : {
                return (
                    <NavLink to={path + lichChieuPhimItem.maLichChieu} className="mr-3 my-3" key={index}>
                        <span className='gioChieu text-success'>{moment(lichChieuPhimItem.ngayChieuGioChieu).format('HH:MM')}</span>
                    </NavLink>
                )
            }
        }
    }
    return (
        <div className='w-100 position-relative thong-tin-phim-item p-4 bg-white'>
            <div className=' d-flex poiter align-items-center' onClick={() => setToggle(!toggle)}>
                <img className='mr-3' src={phim.hinhAnh} alt={phim.tenPhim} width={50} height={50} />
                <div className='font-weight-bold'>
                    {phim.tenPhim}
                    {/* {phim.maPhim ? <p><ThoiLuongPhim maPhim = {phim.maPhim}/> - 0 IMDb - 2D/Digital</p> : ''} */}
                </div>
                </div>
                {
                    toggle ? (
                        <div>
                            <p className='font-weight-bold'>Giờ chiếu phim: </p>
                            <div className="d-flex flex-wrap">
                                {phim.lstLichChieuTheoPhim.slice(0, 4).map((lichChieuPhimItem, index) => {
                                    return (
                                       <div key={index}>
                                            {renderGioChieu(lichChieuPhimItem, index)}
                                       </div>
                                    )
                                    })}
                            </div>
                        </div>
                    ) : ''
            }
         </div>                    
    )
}
