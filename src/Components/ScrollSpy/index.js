import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    Element,
    animateScroll as scroll,
    scroller
  } from "react-scroll";
import { scrollSpyAction } from '../../Redux/Action/ScrollSpyAction';

export default function ScrollSpy() {
    const {scrollToElement} = useSelector((state) => state.ScrollSpyReducer);
    const dispatch = useDispatch();
    useEffect(()=>{
        function scrollTo() {
          scroller.scrollTo(`${scrollToElement}`, {
            duration: 1500,
            delay: 0,
            smooth: 'easeInOutQuart',
            offset: -90,
          });
        }
        if(scrollToElement){
            scrollTo();
          }
          dispatch(scrollSpyAction(''));
    },[scrollToElement])
    return null
}
