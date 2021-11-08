import React from "react";
// import styled from "styled-components";

const Slide = ({ content }) => {
  return <Container content={content}></Container>;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("${(props) => props.content}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export default Slide;