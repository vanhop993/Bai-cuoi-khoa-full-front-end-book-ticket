import React, { useState } from "react";
import avatar from "../../../assets/img/avatar.png";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import RenderStar from "../../../Components/RenderStar";
import ModalBoot from "../../../HOC/ModalBoot";
import DanhGiaPhimVsComment from "../../../Components/DanhGiaPhimVsComment";
import DanhGiaCumRapVsComment from "../../../Components/DanhGiaCumRapVsComment";

export default function DanhGiaCumRap({ title, titleModal, ten }) {
  // const {arrCommentOfFilm} = useSelector(state => state.QuanLyPhimReducer);
  const [openModal, setOpenModal] = useState(false);
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const handleDanhGia = () => {
    if (userLogin) {
      setOpenModal(true);
    } else {
      Swal.fire({
        html:
          '<div class="mb-1">Bạn cần phải đăng nhập</div><div><a class="btn btn-warning" href="/dangnhap">Đăng nhập</a></div>',
        allowOutsideClick: true,
        showConfirmButton: false,
        width: 400,
      });
    }
  };
  const renderComment = () => {
    //     return arrCommentOfFilm?.map((item,index) => {
    //         console.log(item);
    //         return (
    //             <div className='w-100 p-3 mb-2 bg-light commentContent' key={index}>
    //                 <div className="d-flex align-items-center justify-content-between">
    //                     <div className="d-flex align-items-center mb-2">
    //                         <img className='mr-2' src={avatar} alt='img-user' width={30} height={30}/>
    //                         <div>{item.hoTen}</div>
    //                     </div>
    //                     <div>
    //                         <div className='text-center text-success ratingShow'>{item.rating}.0</div>
    //                         <RenderStar danhGia={item.rating}/>
    //                     </div>
    //                 </div>
    //                 <div className='w-100 commentShow'>
    //                     {item.comment}
    //                 </div>
    //                 <hr/>
    //                 <div className='likeShow d-flex align-items-center'>
    //                     <div className='likeIcon'><AiOutlineLike /></div>
    //                     <div className='soLike  ml-2'>{item.like.length} Thích</div>
    //                 </div>
    //             </div>
    //         )
    //     })
  };
  return (
    <>
      <div
        className="container w-100 p-3 bg-light mb-2 d-flex align-items-center justify-content-between danhGia"
        data-toggle="modal"
        data-target="#modelId"
        onClick={() => handleDanhGia()}
      >
        <div className="d-flex align-items-center">
          <img
            className="mr-2"
            src={avatar}
            alt="img-user"
            width={30}
            height={30}
          />
          <div>{title}</div>
        </div>
        <div className="d-none d-sm-block">
          <RenderStar danhGia={10} />
        </div>
      </div>
      {renderComment()}
      {openModal ? (
        <ModalBoot
          title={titleModal + " " + ten}
          Component={<DanhGiaCumRapVsComment ten={ten} />}
        />
      ) : null}
    </>
  );
}
