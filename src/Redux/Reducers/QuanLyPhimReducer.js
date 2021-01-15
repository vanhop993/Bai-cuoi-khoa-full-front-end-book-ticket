import {
  COMMENT_DANH_GIA,
  DANG_DAT_GHE,
  DAT_VE_THANH_CONG,
  LAY_CHI_TIET_PHIM_API,
  LAY_DANH_SACH_PHIM_API,
  LAY_DANH_SACH_PHIM_PHAN_TRANG,
  LAY_DANH_SACH_PHONG_VE_API,
  LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG_API,
  LAY_THONG_TIN_HE_THONG_RAP_API,
  LAY_THONG_TIN_LICH_CHIEU_HE_THONG_RAP_API,
} from "../Const/QuanLyPhimConst";
import carousel from '../../data/carousel.json'

const stateDefault = {
  slides: carousel,
  dsPhim: [],
  chiTietPhim: {},
  heThongRap: [],
  cumRap: [],
  lichChieuHeThongRap: [],
  logoFooter:[
    {maCumRap:'cgv',logo:'https://tix.vn/app/assets/img/icons/cgv.png',trangChuyen:'https://www.cgv.vn/'},
    {maCumRap:'bhdstar',logo:'https://tix.vn/app/assets/img/icons/bhd.png',trangChuyen:'https://www.bhdstar.vn/'},
    {maCumRap:'galaxycine',logo:'https://tix.vn/app/assets/img/icons/galaxycine.png',trangChuyen:'https://www.galaxycine.vn/'},
    {maCumRap:'cinestar',logo:'https://tix.vn/app/assets/img/icons/cinestar.png',trangChuyen:'http://cinestar.com.vn/'},
    {maCumRap:'lottecinemavn',logo:'https://s3img.vcdn.vn/123phim/2018/09/404b8c4b80d77732e7426cdb7e24be20.png',trangChuyen:'http://lottecinemavn.com/LCHS/index.aspx'},
    {maCumRap:'megagscinemas',logo:'https://tix.vn/app/assets/img/icons/megags.png',trangChuyen:'https://www.megagscinemas.vn/'},
    {maCumRap:'bt',logo:'https://tix.vn/app/assets/img/icons/bt.jpg',trangChuyen:'https://www.betacineplex.vn/home.htm'},
    {maCumRap:'ddcinema',logo:'https://tix.vn/app/assets/img/icons/dongdacinema.png',trangChuyen:'http://ddcinema.vn/'},
    {maCumRap:'TOUCH',logo:'https://tix.vn/app/assets/img/icons/TOUCH.png',trangChuyen:'https://touchcinema.com/'},
    {maCumRap:'cnx',logo:'https://tix.vn/app/assets/img/icons/cnx.jpg',trangChuyen:'https://cinemaxvn.com/'},
    {maCumRap:'STARLIGHT',logo:'https://tix.vn/app/assets/img/icons/STARLIGHT.png',trangChuyen:'https://starlight.vn/'},
    {maCumRap:'dcine',logo:'https://tix.vn/app/assets/img/icons/dcine.png',trangChuyen:'https://www.dcine.vn/'},
    {maCumRap:'zalopay_icon',logo:'https://tix.vn/app/assets/img/icons/zalopay_icon.png',trangChuyen:'https://zalopay.vn/'},
    {maCumRap:'payoo',logo:'https://tix.vn/app/assets/img/icons/payoo.jpg',trangChuyen:'https://www.payoo.vn/'},
    {maCumRap:'VCB',logo:'https://tix.vn/app/assets/img/icons/VCB.png',trangChuyen:'https://portal.vietcombank.com.vn/Pages/Home.aspx'},
    {maCumRap:'AGRIBANK',logo:'https://tix.vn/app/assets/img/icons/AGRIBANK.png',trangChuyen:'https://www.agribank.com.vn/'},
    {maCumRap:'vietinbank',logo:'https://tix.vn/app/assets/img/icons/VIETTINBANK.png',trangChuyen:'https://www.vietinbank.vn/web/home/vn/index.html'},
    {maCumRap:'IVB',logo:'https://tix.vn/app/assets/img/icons/IVB.png',trangChuyen:'https://www.indovinabank.com.vn/'},
    {maCumRap:'123go',logo:'https://tix.vn/app/assets/img/icons/123go.png',trangChuyen:'https://webv3.123go.vn/'},
    {maCumRap:'laban',logo:'https://tix.vn/app/assets/img/icons/laban.png',trangChuyen:'https://laban.vn/'},
  ],
  mobileApp:[
    {heDieuHanh:'apple',logo:'https://tix.vn/app/assets/img/icons/apple-logo.png',trangChuyen:'#'},
    {heDieuHanh:'android',logo:'https://tix.vn/app/assets/img/icons/android-logo.png',trangChuyen:'#'},  
  ],
  social:[
    {tenMangXaHoi:'facebook',logo:'https://tix.vn/app/assets/img/icons/facebook-logo.png',trangChuyen:'#'},
    {tenMangXaHoi:'zalo',logo:'https://tix.vn/app/assets/img/icons/zalo-logo.png',trangChuyen:'#'},
  ],
  arrCommentOfFilm: [],
  chiTietHeThongRap:[],
  danhSachPhongVe: {},
  mangGheDangDat: [],
  danhSachPhimPhanTrang: [],
};

export const QuanLyPhimReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LAY_DANH_SACH_PHIM_API: {
      // let newDSPhim = action.data;
      state.dsPhim = action.data;
      return { ...state };
    }
    case LAY_CHI_TIET_PHIM_API: {
      state.chiTietPhim = action.chiTietPhim;
      return { ...state };
    }
    case LAY_THONG_TIN_HE_THONG_RAP_API: {
      state.heThongRap = action.heThongRap;
      return { ...state };
    }
    case LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG_API: {
      state.cumRap = action.dataCumRap;
      return { ...state };
    }
    case LAY_THONG_TIN_LICH_CHIEU_HE_THONG_RAP_API: {
      state.lichChieuHeThongRap = action.dataLichChieuHeThongRap;
      return {...state}
    }
    case LAY_DANH_SACH_PHONG_VE_API: {
      state.danhSachPhongVe = action.danhSachPhongVe;
      return {...state};
    }
    case DANG_DAT_GHE: {
      let newMangGheDangDat = [...state.mangGheDangDat];
      let index = newMangGheDangDat.findIndex(ghe => ghe.maGhe === action.objGhe.maGhe);
      if(index !== -1 ){
        newMangGheDangDat.splice(index,1);
      }else{
        newMangGheDangDat.push(action.objGhe);
      };
      state.mangGheDangDat = newMangGheDangDat;
      return {...state};
    }
    case DAT_VE_THANH_CONG : {
      return {...state, mangGheDangDat: []};
    }
    case LAY_DANH_SACH_PHIM_PHAN_TRANG: {
      state.danhSachPhimPhanTrang = action.data;
      return { ...state };
    }
    case COMMENT_DANH_GIA : {
      state.arrCommentOfFilm.push(action.content);
      return { ...state };
    }
    default:
      return { ...state };
  }
};
