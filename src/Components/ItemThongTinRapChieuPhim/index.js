import React from 'react'
import DiaChiCumRap from '../DiaChiCumRap'
import moment from 'moment';
import { NavLink } from 'react-router-dom';

export default function ItemThongTinRapChieuPhim({logo, maCumRap, tenCumRapx , tenCumRap, maHeThongRap, lichChieuPhim ,path , moreContent ,diaChi}) {
    return (
        <>
            <div className="d-flex align-items-center thong-tin-rap-chieu-phim-item">
                <img className='mr-2 d-none d-lg-block' src={logo} alt={logo} width={50} height={50}/>
                <div>
                    {
                        path ? (
                            <NavLink  to={path}>
                                <div className='font-weight-bold tenRap text-dark text-menu-trang-chu-item' data-toggle="tooltip" title={`${tenCumRapx}-${tenCumRap}`}><span className='text-success'>{tenCumRapx}</span> - {tenCumRap}</div>
                            </NavLink>
                        ) : (
                            <div className='font-weight-bold tenRap text-dark text-menu-trang-chu-item'  data-toggle="tooltip" title={`${tenCumRapx}-${tenCumRap}`}><span className='text-success'>{tenCumRapx}</span> - {tenCumRap}</div>
                        )
                    }
                    
                    <div className='text-menu-trang-chu-item'><span className='text-primary'>Địa chỉ: </span>{diaChi ? diaChi :<DiaChiCumRap maHeThongRap={maHeThongRap} maCumRap={maCumRap}/>}</div>
                    {moreContent}
                </div>
            </div>
            {
               lichChieuPhim ? (
               <> 
                <p>Giờ chiếu:</p>
                {lichChieuPhim.slice(0,4).map((lichChieu,index) => {
                    return (
                        <NavLink to={`/chitietphongve/${lichChieu.maLichChieu}`} className="text-success mr-3 gioChieu" key={index}>{moment(lichChieu.ngayChieuGioChieu).format("HH:MM")}</NavLink>
                     )
                    })
                }
                </> ) : ''
           }  
        </>
    )
}
