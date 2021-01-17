import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import defaultFilm from "../../assets/img/default-film.webp";

export default function Slide({ slide, offset, trailer }) {
  const [isOpen, setOpen] = useState(false);
  const layIdTrailer = () => {
    let idTrailer = trailer.split("/")[4];
    return idTrailer;
  };
  const active = offset === 0 ? true : null;
  // function useTilt(active) {
  //   const ref = useRef(null);
  //   useEffect(() => {
  //     if (!ref.current || !active) {
  //       return;
  //     }

  //     const state = {
  //       rect: undefined,
  //       mouseX: undefined,
  //       mouseY: undefined,
  //     };

  //     let el = ref.current;

  //     const handleMouseMove = (e) => {
  //       if (!el) {
  //         return;
  //       }
  //       if (!state.rect) {
  //         state.rect = el.getBoundingClientRect();
  //       }
  //       state.mouseX = e.clientX;
  //       state.mouseY = e.clientY;
  //       const px = (state.mouseX - state.rect.left) / state.rect.width;
  //       const py = (state.mouseY - state.rect.top) / state.rect.height;

  //       // el.style.setProperty("--px", px);
  //       // el.style.setProperty("--py", py);
  //     };

  //     el.addEventListener("mousemove", handleMouseMove);

  //     return () => {
  //       el.removeEventListener("mousemove", handleMouseMove);
  //     };
  //   }, [active]);

  //   return ref;
  // }
  // const ref = useTilt(active);

  return (
    <>
      <div
        // ref={ref}
        className="slide"
        data-active={active}
        style={{
          "--offset": offset,
          "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
        }}
      >
        <div
          className="slideBackground"
          style={{
            backgroundImage: `url('${slide.hinhAnh}'),url('${defaultFilm}')`,
          }}
        />
        <div
          className="slideContent"
          style={{
            backgroundImage: `url('${slide.hinhAnh}'),url('${defaultFilm}')`,
          }}
        >
          <div
            className="slideContentInner"
            onClick={() => setOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <h2 className="slideTitle text-light">{slide.tenPhim}</h2>
            <h3 className="slideSubtitle text-light">{slide.subtitle}</h3>
            {/* <p className="slideDescription">{slide.description}</p> */}
          </div>
        </div>
      </div>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={layIdTrailer()}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
