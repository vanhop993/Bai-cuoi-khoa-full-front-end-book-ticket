import { combineReducers } from "redux";
import { QuanLyPhimReducer } from "./QuanLyPhimReducer";
import {QuanLyNguoiDungReducer} from './QuanLyNguoiDungReducer';
import  {LoadingReducer}  from './LoadingReducer';
import {ScrollSpyReducer} from './ScrollSpyReducer';

export const rootReducer = combineReducers({
  QuanLyPhimReducer,
  QuanLyNguoiDungReducer,
  LoadingReducer,
  ScrollSpyReducer,
});
