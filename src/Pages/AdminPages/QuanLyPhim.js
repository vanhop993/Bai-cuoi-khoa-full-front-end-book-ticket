import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachPhimApiAction,
  layDanhSachPhimPhanTrangAction,
  deletePhimAction,
  capNhapPhimUploadAction,
} from "../../Redux/Action/QuanLyPhimAction";
import "antd/dist/antd.css";
import { Pagination } from "antd";
import moment from "moment";
import Swal from "sweetalert2";
import FormValidateQLPhim from "../../Container/QuanLyPhimFormValidate";
import TaoLichChieu from "../../Container/TaoLichChieu";
import ModalBoot from "../../HOC/ModalBoot";
import FormSearch from "../../Components/FormSearch";
import { BsFillTrashFill } from "react-icons/bs";
import { GiAutoRepair } from "react-icons/gi";
import { IoIosCreate } from "react-icons/io";

export default function QuanLyPhim() {
  const [page, setPage] = useState();
  const [showList, setShowList] = useState();
  const [modal, setModal] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setPage({ page: 1, items: 10 });
    async function fetchData() {
      dispatch(await layDanhSachPhimApiAction());
    }
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    async function fetchData() {
      dispatch(await layDanhSachPhimPhanTrangAction(page?.page, page?.items));
    }
    fetchData();
  }, []);
  const { danhSachPhimPhanTrang } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  useEffect(() => {
    setShowList(danhSachPhimPhanTrang.items);
  }, [danhSachPhimPhanTrang]);
  const { dsPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const handleSearch = (e) => {
    let { value } = e.target;
    let itemSearch = [];
    dsPhim.forEach((item) => {
      if (
        String(item.maPhim).includes(value) ||
        item.tenPhim.trim().toLowerCase().includes(value)
      ) {
        itemSearch.push(item);
      }
    });
    if (!value) {
      setShowList(danhSachPhimPhanTrang.items);
    } else {
      setShowList(itemSearch);
    }
  };

  const deletePhim = (maPhim, page, items) => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa?",
      // text: "Bạn sẽ không thể!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        async function fetchData() {
          dispatch(await deletePhimAction(maPhim, page, items));
        }
        fetchData();
      } else {
        return;
      }
    });
  };
  const handleSua = (value, error) => {
    const form = new FormData();
    for (let key in value) {
      form.append(key, value[key]);
    }
    dispatch(capNhapPhimUploadAction(form, page.page, page.items));
  };
  return (
    <div className="container">
      <FormSearch
        placeholder={"Nhập từ khóa tên phim hoặc mã phim"}
        handleSubmit={handleSearch}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Mã phim</th>
            <th scope="col">Tên phim</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Mô tả</th>
            <th scope="col">mã nhóm</th>
            <th scope="col">Ngày khởi chiếu</th>
          </tr>
        </thead>
        <tbody>
          {showList?.map((phim, index) => {
            return (
              <tr key={index}>
                <td>{phim.maPhim}</td>
                <td className="text-nowrap">{phim.tenPhim}</td>
                <td>
                  <img
                    src={phim.hinhAnh}
                    alt={phim.tenPhim}
                    width={50}
                    height={70}
                  />
                </td>
                <td>{phim.moTa}</td>
                <td>{phim.maNhom}</td>
                <td className="text-nowrap">
                  {moment(phim.ngayKhoiChieu).format("DD-MM-YYYY")}
                </td>
                <td className="d-flex">
                  <button
                    className="btn text-nowrap btn-success mr-1 p-0"
                    onClick={() =>
                      setModal({
                        title: `Thông tin lịch chiếu của phim ${phim.tenPhim}`,
                        Component: <TaoLichChieu phim={phim} />,
                      })
                    }
                    data-toggle="modal"
                    data-target="#modelId"
                  >
                    <div
                      className="p-2"
                      data-toggle="tooltip"
                      title="Tạo lịch chiếu cho phim"
                    >
                      <IoIosCreate />
                    </div>
                  </button>
                  <button
                    className="btn text-nowrap btn-primary mr-1 p-0"
                    data-toggle="modal"
                    data-target="#modelId"
                    onClick={() =>
                      setModal({
                        title: `Sửa thông tin của phim ${phim.tenPhim}`,
                        Component: (
                          <FormValidateQLPhim
                            phim={phim}
                            handleSubmit={handleSua}
                          />
                        ),
                      })
                    }
                  >
                    <div
                      className="p-2"
                      data-toggle="tooltip"
                      title="Sửa thông tin phim"
                    >
                      <GiAutoRepair />
                    </div>
                  </button>
                  <button
                    className="btn text-nowrap btn-danger mr-1 p-0"
                    onClick={() =>
                      deletePhim(phim.maPhim, page.page, page.items)
                    }
                  >
                    <div className="p-2" data-toggle="tooltip" title="Xóa phim">
                      <BsFillTrashFill />
                    </div>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-center">
        <Pagination
          defaultCurrent={1}
          total={danhSachPhimPhanTrang.totalCount}
          onChange={(current, showLessItems) => {
            setPage({ page: current, items: showLessItems });
          }}
        />
      </div>
      <ModalBoot title={modal?.title} Component={modal?.Component} />
    </div>
  );
}
