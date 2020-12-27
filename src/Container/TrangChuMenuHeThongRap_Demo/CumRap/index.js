import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ItemThongTinPhimMenu from '../../../Components/ItemThongTinPhimMenu';
import ItemThongTinRapChieuPhim from '../../../Components/ItemThongTinRapChieuPhim';

export default function CumRap(props) {
    const [openRight , setOpenRight] = useState();
    const { lichChieuHeThongRap } = useSelector(state => state.QuanLyPhimReducer) ;
    useEffect(() => {
        let objLichChieuHeThongRap = lichChieuHeThongRap.find(item => item.maHeThongRap === props.maHeThongRap); 
        setOpenRight(objLichChieuHeThongRap?.lstCumRap[0]);
    },[props.maHeThongRap,lichChieuHeThongRap]);
    const renderCumRap = () => {
        let objLichChieuHeThongRap = lichChieuHeThongRap.find(item => item.maHeThongRap === props.maHeThongRap);
        return objLichChieuHeThongRap?.lstCumRap.map((itemRap,index) => {
            let tenCumRap = itemRap?.tenCumRap.split('-');
            let active = openRight?.maCumRap === itemRap.maCumRap ? 'active' : '';
            return (
                <div className={`poiter gach-duoi-menu-he-thong-rap-item ${active}`} onClick={() => setOpenRight(itemRap)} key={index}>
                    <ItemThongTinRapChieuPhim 
                        logo={objLichChieuHeThongRap.logo} 
                        maCumRap={itemRap.maCumRap} 
                        tenCumRapx={tenCumRap[0]} 
                        tenCumRap={tenCumRap} 
                        maHeThongRap={props.maHeThongRap}
                        diaChi={itemRap.diaChi}
                        moreContent={
                            <NavLink className='text-danger' to={`/chitietcumrap/${props.maHeThongRap}/${itemRap.maCumRap}`}>[Chi tiết]</NavLink>
                        }
                    />
                </div>
            )
        })
    }
    const renderLichChieuRap = () => {
        return openRight?.danhSachPhim.map((phim, index) => {
            return(
                <Fragment  key={index}>
                    <ItemThongTinPhimMenu phim={phim} path={'/chitietphim/'}/>
                </Fragment>
            )
        })
    }
    return (
        <div className='row'>
            <div className="col-6 menu-he-thong-rap-scroll border-menu-he-thong-rap-item">
                {renderCumRap()}
            </div>
            <div className="col-6 menu-he-thong-rap-scroll border-menu-he-thong-rap-item">
                {renderLichChieuRap()}
            </div>
        </div>
    )
}
