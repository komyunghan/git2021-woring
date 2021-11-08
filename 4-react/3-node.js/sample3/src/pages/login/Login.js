import React, { useEffect, useState } from "react";

import { API } from "../../config";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// import GoogleLogin from "react-google-login";
import Portal from "../../components/Portal";
// import styled from "styled-components";

const Login = ({ openLogin, handleClose }) => {
  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);

  //구글 로그인 성공시
  const responseGoogle = (response) => {
    console.log(response);

    fetch(`${API}/user/google`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        access_token: response.wc.access_token,
      }),
    })
      .then((response) => response.json())
      // .then((response) => console.log(response));
      .then((response) => {
        localStorage.setItem("access_token", response.Authorization);
        localStorage.setItem("username", response.username);
        localStorage.setItem("avatar", response.avatar);
        window.location.reload();
      });
  };
  //구글 로그인 실패시
  const responseFail = (err) => {
    console.log(err);
  };

  //페이스북

  const responseFacebook = (response) => {
    console.log("페이스북 로그인정보", response);

    fetch(`${API}/user/facebook`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        access_token: response.accessToken,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem("access_token", response.Authorization);
      });
  };

  return (
    <Portal elementId="modal-root">
      <Back onClick={openLogin && handleClose}>
        <AccountModal>
          <div>
            <button onClick={handleClose}>
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
            <FacebookLogin
              appId="886952861818583"
              autoLoad
              callback={responseFacebook}
              render={(renderProps) => (
                <FacebookLoginBtn onClick={renderProps.onClick}>
                  <i className="fab fa-facebook-f"></i>
                  &nbsp;&nbsp;&nbsp;페이스북 로그인
                </FacebookLoginBtn>
              )}
            />

            <GoogleLogin
              clientId="515529931906-c9va4d88rfupqbr81mi9se4jjbmvkm6o.apps.googleusercontent.com"
              render={(renderProps) => (
                <GoogleLoginBtn
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <svg
                    viewBox="0 0 18 18"
                    role="presentation"
                    aria-hidden="true"
                    focusable="false"
                    style={{ height: "18px", width: "18px", display: "block" }}
                  >
                    <g fill="none" fill-rule="evenodd">
                      <path
                        d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
                        fill="#EA4335"
                      ></path>
                      <path
                        d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
                        fill="#4285F4"
                      ></path>
                      <path
                        d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
                        fill="#34A853"
                      ></path>
                      <path d="M0 0h18v18H0V0z"></path>
                    </g>
                  </svg>
                  &nbsp;&nbsp;&nbsp;구글 로그인
                </GoogleLoginBtn>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseFail}
              cookiePolicy={"single_host_origin"}
            />

            {/* <span
            onClick={() =>
              window.gauth.signOut().then(function () {
                console.log("logout!!성공쓰");
                window.localStorage.clear();
                window.location.reload();
              })
            }
          >
            구글 로그아웃
          </span>
          <span
            onClick={() => {
              window.FB.logout(function (response) {
                console.log("페이스북 로그아웃");
                window.localStorage.clear();
                window.location.reload();
                // Person is now logged out
              });
            }}
          >
            페이스북 로그아웃
          </span> */}
          </div>

          <div>
            <span>이미 에어비앤비 계정이 있으세요?</span>{" "}
            <button>회원 가입</button>
          </div>
        </AccountModal>
      </Back>
    </Portal>
  );
};

//styled-components

export default Login;
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
  width: 550px;
  height: 300px;
  padding: 1em 2em;
  background-color: rgb(255, 255, 255);
  border: solid 1px black;
  color: black;
  div:nth-child(1) {
    position: absolute;
    left: 16px;
    button {
      border: none;
      cursor: pointer;
      background: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      &:hover {
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 21px;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
      }
    }
  }
  div:nth-child(2) {
    margin-top: 2.5em;
    display: flex;
    flex-direction: column;
  }
  div:nth-child(3) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      color: ${(props) => props.theme.color.gray};
    }
    button {
      border: none;
      background: none;
      cursor: pointer;
      color: #008489;
      font-weight: 600;
    }
  }
`;

const FacebookLoginBtn = styled.button`
  border: solid 2px rgb(69, 104, 178);
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin-top: 1em;
  height: 46px;
  color: rgb(255, 255, 255);
  background-color: rgb(69, 104, 178);
  cursor: pointer;
`;

const GoogleLoginBtn = styled.button`
  border: solid 2px ${(props) => props.theme.color.black};
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin-top: 1em;
  margin-bottom: 3em;
  height: 46px;
  color: ${(props) => props.theme.color.black};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

// const Login = (props) => {
//   const googleLogin = () => {
//     window.gauth.signIn().then(function () {
//       console.log("login!!!성공쓰");
//       // console.log(window.gauth.currentUser.get().wc.access_token);
//       let token = window.gauth.currentUser.get().wc.access_token;
//       console.log(window.gauth.currentUser.get());
//       localStorage.setItem("access_token", token);

//       fetch("api주소", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           access_token: token,
//         }),
//         // .then(window.location.reload()),
//       });
//     });
//   };
//   return (
//     <Back>
//       <AccountModal>
//         <div>
//           <button onClick={props.handleClose}>x</button>
//         </div>
//         <div>
//           <button onClick={googleLogin}>구글 로그인</button>
//           <button
//             onClick={() =>
//               window.gauth.signOut().then(function () {
//                 console.log("logout!!성공쓰");
//                 window.localStorage.clear();
//                 window.location.reload();
//               })
//             }
//           >
//             구글 로그아웃
//           </button>
//         </div>

//         <div>
//           <span>
//             이미 에어비앤비 계정이 없으세요? <button>회원 가입</button>
//           </span>
//         </div>
//       </AccountModal>
//     </Back>
//   );
// };

// export default Login;