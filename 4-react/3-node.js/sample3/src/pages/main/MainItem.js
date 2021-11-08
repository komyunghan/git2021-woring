import React from "react";
// import styled from "styled-components";

const MainItem = (props) => {
  return (
    <Item>
      <div>
        <img src={`${props.img}`} alt="" />
      </div>
      <Text>
        <span>{props.title}</span>
        <span>{props.desc}</span>
      </Text>
    </Item>
  );
};

export default MainItem;

const Item = styled.div`
  position: relative;
  width: 100%;
  background-color: white;
  overflow: hidden;
  margin-right: 16px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  border-radius: 16px;
  div {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      overflow: hidden;
    }
  }
`;

const Text = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  line-height: 18px;
  span:nth-child(1) {
    color: ${(props) => props.theme.color.black};
    font-size: 18px;
    margin-bottom: 6px;
  }
  span:nth-child(2) {
    color: ${(props) => props.theme.color.gray};
    font-size: 14px;
    padding-bottom: 20px;
  }
`;