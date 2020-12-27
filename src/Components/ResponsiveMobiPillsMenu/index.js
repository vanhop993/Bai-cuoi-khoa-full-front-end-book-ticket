import React, { useEffect, useState } from 'react'

export default function MobiPillsMenuResponsive({menuUp, menuDown, responsive, more, ...props}) {
    const [toggleShow, setToggleShow] = useState(false);
    useEffect(() => {
    // tham số 2 mảng rỗng => chỉ thay thế cho componentDidMount
        setToggleShow(false)
    }, [props.maCumRap]);
    return (
        <>
            <div className={`col-12 mobiPillMenuResponsive ${responsive ? responsive : ''}`}>
                {more}
                <div onClick={() => setToggleShow(toggleShow => !toggleShow)}>
                    {menuUp}
                </div>
                {
                    toggleShow ? <div>
                        {menuDown}
                    </div> : ''
                }
            </div> 
        </>
    )
}
