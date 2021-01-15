import React, { useEffect, useRef, useState } from "react";

export default function MobiPillsMenuResponsive({
  menuUp,
  menuDown,
  responsive,
  more,
  ...props
}) {
  const [toggleShow, setToggleShow] = useState(false);
  const wrapperRef = useRef(null);
  useEffect(() => {
    document.addEventListener("click", handleClickOutsite);
  }, []);
  useEffect(() => {
    // tham số 2 mảng rỗng => chỉ thay thế cho componentDidMount
    setToggleShow(false);
  }, [props.maCumRap]);
  const handleClickOutsite = (event) => {
    const { target } = event;
    if (!wrapperRef.current?.contains(target)) {
      setToggleShow(false);
    }
  };
  return (
    <>
      <div
        ref={wrapperRef}
        className={`col-12 mobiPillMenuResponsive gach-duoi-item-pills-menu ${
          responsive ? responsive : ""
        }`}
      >
        {more}
        <div
          className="w-100 gach-duoi-items-pills-menu"
          onClick={() => setToggleShow((toggleShow) => !toggleShow)}
        >
          {menuUp}
        </div>
        {toggleShow ? (
          <div className="position-relative gach-duoi-items-pills-menu">
            {menuDown.length ? (
              menuDown
            ) : (
              <div className=" w-100 text-center gach-duoi-item-pills-menu hienKhongCoRapChieu">
                Hiện không có lịch chiếu
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
