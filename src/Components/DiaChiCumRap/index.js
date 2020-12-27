import React from 'react'
import {  useSelector } from 'react-redux'

export default function DiaChiCumRap(props) {
    const { lichChieuHeThongRap } = useSelector(state => state.QuanLyPhimReducer) ;
    const renderDiaChi = () => {
        let cumRap = lichChieuHeThongRap.find(item => item.maHeThongRap === props.maHeThongRap);
        let obj =  cumRap?.lstCumRap.find(item => item.maCumRap === props.maCumRap);
        if(obj){
            return (
                <span className='text-dark' data-toggle="tooltip" title={obj.diaChi}>{obj.diaChi}</span>
            )
        }
        return null
    }
    return (
        <>
            {renderDiaChi()}
        </>
    )
}
