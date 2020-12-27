import React from 'react'

export default function PillsMenu({menuLeft, menuRight, colLeft, colRight ,responsive}) {
    return (
        <div className={`row border-menu-item ${responsive}`}>
            <div className={`nav border-menu-item flex-row ${colLeft}`} id="v-pills-tab" role="tablist" aria-orientation="vertical">
                {menuLeft}
            </div>
            <div className={`tab-content border-menu-item ${colRight}`} id="v-pills-tabContent">
                {menuRight}
            </div>
        </div>
    )
}
