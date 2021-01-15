import React from 'react'

export default function MenuNavTabs({renderTags, renderContent}) {
    return (
        <div>
        <ul className="nav danhSachPhimTagUl" id="myTab" role="tablist">
            {renderTags}
        </ul>
        <div className="tab-content position-relative" id="myTabContent">
            {renderContent}
        </div>
      </div>
    )
}
