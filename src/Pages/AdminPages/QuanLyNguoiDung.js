import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNguoiDungAction,
  layDanhSachNguoiDungPhanTrangApi,
  suaThongTinUserAction,
  timKiemNguoiDungAction,
} from "../../Redux/Action/QuanLyNguoiDungAction";
import { Pagination } from "antd";
import Swal from "sweetalert2";
import ModalBoot from "../../HOC/ModalBoot";
import FormValidate from "../../Container/QuanLyNguoiDungFormValidate";
import FormSearch from "../../Components/FormSearch";
import { GiAutoRepair } from "react-icons/gi";
import { BsFillTrashFill } from "react-icons/bs";

export default function QuanLyNguoiDung() {
  const [page, setPage] = useState();
  const [searchContent, setSearchContent] = useState("");
  const [showList, setShowList] = useState();
  const [modal, setModal] = useState();
  const { danhSachNguoiDungPhanTrang } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const { danhSachNguoiDungTimKiem } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setPage({ page: 1, items: 10 });
  }, []);
  useEffect(() => {
    async function fetchData() {
      dispatch(await layDanhSachNguoiDungPhanTrangApi(page?.page, page?.items));
    }
    fetchData();
  }, [page]);
  useEffect(() => {
    if (danhSachNguoiDungTimKiem.length) {
      setShowList(danhSachNguoiDungTimKiem);
    } else {
      setShowList(danhSachNguoiDungPhanTrang.items);
    }
  }, [danhSachNguoiDungTimKiem, danhSachNguoiDungPhanTrang]);
  // useEffect(() => {
  //     setShowList(danhSachNguoiDungPhanTrang.items);
  // }, [danhSachNguoiDungPhanTrang]);
  const xoaNguoiDung = (taiKhoan, page, items) => {
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
          dispatch(await deleteNguoiDungAction(taiKhoan, page, items));
        }
        fetchData();
      } else {
        return;
      }
    });
  };
  const suaThongTinUser = (values, errors) => {
    console.log(values);
    for (let item of Object.values(errors)) {
      if (item) {
        return;
      }
    }
    values.maNhom = "GP01";
    dispatch(suaThongTinUserAction(values, page?.page, page?.items));
  };
  const handleSearch = (e) => {
    let { value } = e.target;
    if (!value) {
      value = undefined;
    }
    dispatch(timKiemNguoiDungAction(value));
  };
  return (
    <div className="container">
      <FormSearch placeholder={"Nhập từ khóa"} handleSubmit={handleSearch} />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tài khoản</th>
            <th scope="col">Mật khẩu</th>
            <th scope="col">Họ tên</th>
            <th scope="col">Email</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {showList?.map((nguoiDung, index) => {
            return (
              <tr key={index}>
                <td>
                  {(danhSachNguoiDungPhanTrang.currentPage - 1) * 10 +
                    (index + 1)}
                </td>
                <td className="text-nowrap">{nguoiDung.taiKhoan}</td>
                <td>{nguoiDung.matKhau}</td>
                <td>{nguoiDung.hoTen}</td>
                <td>{nguoiDung.email}</td>
                <td className="text-nowrap">{nguoiDung.soDt}</td>
                <td className="d-flex">
                  <button
                    className="btn text-nowrap btn-primary mr-1 p-0"
                    data-toggle="modal"
                    data-target="#modelId"
                    onClick={() => {
                      setModal({
                        title: `Sửa thông tin tài khoản ${nguoiDung.taiKhoan}`,
                        Component: (
                          <FormValidate
                            user={nguoiDung}
                            titleBtn={"Cập nhập"}
                            handleSubmit={suaThongTinUser}
                          />
                        ),
                      });
                    }}
                  >
                    <div
                      className="p-2"
                      data-toggle="tooltip"
                      title="Sửa thông tin người dùng"
                    >
                      <GiAutoRepair />
                    </div>
                  </button>
                  <button
                    className="btn text-nowrap btn-danger mr-1 p-0"
                    onClick={() =>
                      xoaNguoiDung(nguoiDung.taiKhoan, page?.page, page?.items)
                    }
                  >
                    <div
                      className="p-2"
                      data-toggle="tooltip"
                      title="Xóa người dùng"
                    >
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
          total={danhSachNguoiDungPhanTrang.totalCount}
          onChange={(current, showLessItems) => {
            setPage({ page: current, items: showLessItems });
          }}
        />
      </div>
      <ModalBoot title={modal?.title} Component={modal?.Component} />
    </div>
  );
}
