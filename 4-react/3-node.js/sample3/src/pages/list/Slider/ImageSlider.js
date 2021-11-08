import React, { useState, useEffect } from "react";
import SlideHousing from "./SlideHousing";
import Slide from "./Slide";
import Arrow from "./Arrow";
// import styled from "styled-components";

const ImageSlider = ({ slides, heart, map }) => {
  const [state, setState] = useState({
    active: 0,
    translate: 0,
    transition: 0.25,
    width: 300,
    wishlist: heart,
    arrow: false,
  });

  const { active, translate, transition, width, wishlist, arrow } = state;

  const heartToggle = () => {
    setState({
      ...state,
      wishlist: !wishlist,
    });
  };

  const arrowToggle = () => {
    setState({
      ...state,
      arrow: !arrow,
    });
  };

  const prev = () => {
    // 첫번째 슬라이드에서는  prev 가 안되고 첫번째 슬라이드에서 멈춘다.
    if (active === 0) {
      return setState({
        ...state,
        active: 0,
        translate: 0,
      });
    }

    setState({
      ...state,
      active: active - 1,
      translate: (active - 1) * width,
    });
  };

  const next = () => {
    // 마지막 슬라이드에서는 next 가 안되고 마지막 슬라이드에서 멈춘다.
    if (active === slides.length - 1) {
      return setState({
        ...state,
        active: slides.length - 1,
        translate: (slides.length - 1) * width,
      });
    }

    setState({
      ...state,
      active: active + 1,
      translate: (active + 1) * width,
    });
  };

  return (
    <Container onMouseEnter={arrowToggle} onMouseLeave={arrowToggle}>
      <SlideHousing
        translate={translate}
        transition={transition}
        width={width * slides.length}
      >
        {slides.map((s) => (
          <Slide key={s} content={s} />
        ))}
      </SlideHousing>
      {arrow ? (
        <div>
          <Arrow direction="left" handleClick={prev} />
          <Arrow direction="right" handleClick={next} />
        </div>
      ) : null}
      {map ? (
        <HeartRight onClick={heartToggle}>
          <Icon>
            <i className={`${wishlist ? "fas fa-heart" : "far fa-heart"}`}></i>
          </Icon>
        </HeartRight>
      ) : (
        <Heart onClick={heartToggle}>
          <Icon>
            <i className={`${wishlist ? "fas fa-heart" : "far fa-heart"}`}></i>
          </Icon>
        </Heart>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const Heart = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all ease-in 0.15s;
  &:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 1);
  }
`;

const HeartRight = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all ease-in 0.15s;
  &:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 1);
  }
`;

const Icon = styled.div`
  position: absolute;
  top: 7px;
  left: 7px;
  .fas {
    color: ${(props) => props.theme.color.red};
  }
`;
export default ImageSlider;