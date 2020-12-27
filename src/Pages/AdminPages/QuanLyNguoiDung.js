import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {deleteNguoiDungAction, layDanhSachNguoiDungPhanTrangApi, suaThongTinUserAction, timKiemNguoiDungAction} from '../../Redux/Action/QuanLyNguoiDungAction';
import { Pagination } from 'antd';
import Swal from 'sweetalert2';
import ModalBoot from '../../HOC/ModalBoot';
import FormValidate from '../../Container/QuanLyNguoiDungFormValidate';
import FormSearch from '../../Components/FormSearch';

export default function QuanLyNguoiDung() {
    const [page, setPage] = useState();
    const [searchContent, setSearchContent] = useState('');
    const [showList, setShowList] = useState();
    const [modal, setModal] = useState();
    const {danhSachNguoiDungPhanTrang} = useSelector(state => state.QuanLyNguoiDungReducer);
    const {danhSachNguoiDungTimKiem} = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        setPage({page:1,items:10});
    }, []);
    useEffect(() => {
        async function fetchData(){
            dispatch(await layDanhSachNguoiDungPhanTrangApi(page?.page, page?.items));
        }
        fetchData();
    }, [page]);
    useEffect(() => {
        if(danhSachNguoiDungTimKiem.length){
            setShowList(danhSachNguoiDungTimKiem);
        }else{
            setShowList(danhSachNguoiDungPhanTrang.items);
        }
    }, [danhSachNguoiDungTimKiem,danhSachNguoiDungPhanTrang]);
    // useEffect(() => {
    //     setShowList(danhSachNguoiDungPhanTrang.items);
    // }, [danhSachNguoiDungPhanTrang]);
    const xoaNguoiDung = (taiKhoan , page ,items) => {
        Swal.fire({
            title: 'Bạn có chắc muốn xóa?',
            // text: "Bạn sẽ không thể!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                async function fetchData(){
                    dispatch(await deleteNguoiDungAction(taiKhoan, page ,items));
                }
                fetchData();
            }else {
                return;
            }
          })
    }
    const suaThongTinUser = (values, errors) => {
        console.log(values);
        for(let item of Object.values(errors)){
            if(item){
                return;
            }
        }
        values.maNhom = "GP01";
        dispatch(suaThongTinUserAction(values, page?.page, page?.items))
    }
    const handleSearch = (e) => {
        let {value} = e.target;
        if(!value){
            value = undefined;
        };
        dispatch(timKiemNguoiDungAction(value));
    }
    return (
        <div className='container'>
            <FormSearch placeholder={"Nhập từ khóa"} handleSubmit={handleSearch}/>
            <table className='table'>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tài khoản</th>
                        <th>Mật khẩu</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        showList?.map((nguoiDung,index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {(danhSachNguoiDungPhanTrang.currentPage-1)*10 + (index +1)}
                                    </td>
                                    <td className='text-nowrap'>
                                        {nguoiDung.taiKhoan}
                                    </td>
                                    <td>
                                        {nguoiDung.matKhau}
                                    </td>
                                    <td>
                                        {nguoiDung.hoTen}
                                    </td>
                                    <td>
                                        {nguoiDung.email}
                                    </td>
                                    <td className='text-nowrap'>
                                        {nguoiDung.soDt}
                                    </td>
                                    <td className='d-flex'>
                                        <button 
                                            className='btn text-nowrap btn-primary mr-1'
                                            data-toggle="modal"
                                            data-target="#modelId" 
                                            onClick={() => {setModal({title:`Sửa thông tin tài khoản ${nguoiDung.taiKhoan}`, Component: <FormValidate user={nguoiDung} titleBtn={"Cập nhập"} handleSubmit={suaThongTinUser}/>})}}>Sửa</button>
                                        <button className='btn text-nowrap btn-danger mr-1' onClick={() => xoaNguoiDung(nguoiDung.taiKhoan, page?.page, page?.items)}>Xóa</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className='text-center'>
                {danhSachNguoiDungTimKiem.length ? '' : <Pagination defaultCurrent={1} total={danhSachNguoiDungPhanTrang.totalCount} onChange={(current,showLessItems) =>{setPage({page:current, items: showLessItems})}}/>}
            </div>
            <ModalBoot title={modal?.title} Component={modal?.Component}/>
        </div>
    )
}
