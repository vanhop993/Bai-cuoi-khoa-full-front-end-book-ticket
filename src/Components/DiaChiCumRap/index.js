import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinLichChieuHeThongRapApiAction } from '../../Redux/Action/QuanLyPhimAction';

export default function DiaChiCumRap(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {
            dispatch(await layThongTinLichChieuHeThongRapApiAction());
        }
        fetchData();
      }, []);
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
