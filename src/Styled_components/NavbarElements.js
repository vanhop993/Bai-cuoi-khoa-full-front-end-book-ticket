import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export const Nav = styled.nav`
  background: #fff;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5 calc((100vw -1000px) / 2);
  z-index: 101;
  color: white;
  box-shadow: 0px 1px 5px grey;
  @media screen and(max-width: 768px) {
    position: relative;
  }
`;

export const Logo = styled(Link)`
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.action {
    color: #15cdfc;
  }
`;

export const NavLink = styled(Link)`
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
  &.action {
    color: #15cdfc;
  }
  &:hover {
    color: red;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    font-size: 1.5rem;
    padding: 2rem;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #000;
  @media screen and (max-width: 768px) {
    display: block;
    positon: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #000;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  @media screen and (max-width: 768px) {
    transition: all 1s ease-in-out;
    width: 70%;
    height: 100vh;
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    animation: closeNavMb 0.5s 0s forwards;
    &.active {
      display:block;
      animation: openNavMb 0.5s 0s forwards;
    }
    @keyframes openNavMb {
      0% {
        transform: translateX(100%);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes closeNavMb {
      0% {
        transform: translateX(0);
        opacity: 1;
      }
      100% {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  }
`;
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #fff;
  padding: 10px 22px;
  color: #000;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-on-out;
  text-decoration: none;
  margin-right: 5px;
  &:hover {
    transition: all 0.5s ease-in-out;
    color: red;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    font-size: 1.5rem;
    padding: 2rem;
  }
`;
export const DangNhapMobile = styled.div`
  width: 100%;
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
  }
`;
