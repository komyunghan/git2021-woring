import React from "react";
import styled from "styled-components";

const Toggle = () => {
  return (
    <Container>
      <input id="checkbox" type="checkbox" />
      <label htmlFor="checkbox" />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 55px;
    height: 35px;
    border-radius: 20px;
    background: #bebebe;
    cursor: pointer;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      margin: 3px;
      background: #ffffff;
      transition: 0.2s;
    }
  }
  input {
    opacity: 0;
    width: 55px;
    height: 35px;
    border-radius: 15px;
    &:checked + label {
      background: ${(props) => props.theme.color.black};
      &::after {
        content: "";
        display: block;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        margin-left: 24px;
        transition: 0.2s;
      }
    }
  }
`;

export default Toggle;