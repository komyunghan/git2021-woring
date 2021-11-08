import React from "react";
// import styled from "styled-components";

const Arrow = ({ direction, handleClick }) => {
  return (
    <Container direction={direction} onClick={handleClick}>
      {direction === "left" ? (
        <i
          className="fas fa-chevron-left"
          style={{ zoom: 0.65, opacity: 0.7 }}
        ></i>
      ) : (
        <i
          className="fas fa-chevron-right"
          style={{ zoom: 0.65, opacity: 0.7 }}
        ></i>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: calc(50% - 15px);
  height: 30px;
  width: 30px;
  ${(props) => (props.direction === "right" ? `right: 10px` : `left: 10px`)};
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  cursor: pointer;
  transition: all ease-in 0.15s;
  &:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 1);
  }
`;

export default Arrow;