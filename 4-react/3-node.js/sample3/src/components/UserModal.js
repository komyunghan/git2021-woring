import Portal from "./Portal";
import React from "react";
// import styled from "styled-components";
// import { useHistory } from "react-router";

const UserModal = ({ handleLogout, openModal, handleUserState }) => {
  const history = useHistory();
  return (
    <Portal elementId="modal-root">
      <Background onClick={openModal && handleUserState}>
        <User>
          <div
            onClick={() => {
              history.push("/trips");
            }}
          >
            여행
          </div>
          <div
            onClick={() => {
              history.push("host");
            }}
          >
            숙소 호스트되기
          </div>
          <Line></Line>
          <div className="bottom" onClick={handleLogout}>
            로그아웃
          </div>
        </User>
      </Background>
    </Portal>
  );
};

export default UserModal;

const Background = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  cursor: default;
  position: absolute;
`;
const User = styled.div`
  color: #222222;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
  width: 200px;
  left: 82%;
  top: 80px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: white;
  z-index: 1000;
  div {
    margin-bottom: 20px;
    cursor: pointer;
  }
  .bottom {
    margin: 0;
  }
`;

const Line = styled.div`
  width: 200px;
  margin-left: -20px;
  border: 1px solid rgba(0, 0, 0, 0.07);
`;