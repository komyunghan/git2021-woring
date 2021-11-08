import React, { useState } from "react";

import { API } from "../../config";
import Portal from "../../components/Portal";
// import Rating from "@material-ui/lab/Rating";
// import { useHistory } from "react-ter";

const Form = (props) => {
  const [cleanliness, setCleanliness] = useState(null);
  const [communication, setCommunication] = useState(null);
  const [check_in, setCheckin] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [location, setLocation] = useState(null);
  const [value, setValue] = useState(null);
  const [content, setContent] = useState(null);

  const inputs = {
    cleanliness,
    communication,
    check_in,
    accuracy,
    location,
    content,
  };

  const onChange = (e) => {
    const { value } = e.target;
    setContent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    fetch(`${API}/api/review/${props.roomId}/${props.hostId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        inputs: inputs,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => alert(err));
  };
  console.log(inputs);
  return (
    <Portal elementId="modal-root">
      <Back>
        <FormWrapper>
          <div className="left">
            <h2>평가 및 후기</h2>
            <div>
              14일 동안 후기를 작성할 수 있습니다. 후기 작성 기간 동안에는
              호스트도 회원님에 대한 후기를 작성해야 회원님의 피드백을 읽을 수
              있습니다. 후기 작성 기간이 종료되면, 회원님의 피드백이 공개됩니다.
            </div>
          </div>
          <form>
            <label>청결도</label>
            <span>숙소는 회원님이 예상한 것만큼 깨끗했나요?</span>
            <Rating
              name="cleanliness"
              value={cleanliness}
              onChange={(event, newValue) => {
                setCleanliness(newValue);
              }}
            />

            <label>커뮤니케이션</label>
            <span>
              숙박기간 전, 혹은 도중에 호스트와 연락이 잘 되고, 문의한 사항에
              대하여 호스트가 빨리 응답해 왔습니까?
            </span>
            <Rating
              name="communication"
              value={communication}
              onChange={(event, newValue) => {
                setCommunication(newValue);
              }}
            />
            <label>체크인</label>
            <span>
              호스트는 회원님의 원활한 체크인 절차를 위해 최선을 다했나요?
            </span>
            <Rating
              name="check_in"
              value={check_in}
              onChange={(event, newValue) => {
                setCheckin(newValue);
              }}
            />
            <label>정확도</label>
            <span>숙소 사진과 설명이 실제 숙소와 얼마나 일치하나요?</span>
            <Rating
              name="simple-controlled"
              value={accuracy}
              onChange={(event, newValue) => {
                setAccuracy(newValue);
              }}
            />
            <label>위치</label>
            <span>숙소는 회원님이 예상한 것만큼 깨끗했나요?</span>
            <Rating
              name="location"
              value={location}
              onChange={(event, newValue) => {
                setLocation(newValue);
              }}
            />
            <label>가격</label>
            <span>숙소는 회원님이 예상한 것만큼 깨끗했나요?</span>
            <Rating
              name="value"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <label>리뷰 작성</label>
            <span>
              호스트가 어떻게 회원님을 맞이 하였나요? 숙소 설명은 정확하였나요?
              숙소가 위치한 지역은 어떤가요?
            </span>
            <textarea rows="4" name="content" onChange={onChange}></textarea>
            <button onClick={handleSubmit}>보내기</button>
          </form>
        </FormWrapper>
      </Back>
    </Portal>
  );
};

export default Form;

//styled-components

const Back = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.75);
`;

const FormWrapper = styled.div`
  z-index: 2000;
  color: ${(props) => props.theme.color.gray};
  display: flex;
  position: fixed;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding: 2em 2.2em;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.07);
  .left {
    margin-right: 30px;
    h2 {
      color: ${(props) => props.theme.color.black};
      font-size: 30px;
      font-weight: 500;
      margin-bottom: 30px;
    }
    span {
      font-size: 13px;
    }
  }
  form {
    display: flex;
    width: 70%;
    flex-direction: column;
    label {
      font-weight: 700;
      font-size: 18px;
      padding-bottom: 4px;
    }
    div {
      font-size: 15px;
    }
    select {
      padding: 0.4em 0.5em;
      font-family: inherit;
      background: url("") no-repeat 95% 50%;
      border: 1px solid #999;
      border-radius: 0px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border-radius: 10px;
      cursor: pointer;
    }
    textarea {
      border-radius: 10px;
    }
    label {
      margin: 3px 0;
    }
    button {
      margin-left: 400px;
      border: none;
      background-color: ${(props) => props.theme.color.red};
      color: #ffffff;
      border-radius: 10px;
      background-image: radial-gradient(
        circle at center,
        #ff385c 0%,
        #e61e4d 27.5%,
        #e31c5f 40%,
        #d70466 57.5%,
        #bd1e59 75%,
        #bd1e59 100%
      );
      background-size: 200% 200%;
      width: 95px;
      padding: 10px;
      margin-top: 16px;
      cursor: pointer;
    }
  }
`;