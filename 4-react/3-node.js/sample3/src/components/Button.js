import React from "react";

//import styles and assets
import styled from "styled-components";

export const ImgBtn = ({ fa, label, handleButton }) => {
  return (
    <Container1 onClick={handleButton}>
      <i className={fa}></i>
      <span style={{ marginLeft: "0.5em" }}>{label}</span>
    </Container1>
  );
};

export const IconBtn = ({ handleButton }) => {
  return (
    <Container2 onClick={handleButton}>
      <span>X</span>
    </Container2>
  );
};

const Container1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 40px;
  background-color: black;
  border-radius: 25px;
  font-size: 0.875rem;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const Container2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: black;
  border-radius: 10px;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;