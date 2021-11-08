import React, { Component } from "react";
// import styled from "styled-components";

const Signup = (props) => {
  return (
    <Back>
      <AccountModal>
        <section>
          <div>
            <button onClick={props.handleClose}>
              <svg
                viewBox="0 0 24 24"
                role="img"
                aria-label="닫기"
                focusable="false"
                style={{
                  height: "16px",
                  width: "16px",
                  display: "block",
                  fill: "rgb(118, 118, 118)",
                }}
              >
                <path
                  d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <button>페이스북 계정으로 회원 가입</button>
            <button>구글 계정으로 회원 가입</button>
          </div>
          <div>
            <span>
              이미 에어비앤비 계정이 있나요? <button>로그인</button>
            </span>
          </div>
        </section>
      </AccountModal>
    </Back>
  );
};

export default Signup;

{
  /* <button onClick={카카오에서만든 매서드 호출. index.html에 스크립트 코드 넣으면 호출가능}>카카오 로그인</button> */
}

// styled-components

const Back = styled.div`
  position: fixed !important;
  z-index: 2000 !important;
  top: 0px !important;
  right: 0px !important;
  bottom: 0px !important;
  left: 0px !important;
  overflow-y: auto !important;
  background: rgba(0, 0, 0, 0.75) !important;
`;

export const AccountModal = styled.div`
  position: fixed !important;
  top: 25%;
  left: 33%;
  width: 500px;
  height: 300px;
  padding: 2em;
  background-color: rgb(255, 255, 255);
  border: solid 1px black;
  color: black;
  div:nth-child(2) {
    display: flex;
    flex-direction: column;
  }
`;