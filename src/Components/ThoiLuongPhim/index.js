import Axios from 'axios';
import React, { useEffect } from 'react'
import { layDanhSachPhimApiAction, layThoiLuongPhimTrongChiTietPhimApiAction } from '../../Redux/Action/QuanLyPhimAction';
import { DOMAIN } from '../../Util/config';

let thoiLuong;
export default function ThongLuonPhim(props) {
    // useEffect(() => {
    //     let promise = Axios({
    //       url:
    //         DOMAIN + `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${props.maPhim}`,
    //       method: "GET",
    //     });
    //     promise.then((res) => {
    //         thoiLuong = res.data;
    //     });
    //     // thất bại
    //     promise.catch((error) => {
    //       console.log(error.response.data);
    //     });
    //   }, [props.maPhim]);
    //   console.log('props.maPhim',props.maPhim)
    if(props.chiTietPhim.heThongRapChieu){
        thoiLuong = props.chiTietPhim.heThongRapChieu[0]?.cumRapChieu[0]?.lichChieuPhim[0]?.thoiLuong;
    }
    return (
        <>
           {/* {thoiLuong?.heThongRapChieu[0].cumRapChieu[0].lichChieuPhim[0].thoiLuong}  */}
           {thoiLuong}
        </>
    )
}
