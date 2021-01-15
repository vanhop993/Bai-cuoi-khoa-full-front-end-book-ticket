import React from "react";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

export default function RenderStar(props) {
  const renderStar = () => {
    let arrStar = [];
    for (let j = 0; j < 5; j++) {
      if (j <= props.danhGia / 2 - 1) {
        arrStar.push(<IoMdStar className="IoMdStar" key={j} />);
      } else if (props.danhGia % 2 !== 0 && j < props.danhGia / 2) {
        arrStar.push(<IoMdStarHalf className="IoMdStarHalf" key={j} />);
      } else {
        arrStar.push(<IoMdStarOutline className="IoMdStarOutline" key={j} />);
      }
    }
    return arrStar;
  };
  return <>{renderStar()}</>;
}
