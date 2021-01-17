import React, { useState } from "react";
import starGold from "../../assets/img/starGold.png";
import starBackground from "../../assets/img/starBackground.png";

export default function ChamDiemBangStar({
  styleCss,
  title,
  widthStar,
  heightStar,
  handleMatch,
  styleMatch,
}) {
  const [rating, setRating] = useState(5);
  const [hoverStar, setHoverStar] = useState(null);
  const renderStarDanhGia = () => {
    return [...Array(10)].map((star, index) => {
      const ratingValue = index + 1;
      let rotateDeg = ratingValue % 2 ? "0deg" : "180deg";
      return (
        <label key={index}>
          <input
            className="starRadioInput"
            type="radio"
            name="raiting"
            value={ratingValue}
            onClick={() => {
              setRating(ratingValue);
              handleMatch(title, ratingValue);
            }}
          />
          <div
            className="starItem"
            onMouseEnter={() => setHoverStar(ratingValue)}
            onMouseLeave={() => setHoverStar(null)}
            style={{
              backgroundImage: `url('${
                ratingValue <= (hoverStar || rating) ? starGold : starBackground
              }')`,
              transform: `rotateY(${rotateDeg})`,
              backgroundSize: `${heightStar}px`,
              width: `${widthStar}px`,
              height: `${heightStar}px`,
            }}
          ></div>
        </label>
      );
    });
  };
  return (
    <div className={`${styleCss}`}>
      <div className={`text-center text-success ${styleMatch}`}>{rating}.0</div>
      <div className="starTinhDiemStar text-center d-flex justify-content-center">
        {renderStarDanhGia()}
      </div>
    </div>
  );
}
