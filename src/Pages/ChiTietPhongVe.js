import React, { useEffect } from 'react';
import { layDanhSachPhongVeAction, layThongTinLichChieuHeThongRapApiAction } from '../Redux/Action/QuanLyPhimAction';
import {useDispatch } from 'react-redux';
import DatVe from '../Container/ChiTietPhongVe';
import { displayLoading } from '../Redux/Action/LoadingAction';

export default function ChiTietPhongVe(props) {
    // console.log('props.match',props.match);
    let maLichChieu = props.match.params.malichchieu;
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {
            dispatch(await layDanhSachPhongVeAction(maLichChieu));
            dispatch(await layThongTinLichChieuHeThongRapApiAction());
        }
        fetchData();
    }, [maLichChieu]);
    return (
        <DatVe maLichChieu={maLichChieu}/>
    )
}
