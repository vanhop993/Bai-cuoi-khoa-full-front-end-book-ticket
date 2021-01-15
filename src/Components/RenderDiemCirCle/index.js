import React from "react";

export default function RenderDiemCirCle(props) {
  const renderDiemCircle = () => {
    let borderColor, corner;
    if (props.danhGia >= 0 && props.danhGia < 5) {
      borderColor = "#3a3a3a";
      corner = `${360 - (5 - props.danhGia) * 36}deg`;
    } else {
      borderColor = "#7ed321";
      corner = `${props.danhGia * 36}deg`;
    }
    return (
      <div
        className="bar"
        style={{
          border: `.06em solid ${borderColor}`,
          transform: `rotate(${corner})`,
        }}
      ></div>
    );
  };
  return (
    <div>
      <div id="circlePercent" className="c100">
        <div className="circleBorder"></div>
        <span className="ng-binding text-light">{props.danhGia}</span>
        <div className="slice">
          {renderDiemCircle()}
          <div className="fill"></div>
        </div>
      </div>
    </div>
  );
}
