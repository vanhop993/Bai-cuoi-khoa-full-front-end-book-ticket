import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import ChiTietCumRapMenu from '../Container/ChiTietCumRapMenu';
import ChiTietCumRapThongTinRap from '../Container/ChiTietCumRapThongTinRap';
import { displayLoading } from '../Redux/Action/LoadingAction';
import { layThongTinLichChieuHeThongRapApiAction } from '../Redux/Action/QuanLyPhimAction';

export default function ChiTietCumRap(props) {
    let maCumRap = props.match.params.macumrap;
    let maHeThongRap = props.match.params.mahethongrap;
    const dispatch = useDispatch();
    useEffect(async()=>{ 
        async function fetchData() {
            dispatch(await layThongTinLichChieuHeThongRapApiAction());
        }
        fetchData();
    },[]);
    return (
        <>
            <ChiTietCumRapThongTinRap maCumRap = {maCumRap} maHeThongRap={maHeThongRap}/>
            <ChiTietCumRapMenu maCumRap = {maCumRap} maHeThongRap={maHeThongRap} />
        </>
    )
}
