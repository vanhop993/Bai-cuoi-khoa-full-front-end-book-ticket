import React from "react";

export default function PillsMenu({
  menuLeft,
  menuLeftStyle,
  moreMenuLeft,
  menuRight,
  menuRightStyle,
  moreMenuRight,
  colLeft,
  colRight,
  responsive,
}) {
  return (
    <div className={`row border-menu-item ${responsive}`}>
      <div className={`border-right ${colLeft}`}>
        <div className="gach-duoi-item moreMenuLeft">{moreMenuLeft}</div>
        <div
          className={`nav flex-row ${menuLeftStyle}`}
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          {menuLeft}
        </div>
      </div>
      <div className={`${colRight}`}>
        {moreMenuRight}
        <div
          className={`tab-content ${menuRightStyle}`}
          id="v-pills-tabContent"
        >
          {menuRight}
        </div>
      </div>
    </div>
  );
}
