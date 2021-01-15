import React, { useEffect } from 'react';
import { layDanhSachPhongVeAction, layThongTinLichChieuHeThongRapApiAction } from '../Redux/Action/QuanLyPhimAction';
import {useDispatch } from 'react-redux';
import DatVe from '../Container/ChiTietPhongVe';
import { displayLoading } from '../Redux/Action/LoadingAction';

export default function ChiTietPhongVe(props) {
    let maLichChieu = props.match.params.malichchieu;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(displayLoading());
        async function fetchData() {
            dispatch(await layDanhSachPhongVeAction(maLichChieu));
            dispatch(await layThongTinLichChieuHeThongRapApiAction());
        }
        fetchData();
    },[])
 
    return (
        <DatVe maLichChieu={maLichChieu}/>
    )
}
