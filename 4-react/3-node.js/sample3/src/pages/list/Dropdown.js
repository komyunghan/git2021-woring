import React from "react";
import styled from "styled-components";

const Dropdown = ({ submitPlace, clearPlace, children }) => {
  return (
    <Wrapper>
      <Box>
        <Content>{children}</Content>
        <BtnContainer>
          <div onClick={clearPlace}>지우기</div>
          <Btn onClick={submitPlace}>저장</Btn>
        </BtnContainer>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Box = styled.div`
  position: absolute;
  width: 400px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  top: 150px;
  left: 20px;
  z-index: 100;
`;

const Content = styled.div`
  border-bottom: 1px solid #eeeeee;
  padding: 2em 1.5em;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 1.5em;
`;

const Btn = styled.button`
  background-color: black;
  color: white;
  border-radius: 0.5em;
  border: none;
  padding: 0.75em 1.25em;
  cursor: pointer;
`;

export default Dropdown;