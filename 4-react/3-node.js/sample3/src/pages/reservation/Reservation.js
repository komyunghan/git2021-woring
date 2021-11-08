import React, { useState } from "react";
import styled from "styled-components";
import Textarea from "../../components/TextArea";
import Summary from "./Summary";

const Reservation = () => {
  const [selected, setSelected] = useState("full");

  const handleRadio = (e) => {
    const { value } = e.target;
    setSelected(value);
  };

  return (
    <Container>
      <Header>
        <svg viewBox="0 0 1000 1000">
          <path d="m499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-11 49-41 105-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128.1-64-111 0-172.1 94-148.1 203.1 14 59 51 126.1 110 201.1-37 41-72 70-103 88-24 13-47 21-69 23-101 15-180.1-83-144.1-184.1 5-13 15-37 32-74l1-2c55-120.1 122.1-256.1 199.1-407.2l2-5 22-42c17-31 24-45 51-62 13-8 29-12 47-12 36 0 64 21 76 38 6 9 13 21 22 36l21 41 3 6c77 151.1 144.1 287.1 199.1 407.2l1 1 20 46 12 29c9.2 23.1 11.2 46.1 8.2 70.1zm46-90.1c-7-22-19-48-34-79v-1c-71-151.1-137.1-287.1-200.1-409.2l-4-6c-45-92-77-147.1-170.1-147.1-92 0-131.1 64-171.1 147.1l-3 6c-63 122.1-129.1 258.1-200.1 409.2v2l-21 46c-8 19-12 29-13 32-51 140.1 54 263.1 181.1 263.1 1 0 5 0 10-1h14c66-8 134.1-50 203.1-125.1 69 75 137.1 117.1 203.1 125.1h14c5 1 9 1 10 1 127.1.1 232.1-123 181.1-263.1z"></path>
        </svg>
      </Header>
      <MainWrapper>
        <Left>
          <section>
            <h2>숙소 이용규칙 확인하기</h2>
            <div className="place">어디 몇박</div>
            <Flex>
              <div className="left">
                <div className="sq">
                  <p>12월</p>
                  <p>03</p>
                </div>
                <div className="detail">
                  <p>체크인: 언제</p>
                  <p>오후: 4:00 - 오전 12:00</p>
                </div>
              </div>
              <div className="right">
                <div className="sq">
                  <p>12월</p>
                  <p>05</p>
                </div>
                <div className="detail">
                  <p>체크아웃: 언제</p>
                  <p>오전 11:00</p>
                </div>
              </div>
            </Flex>
          </section>
          <section>
            <h2>일행이 있나요?</h2>
            <div>
              <p>인원</p>
              <div>메인 드롭다운 가져오기</div>
            </div>
            <div className="host">
              <div className="sayhi">
                <p>호스트에게 인사하기</p>
                <p>
                  마리따님에게 간단히 자신을 소개하고 여행 목적에 대해
                  알려주세요.
                </p>
              </div>
              <div className="avatar">
                <div></div>
              </div>
            </div>
            <div className="message">
              <Textarea />
            </div>
          </section>
          <section>
            <h2>확인 및 결제</h2>
            <div className="paymentType">
              <p>결제방식</p>
              <div className="payment">
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="full"
                    checked={selected === "full"}
                    onChange={handleRadio}
                  />
                  전액 결제
                </label>
                <div>price</div>
              </div>
              {/* <div>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="partial"
                    checked={selected === "partial"}
                    onChange={handleRadio}
                  />
                  분할 결제
                </label>
              </div> */}
            </div>
          </section>
          <section class="refund">
            <h3>환불 정책</h3>
            <p>
              8월 12일 4:00 PM 전에 예약을 취소하면 요금 전액이 환불됩니다. 그
              이후 8월 21일 4:00 PM 전에 예약을 취소하면 서비스 수수료를 제외한
              요금 전액이 환불됩니다. 자세히 보기
            </p>
            <p>
              호스트가 제공하는 환불 정책이 내게 적합한지 확인하세요. 3월 15일
              혹은 그 이후 확정된 예약에는 코로나19 확산 사태에 따른 정상참작이
              가능한 상황 정책이 적용되지 않습니다. 자세히 알아보기
            </p>
          </section>
          <p>
            아래 버튼을 선택하면, 숙소 이용규칙, 환불 정책, 및 게스트 환불
            정책에 동의하는 것입니다. 또한 숙박세 및 서비스 수수료를 포함하여
            표시된 총 금액에 동의합니다. 에어비앤비는 이제 이 지역에서 정부가
            부과한 숙박세를 징수하여 납부합니다.
          </p>
          <button>확인 및 결제</button>
        </Left>
        <Right>
          <Summary />
        </Right>
      </MainWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  max-width: 1080px;
  margin: 0 auto 2em;
  svg {
    width: 2em;
    height: 2em;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  max-width: 1080px;
  margin: 0 auto;
`;

const Flex = styled.div`
  display: flex;
`;

const FlexAlign = styled.div`
  display: flex;
  align-items: center;
`;

const Left = styled.div`
  width: 58%;
  section {
    margin-bottom: 2em;
    color: ${(props) => props.theme.color.black};
    .place {
      font-weight: bold;
      margin: 1em 0;
    }
    h2 {
      font-size: 1.875rem;
      margin-bottom: 1em;
    }
    .left {
      display: flex;
      align-items: center;
      width: 50%;
    }
    .right {
      display: flex;
      align-items: center;
      width: 50%;
    }
    .sq {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 56px;
      height: 56px;
      background-color: whitesmoke;
      font-weight: bold;
      margin-right: 1.125em;
      p:first-child {
        font-size: 0.75rem;
        margin-bottom: 0.35em;
      }
    }
    .detail {
      font-size: 0.9rem;
      line-height: 1.125rem;
    }
    .host {
      display: flex;
      margin: 1em 0;
      .sayhi {
        width: 80%;
      }
      .avatar {
        width: 20%;
        div {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: black;
          margin: 0 auto;
        }
      }
    }
    .message {
      width: 100%;
      padding-right: 2em;
    }
    .paymentType {
      padding-right: 2em;
    }
    .payment {
      display: flex;
      justify-content: space-between;
      width: 100%;
      border: 1px solid #008489;
      border-radius: 0.25em;
      padding: 1.75em 1.25em;
    }
  }
  .refund {
    border-left: 4px solid #ffaf0f;
    padding-left: 1em;
    h3 {
      font-size: 1.5rem;
    }
    p {
      margin: 1em 2em 1em 0;
    }
  }
`;
const Right = styled.div`
  width: 42%;
  background-color: mintcream;
`;

export default Reservation;