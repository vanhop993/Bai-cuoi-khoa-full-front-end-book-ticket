import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scroller } from "react-scroll";
import { scrollSpyAction } from "../../Redux/Action/ScrollSpyAction";

export default function ScrollSpy() {
  const { scrollToElement } = useSelector((state) => state.ScrollSpyReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    function scrollTo() {
      scroller.scrollTo(`${scrollToElement}`, {
        duration: 1500,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -90,
      });
    }
    if (scrollToElement) {
      setTimeout(() => {
        scrollTo();
      }, 10);
    }
    dispatch(scrollSpyAction(""));
  }, [scrollToElement]);
  return null;
}
