import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentAction } from "../../Redux/Action/QuanLyPhimAction";
import ChamDiemBangStar from "../ChamDiemBangStar";

export default function DanhGiaPhimVsComment() {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const handleRating = (title, match) => {
    setRating(match);
  };
  const handleChange = (e) => {
    let { value } = e.target;
    setComment(value);
  };
  const handleClick = () => {
    let contentComent = {
      hoTen: userLogin.hoTen,
      rating: rating,
      comment: comment,
      like: [],
    };
    dispatch(commentAction(contentComent));
  };
  return (
    <div>
      <ChamDiemBangStar
        styleCss={""}
        styleMatch={"display-4"}
        widthStar={19}
        heightStar={40}
        handleMatch={handleRating}
      />
      <div className="form-group">
        <textarea
          className="form-control"
          name="comment"
          id=""
          cols="30"
          rows="5"
          placeholder="Nói cho mọi người biết bạn suy nghĩ gì về phim này ..."
          onChange={(e) => handleChange(e)}
        ></textarea>
      </div>
      <div className="text-right">
        <button
          className="btn btn-warning"
          onClick={() => handleClick()}
          data-dismiss="modal"
        >
          Đăng
        </button>
      </div>
    </div>
  );
}
