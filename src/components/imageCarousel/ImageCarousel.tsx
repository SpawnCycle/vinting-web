import { useState } from "react";
import { createPortal } from "react-dom";
import {
  CgChevronLeft,
  CgChevronRight,
  CgClose,
} from "react-icons/cg";
import "./ImageCarousel.css";

type Props = {
  images?: string[];
};

export default function ImageCarousel({ images = [] }: Props) {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  if (images.length === 0) return null;

  const prev = () =>
    setIndex(i => (i === 0 ? images.length - 1 : i - 1));

  const next = () =>
    setIndex(i => (i === images.length - 1 ? 0 : i + 1));

  return (
    <>
      {/* NORMAL VIEW */}
      <div className="carousel-root">
        <img
          src={images[index]}
          className="carousel-image"
          alt=""
          onClick={() => setFullscreen(true)}
        />

        <button className="carousel-btn left" onClick={prev}>
          <CgChevronLeft size={26} />
        </button>

        <button className="carousel-btn right" onClick={next}>
          <CgChevronRight size={26} />
        </button>

        <div className="carousel-counter">
          {index + 1} of {images.length}
        </div>
      </div>

        {/* FULLSCREEN OVERLAY */}
        {fullscreen &&
        createPortal(
            <div
            className="carousel-overlay"
            onClick={() => setFullscreen(false)}
            >
            <div
                className="carousel-overlay-content"
                onClick={e => e.stopPropagation()}
            >
                <img
                src={images[index]}
                className="carousel-overlay-image"
                alt=""
                />

                <button className="overlay-btn left" onClick={prev}>
                <CgChevronLeft size={32} />
                </button>

                <button className="overlay-btn right" onClick={next}>
                <CgChevronRight size={32} />
                </button>

                <button
                className="overlay-close"
                onClick={() => setFullscreen(false)}
                >
                <CgClose size={28} />
                </button>
            </div>
            </div>,
            document.body
        )
        }

    </>
  );
}
