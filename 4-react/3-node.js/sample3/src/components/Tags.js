import React from "react";

//import styles and assets
// import styled from "styled-components";

export const Tag = ({ icon, label }) => {
  return (
    <Container>
      <i className={icon}></i>
      <span style={{ marginLeft: "0.5em" }}>{label}</span>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d4d4d4;
  border-radius: 1.5em;
  font-size: 0.875rem;
  padding: 0.125em 1em;
`;