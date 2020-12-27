import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ItemThongTinPhimMenu from '../../Components/ItemThongTinPhimMenu';
import ItemThongTinRapChieuPhim from '../../Components/ItemThongTinRapChieuPhim';
import MobiPillsMenuResponsive from '../../Components/ResponsiveMobiPillsMenu';
import { displayLoading } from '../../Redux/Action/LoadingAction';

export default function ChiTietCumRapMenu({maCumRap, maHeThongRap}) {
    const {lichChieuHeThongRap} = useSelector(state => state.QuanLyPhimReducer);
    const [toggle, setToggle] = useState(maCumRap);
    const dispatch = useDispatch();
    const renderLichChieuHeThongRap = () => {
        let heThongRap = lichChieuHeThongRap.find(item => item.maHeThongRap === maHeThongRap);
        let index = heThongRap?.lstCumRap.findIndex(item1 => item1?.maCumRap === maCumRap);
        let rap = heThongRap?.lstCumRap.find(item1 => item1?.maCumRap === maCumRap);
        heThongRap?.lstCumRap.splice(index,1);
        heThongRap?.lstCumRap.unshift(rap);
        return heThongRap?.lstCumRap.map((rap, index) => {
            let menuActive = index === 0 ? 'menuActive' : '';
            let tenCumRap = rap ? rap.tenCumRap.split('-') : [];
            return (
                index ===0  ? (
                    <div key={index} className={`${menuActive}`}>
                    {
                        rap ? 
                        (
                            <a className='d-flex' to={`/chitietcumrap/${maHeThongRap}/${rap?.maCumRap}`} onClick={()=>setToggle(rap.maCumRap)}>
                                <ItemThongTinRapChieuPhim logo={heThongRap.logo} maCumRap={rap?.maCumRap} tenCumRapx={tenCumRap[0]} tenCumRap={tenCumRap[1]} maHeThongRap = {maHeThongRap}/>
                            </a>
                        ) : ''
                    }
                </div>
                ) :
                <div key={index} className={`${menuActive}`} onClick={() => dispatch(displayLoading())}>
                    {
                        rap ? 
                        (
                            <NavLink className='d-flex' to={`/chitietcumrap/${maHeThongRap}/${rap?.maCumRap}`} onClick={()=>setToggle(rap.maCumRap)}>
                                <ItemThongTinRapChieuPhim logo={heThongRap.logo} maCumRap={rap?.maCumRap} tenCumRapx={tenCumRap[0]} tenCumRap={tenCumRap[1]} maHeThongRap = {maHeThongRap}/>
                            </NavLink>
                        ) : ''
                    }
                </div>
            )
        })
    };
    const renderDanhSachPhimCuaRap = () => {
        let heThongRap = lichChieuHeThongRap.find(item => item.maHeThongRap === maHeThongRap);
        let rap = heThongRap?.lstCumRap.find(item1 => item1?.maCumRap === maCumRap);
        return rap?.danhSachPhim.map((phim,index) => {
            return (
                    <div className='chi-tiet-cum-rap-menu-right' key={index}>
                        <ItemThongTinPhimMenu phim={phim} path={'/chitietphongve/'}/>
                    </div>
                )
            })
    }
    const renderLichChieuHeThongRapMobile = () => {
        let heThongRap = lichChieuHeThongRap.find(item => item.maHeThongRap === maHeThongRap);
        let index = heThongRap?.lstCumRap.findIndex(item1 => item1?.maCumRap === maCumRap);
        let rap = heThongRap?.lstCumRap.find(item1 => item1?.maCumRap === maCumRap);
        heThongRap?.lstCumRap.splice(index,1);
        heThongRap?.lstCumRap.unshift(rap);
        let menuIndexX = [];
        return heThongRap?.lstCumRap.map((rap, index) => {
            let tenCumRap = rap ? rap.tenCumRap.split('-') : [];
            let menuIndex0 = index === 0 ? [
                (
                   <div key={index}>
                        <ItemThongTinRapChieuPhim className='p-3' logo={heThongRap.logo} maCumRap={rap?.maCumRap} tenCumRapx={tenCumRap[0]} tenCumRap={tenCumRap[1]} maHeThongRap = {maHeThongRap}/>
                   </div>
                )] : '';
            if(index !== 0){
                menuIndexX.push((
                    <div key={index} onClick={() => dispatch(displayLoading())}>
                        <NavLink to={`/chitietcumrap/${maHeThongRap}/${rap?.maCumRap}`} onClick={()=>setToggle(rap.maCumRap)}>
                            <ItemThongTinRapChieuPhim className='p-3' logo={heThongRap.logo} maCumRap={rap?.maCumRap} tenCumRapx={tenCumRap[0]} tenCumRap={tenCumRap[1]} maHeThongRap = {maHeThongRap}/>
                        </NavLink>
                    </div>
                ))
            }
            return (
                        <MobiPillsMenuResponsive key={index} menuUp={menuIndex0} menuDown={menuIndexX} maCumRap={rap?.maCumRap}/>
            )
        })
    };
    return (
        <div className="container my-5">
            <div className="row bg-white chi-tiet-cum-rap-border d-none d-lg-flex">
                <div className="col-6 chi-tiet-cum-rap-border menu-he-thong-rap-scroll">{renderLichChieuHeThongRap()}</div>
                <div className="col-6 menu-he-thong-rap-scroll">{renderDanhSachPhimCuaRap()}</div>
            </div>
            <div className="d-block d-lg-none chi-tiet-cum-rap-border">
                {renderLichChieuHeThongRapMobile()}
                <div className='menu-he-thong-rap-scroll'>
                    {renderDanhSachPhimCuaRap()}
                </div>
            </div>
        </div>
    )
}
