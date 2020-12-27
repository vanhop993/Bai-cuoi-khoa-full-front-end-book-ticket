import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loading from '../../assets/img/loading.gif';
import { displayLoading, hideLoading } from '../../Redux/Action/LoadingAction';

export default function Loading() {
    const {isLoading} = useSelector(state => state.LoadingReducer);
    const dispatch = useDispatch();
    // useEffect(() => {dispatch (displayLoading())},[])
    if(isLoading) {
        // setTimeout(() => {dispatch (hideLoading());},2500);
        return (
            <div className='bgLoading'>
                <img className='imgLoading' src={loading}/>
            </div>
        )
    }else {
        return '';
    }
}
