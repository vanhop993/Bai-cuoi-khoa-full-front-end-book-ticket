import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import "./App.scss";
// import Loading from "./Components/Loading";
import ChiTietCumRap from "./Pages/ChiTietCumRap";
import ChiTietPhim from "./Pages/ChiTietPhim";
import ChiTietPhongVe from "./Pages/ChiTietPhongVe";
import DangKy from "./Pages/DangKy";
import DangNhap from "./Pages/DangNhap";
import ThongTinTaiKhoan from "./Pages/ThongTinTaiKhoan";
import TrangChu from "./Pages/TrangChu";
import { HeaderFooterTemplate } from "./Templates/HeaderFooterTemplate";
import { ProtectedLoginLogout } from "./Templates/ProtectedLoginLogout";
import { ProtectedAdmin } from "./Templates/ProtectedAdmin";
import { ProtectedRoute } from "./Templates/ProtectedRoute";
import QuanLyPhim from "./Pages/AdminPages/QuanLyPhim";
import ThemPhim from "./Pages/AdminPages/ThemPhim";
import QuanLyNguoiDung from "./Pages/AdminPages/QuanLyNguoiDung";
import ThemNguoiDung from "./Pages/AdminPages/ThemNguoiDung";

function App() {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  return (
    <>
      <Switch>
        <ProtectedRoute
          user={userLogin}
          exact
          path="/thongtintaikhoan"
          Component={ThongTinTaiKhoan}
        />
        <HeaderFooterTemplate exact path="/trangchu" Component={TrangChu} />
        <HeaderFooterTemplate
          exact
          path="/chitietphim/:maphim"
          Component={ChiTietPhim}
        />
        <ProtectedRoute
          user={userLogin}
          exact
          path="/chitietphongve/:malichchieu"
          Component={ChiTietPhongVe}
        />
        <HeaderFooterTemplate
          exact
          path="/chitietcumrap/:mahethongrap/:macumrap"
          Component={ChiTietCumRap}
        />
        <ProtectedLoginLogout
          user={userLogin}
          exact
          path="/dangnhap"
          Component={DangNhap}
        />
        <ProtectedLoginLogout
          user={userLogin}
          exact
          path="/dangky"
          Component={DangKy}
        />
        <ProtectedAdmin
          user={userLogin}
          exact
          path="/admin/quanlyphim"
          Component={QuanLyPhim}
        />
        <ProtectedAdmin
          user={userLogin}
          exact
          path="/admin/themphim"
          Component={ThemPhim}
        />
        <ProtectedAdmin
          user={userLogin}
          exact
          path="/admin/quanlynguoidung"
          Component={QuanLyNguoiDung}
        />
        <ProtectedAdmin
          user={userLogin}
          exact
          path="/admin/themnguoidung"
          Component={ThemNguoiDung}
        />
        <HeaderFooterTemplate exact path="/" Component={TrangChu} />
      </Switch>
    </>
  );
}

export default App;
