import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CumRap from "./CumRap";
import CumRapResponMobile from "./CumRapResponMobile";
import { Element } from "react-scroll";

export default function HeThongRapDemo(props) {
  const [openRight, setOpenRight] = useState();
  const { heThongRap } = useSelector((state) => state.QuanLyPhimReducer);
  useEffect(() => {
    setOpenRight(heThongRap[0]?.maHeThongRap);
  }, [heThongRap]);
  return (
    <Element
      name="cumRap"
      className="container border-menu-he-thong-rap-item my-5"
    >
      <div className="row d-none d-md-flex">
        <div className="col-12 col-lg-1 d-flex d-lg-block p-0">
          {heThongRap?.map((item, index) => {
            let activeItem = openRight === item.maHeThongRap ? "active" : "";
            return (
              <div
                className={`menu-he-thong-rap-item gach-duoi-menu-he-thong-rap-item poiter ${activeItem}`}
                key={index}
                onClick={() => setOpenRight(item.maHeThongRap)}
              >
                <img src={item.logo} alt={item.tenHeThongRap} />
              </div>
            );
          })}
        </div>
        <div className="col-12 col-lg-11">
          <CumRap maHeThongRap={openRight} />
        </div>
      </div>
      <div className="row d-block d-md-none">
        <div className="d-flex p-0 w-100 logo-heThongRap-mobile">
          {heThongRap?.map((item, index) => {
            let activeItem = openRight === item.maHeThongRap ? "active" : "";
            return (
              <div
                className={`menu-he-thong-rap-item gach-duoi-menu-he-thong-rap-item poiter ${activeItem}`}
                key={index}
                onClick={() => setOpenRight(item.maHeThongRap)}
              >
                <img
                  src={item.logo}
                  alt={item.tenHeThongRap}
                  width={35}
                  height={35}
                />
              </div>
            );
          })}
        </div>
        <div className="col-12">
          <CumRapResponMobile maHeThongRap={openRight} />
        </div>
      </div>
    </Element>
  );
}
