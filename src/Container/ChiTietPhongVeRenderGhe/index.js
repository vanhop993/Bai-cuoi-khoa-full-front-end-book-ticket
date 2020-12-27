import React from 'react'
import { useSelector } from 'react-redux';

export default function RenderGhePhongVe() {
    const {danhSachPhongVe} = useSelector(state => state.QuanLyPhimReducer);
    const { heThongRap } = useSelector(state => state.QuanLyPhimReducer);
    // console.log('heThongRap',heThongRap);
    // console.log('danhSachPhongVe',danhSachPhongVe);
    const renderThongTinCumRap = () => {
        let tenCumRap = danhSachPhongVe.thongTinPhim?.tenCumRap?.split('-');
        let heThongRapItem;
        if(tenCumRap){
            heThongRapItem = heThongRap.find(rap => rap.tenHeThongRap.trim() === tenCumRap[0].trim());
        }
        return (
            <>
                {
                    tenCumRap ? 
                        <div className='d-flex align-items-center'>
                            <div className='mr-2'><img width={50} height={50} src={heThongRapItem.logo} alt={heThongRapItem.tenHeThongRap}/></div>
                            <div>
                                <div><span className='text-success'>{tenCumRap[0]}</span> - {tenCumRap[1]}</div>
                                <div>{danhSachPhongVe.thongTinPhim.ngayChieu} - {danhSachPhongVe.thongTinPhim.gioChieu} - {danhSachPhongVe.thongTinPhim.tenRap}</div>
                            </div>
                        </div> : ''
                }
            </>
        )
    }
    return (
        <div>
            
        </div>
    )
}
