import React from 'react';
import { useSelector } from 'react-redux';
import ItemLeftPillsMenu from '../../Components/PillsMenu/ItemLeftPillsMenu';
import PillsMenu from '../../Components/PillsMenu';
import ItemRightPillsMenu from '../../Components/PillsMenu/ItemRightPillsMenu';
import { NavLink } from 'react-router-dom';
import ItemThongTinPhimMenu from '../../Components/ItemThongTinPhimMenu';
import _ from 'lodash';
import ItemThongTinRapChieuPhim from '../../Components/ItemThongTinRapChieuPhim';

export default function TrangChuMenu(props) {
    console.log('trangchumenu');
    const { heThongRap } = useSelector(state => state.QuanLyPhimReducer);
    const { lichChieuHeThongRap } = useSelector(state => state.QuanLyPhimReducer);
    const renderLeftMenu = () => {
        return heThongRap?.map((rap, index) => {
            let active = index === 0 ? 'active' : '';
            return (
                <ItemLeftPillsMenu key={index} active={active} idItem={rap.maHeThongRap.trim()} content={<img src={rap.logo} alt={ rap.ten } width={50} height={50}/>}/>
            )
        })
    }
    // console.log('trangChuMenu');
    const renderRightMenu = () => {
        return heThongRap?.map((rap, index) => {
            let active = index === 0 ? 'active' : '';
            return (
                <ItemRightPillsMenu key={index} active={active} idItem={rap.maHeThongRap.trim()} content={<PillsMenu menuLeft={renderLeftMenuChild(rap.maHeThongRap,rap.logo)} menuRight={renderRightMenuChild(rap.maHeThongRap)} colLeft={'menu-he-thong-rap-scroll col-6 d-block p-0 '} colRight={'menu-he-thong-rap-scroll col-6 p-0'}/>}/>
            )
        })
    }
    const renderLeftMenuChild = (maHeThongRap) => {
        let lichChieuRap = lichChieuHeThongRap.find(lichChieuItem => lichChieuItem.maHeThongRap === maHeThongRap);
        if (lichChieuRap) {
            let {maHeThongRap} = lichChieuRap;
            return lichChieuRap.lstCumRap.map((danhSachItem,index) => {
                    let tenCumRap = danhSachItem?.tenCumRap.split('-');
                    let active = index === 0 ? 'active' : '';
                    return (
                        (
                            <ItemLeftPillsMenu 
                                key={index} 
                                active={active} 
                                idItem={danhSachItem?.maCumRap.trim()} 
                                content={
                                    <ItemThongTinRapChieuPhim 
                                       logo={lichChieuRap.logo} 
                                       maCumRap={danhSachItem?.maCumRap} 
                                       tenCumRapx={tenCumRap ? tenCumRap[0] : ''} 
                                       tenCumRap ={tenCumRap ? tenCumRap[1] : ''}
                                       maHeThongRap= {lichChieuRap.maHeThongRap}
                                       moreContent = {<NavLink className='text-danger' to={`/chitietcumrap/${maHeThongRap}/${danhSachItem?.maCumRap}`}>[Chi tiết]</NavLink>}
                                    />
                                }
                            />
                        ) 
                    )
        
            })
        }
    }
    const renderRightMenuChild  = (maHeThongRap) => {
        let lichChieuRap = lichChieuHeThongRap.find(lichChieuItem => lichChieuItem.maHeThongRap === maHeThongRap);
        if (lichChieuRap) {
            return lichChieuRap.lstCumRap.map((danhSachItem, index) => {
                    let active = index === 0 ? 'active' : '';
                    return (
                        (
                            <ItemRightPillsMenu 
                                key={index} 
                                active={active} 
                                idItem={danhSachItem?.maCumRap.trim()} 
                                content={
                                    danhSachItem?.danhSachPhim.map((phimItem, index) => {
                                         return (
                                             <ItemThongTinPhimMenu phim = {phimItem} key={index} path={'/chitietphim/'}/>
                                            )})
                                } />
                        )
                    )}
            )
        }
    }
    return (
        <>
            <div className='container d-none d-md-block' style={{marginBottom:'5rem'}}>
                <PillsMenu menuLeft={renderLeftMenu()} menuRight={renderRightMenu()} colLeft={'col-12 col-lg-1 flex-row flex-lg-column'} colRight={'col-12 col-lg-11'}/>
            </div>
        </>
    )
}
