import React, { Fragment } from 'react';
import ItemThongTinRapChieuPhim from '../../Components/ItemThongTinRapChieuPhim';
import PillsMenu from '../../Components/PillsMenu';
import ItemLeftPillsMenu from '../../Components/PillsMenu/ItemLeftPillsMenu';
import ItemRightPillsMenu from '../../Components/PillsMenu/ItemRightPillsMenu';
import MobiPillsMenuResponsive from '../../Components/ResponsiveMobiPillsMenu';
import {
    Element,
    animateScroll as scroll,
} from "react-scroll";

export default function ChiTietPhimMenu(props) {
    const renderLeftMenu = () =>{
        return props.chiTietPhim.heThongRapChieu?.map((heThongRap,index) => {
            let active = index === 0 ? 'active': '';
            return(
                <ItemLeftPillsMenu key={index} active={active} idItem= {heThongRap.maHeThongRap} content={<><img className='mr-2' src={heThongRap.logo} alt={heThongRap.ten } width={50} height={50}/><span className='text-dark d-none d-lg-flex'>{heThongRap.tenHeThongRap}</span></>}/>
            )}
        )
    } 
    const renderRightMenu = () => {
        return props.chiTietPhim.heThongRapChieu?.map((heThongRap,index) => {
            let active = index === 0 ? 'show active': '';
            return (
                <ItemRightPillsMenu key={index} active={active} idItem= {heThongRap.maHeThongRap} content={renderThongTinRap(heThongRap)}/>
            )
        })
    }
    const renderThongTinRap = (heThongRap) => {
        let {maHeThongRap} = heThongRap;
        return heThongRap.cumRapChieu.map((rap,index) => {
            let tenCumRap = rap.tenCumRap.split('-')
            return(
                <Fragment key={index}>
                    {
                        rap.lichChieuPhim.length > 0 ? (
                            <div className='gach-duoi-item p-4 bg-white'>
                                <ItemThongTinRapChieuPhim  
                                    maCumRap={rap.maCumRap} 
                                    logo={heThongRap.logo} 
                                    tenCumRapx={tenCumRap[0]} 
                                    tenCumRap={tenCumRap[1]} 
                                    maHeThongRap={maHeThongRap} 
                                    lichChieuPhim={rap.lichChieuPhim} 
                                    diaChi={rap.diaChi}
                                    path={`/chitietcumrap/${rap.maCumRap}`}
                                />
                            </div>
                        ) : ''
                    }
                </Fragment>
            )
        })
    }    
    const renderMobiPillsMenu = () => {
        return props.chiTietPhim.heThongRapChieu?.map((heThongRap,index) => {
            let active = index === 0 ? 'active': '';
            return(
                    <MobiPillsMenuResponsive 
                        key={index} 
                        responsive="d-block d-md-none" 
                        menuUp=
                            {
                                <ItemLeftPillsMenu 
                                    active={active} 
                                    idItem= {heThongRap.maHeThongRap} 
                                    content=
                                        {
                                            <>
                                                <img className='mr-2' src={heThongRap.logo} alt={heThongRap.ten } width={50} height={50}/>
                                                <span className='text-dark'>{heThongRap.tenHeThongRap}</span>
                                            </>
                                        }
                                />} 
                        menuDown=
                            {   
                                <ItemRightPillsMenu 
                                    active={active} 
                                    idItem= {heThongRap.maHeThongRap} 
                                    content={renderThongTinRap(heThongRap)}
                                />
                            }
                    /> 
            )}
        )
    }               
    return (
        <Element name='menuDatVe'>
            <PillsMenu responsive="d-none d-md-flex my-5" menuLeft={renderLeftMenu()} menuRight={renderRightMenu()} colLeft={'col-2 col-lg-4 flex-column'} colRight={'col-10 col-lg-8  menu-he-thong-rap-scroll'} />
            {renderMobiPillsMenu()}
        </Element>
    )
}
