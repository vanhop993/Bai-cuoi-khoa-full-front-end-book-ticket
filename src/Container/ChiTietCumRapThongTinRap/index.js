import React from 'react'
import { useSelector } from 'react-redux';

export default function ChiTietCumRapThongTinRap({maCumRap , maHeThongRap}) {
    const {lichChieuHeThongRap} = useSelector(state => state.QuanLyPhimReducer);
    const renderThongTinRap = () => {
        let heThongRap = lichChieuHeThongRap.find(item => item.maHeThongRap === maHeThongRap);
        let cumRap = heThongRap?.lstCumRap.find(item => item.maCumRap === maCumRap);
        return (
            <div className='container my-5'>
                <div className="row align-items-center">
                    <div className="col-12 col-md-4 text-center">
                        <img src={heThongRap?.logo} alt={cumRap?.tenCumRap} width={200} height={200}/>
                    </div>
                    <div className="col-12 col-md-8 text-center text-md-left">
                        <h4 className='font-weight-bold'>{cumRap?.tenCumRap}</h4>
                        <p>Địa chỉ: {cumRap?.diaChi}</p>  
                    </div>
                </div>
                <div  className="ChiTietPhimBackground"style={{backgroundImage: `url('${heThongRap?.logo}')`,}}/> 
            </div>
        )
    }
    return (
        <>
            {renderThongTinRap()}
        </>
    )
}
