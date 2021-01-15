import React from 'react';
import { useSelector } from 'react-redux';
import loading from '../../assets/img/loading.gif';
// import { displayLoading, hideLoading } from '../../Redux/Action/LoadingAction';

export default function Loading() {
    const {isLoading} = useSelector(state => state.LoadingReducer);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     setTimeout(async () => {
    //         dispatch(displayLoading())
    //         // document.querySelector('.loader-container').style.transition = 'opacity 5s';
    //         // document.querySelector('.loader-container').style.opacity = '0';
      
    //         setTimeout(async () => {
    //             dispatch(hideLoading())
    //         //   document.querySelector('.loader-container').remove();
    //         }, 2000);
      
    //       }, 100);
    // },[])
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
