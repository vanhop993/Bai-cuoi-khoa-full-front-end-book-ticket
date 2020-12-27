
import React from 'react'

export default function ItemRightPillsMenu({active, idItem , content}) {
    return (
        <div style={{minHeight:'50px'}} className={"tab-pane show position-relative " + active} id={idItem + '-menu'} role="tabpanel" aria-labelledby={idItem}>
            <div className='position-absolute khong-co-lich-chieu'>Hiện không có lịch chiếu</div>
                {content}
        </div>
    )
}
