import React from "react";
import { useSelector } from "react-redux";
import logo from "../../logo-cybersoft.png";
import boCongThuong from "../../BoCongThuong.png";

function Footer(props) {
  let { logoFooter, mobileApp, social } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  const renderLogoFooter = () =>
    logoFooter.map((logo, index) => (
      <div key={index} className="doiTacItem">
        <a href={logo.trangChuyen}>
          <img className="logoDoiTacSize" src={logo.logo} alt={logo.maCumRap} />
        </a>
      </div>
    ));
  const renderMobileApp = () =>
    mobileApp.map((logoMobile, index) => (
      <div className="mr-3" key={index}>
        <a href={logoMobile.trangChuyen}>
          <img
            className="logoDoiTacSize"
            src={logoMobile.logo}
            alt={logoMobile.heDieuHanh}
          />
        </a>
      </div>
    ));
  const renderSocial = () =>
    social.map((item, index) => (
      <div className="text-center text-lg-left mr-3" key={index}>
        <a href={item.trangChuyen}>
          <img
            className="logoDoiTacSize"
            src={item.logo}
            alt={item.tenMangXaHoi}
          />
        </a>
      </div>
    ));
  return (
    <footer className="text-light pt-4">
      <div className="container">
        <div className="row position-relative ">
          <div className="col-12 col-md-6 col-lg-4">
            <p className="font-weight-bold d-none d-lg-block">CyberSoft</p>
            <div className="row">
              <div className="col-lg-6  d-none d-lg-block">
                <div>
                  <a className="text-light" href="">
                    FAQ
                  </a>
                </div>
                <div>
                  <a className="text-light" href="">
                    Brand Guideline
                  </a>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 d-flex d-md-block justify-content-center">
                <div className="mr-2 mr-md-0">
                  <a className="text-light" href="#">
                    Thỏa thuận sử dụng
                  </a>
                </div>
                <div>
                  <a className="text-light " href="#">
                    Chính sách bảo mật
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 d-none d-lg-block">
            <p className="font-weight-bold">Đối tác</p>
            <div className="d-flex" style={{ flexWrap: "wrap" }}>
              {renderLogoFooter()}
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="row">
              <div className="col-lg-6 d-none d-lg-block">
                <p className="font-weight-bold">MOBILE APP</p>
                <div className="d-flex">{renderMobileApp()}</div>
              </div>
              <div className="col-12 col-md-6">
                <p className="font-weight-bold d-none d-lg-block">SOCIAL</p>
                <div className="d-flex justify-content-center justify-content-lg-start m-1 ml-3 m-lg-0">
                  {renderSocial()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row pb-5">
          <div className="col-12 col-md-2 text-center text-md-left mb-2 mb-md-0">
            <img
              className="imgLogoFooterDownLeft"
              src={logo}
              alt="logo-cybersoft"
            />
          </div>
          <div className="col-12 col-md-8">
            <div className="font-weight-bold text-center text-lg-left">
              CYBERFILM - SẢN PHẨM CÔNG TY CYBERSOFT
            </div>
            <div className="text-center text-lg-left">
              Địa chỉ: 112 Cao Thắng, Quận 3 – HCM
            </div>
            <div className="text-center text-lg-left">Mã số thuê:</div>
            <div className="text-center text-lg-left">
              Số điện thoại: 096.105.1014 – 077.886.1911
            </div>
          </div>
          <div className="col-12 col-md-2 text-center text-md-left mt-2 mt-md-0">
            <a href="#">
              <img
                className="imgLogoFooterDownRight"
                src={boCongThuong}
                alt="BoCongThuong.png"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default React.memo(Footer);
