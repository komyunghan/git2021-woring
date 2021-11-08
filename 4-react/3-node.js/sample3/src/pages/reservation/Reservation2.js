import * as searchActions from "../../store/modules/seacher";

import React, { useEffect, useState } from "react";

import { API } from "../../config";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import Summary from "./Summary";
import Textarea from "../../components/TextArea";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import styled from "styled-components";
// import { useHistory } from "react-router-dom";
// import { withRouter } from "react-router-dom";

const Reservation = ({
  searchActions,
  startDay,
  endDay,
  location,
  adults,
  children,
  infants,
}) => {
  let history = useHistory();
  // state
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState("display_currency=KRW");
  const [reservation, setReservation] = useState({
    room_id: "",
    greeting: "",
    check_in: "",
    check_out: "",
    adults: "",
    children: 0,
    infants: 0,
    total_cost: "",
    payment_methods: "",
  });
  const [total, setTotal] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  // get data

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(
      `${API}/booking/payment?room_id=1&${currency}&checkin=${startDay}&checkout=${endDay}&adults=${adults}`,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.booking_information);
      });
    // .then((res) => console.log(res));
  }, []);

  useEffect(() => {
    fetch(
      `${API}/booking/payment?room_id=1&${currency}&checkin=${startDay}&checkout=${endDay}&adults=${adults}`,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.booking_information);
      });
  }, [currency]);

  const changeCurrency = (e) => {
    const { value } = e.target;
    if (value === "USD") {
      setCurrency("display_currency=USD");
    } else {
      setCurrency("display_currency=KRW");
    }
    // console.log(value);
  };

  const handleMessage = (e) => {
    const { value } = e.target;
    setReservation({ ...reservation, greeting: value });
  };

  const handlePayment = (e) => {
    const { value } = e.target;
    setReservation({ ...reservation, payment_methods: value });
  };

  const calcNights = () => {
    const start = new Date(data.check_in_date);
    const end = new Date(data.check_out_date);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    var nightCount = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return nightCount;
  };

  const reviewTruncate = (num) => {
    return num.toFixed(2);
  };

  const priceToNum = (str) => {
    str = str.slice(0, -3);
    return str;
  };

  const sendReservation = () => {
    setReservation(
      {
        ...reservation,
        room_id: data.room_id,
        check_in: startDay,
        check_out: endDay,
        adults: adults,
        children: adults,
        infants: infants,
        total_cost: (data.price && priceToNum(data.price)) * calcNights(),
      },
      console.log(reservation)
    );

    const token = localStorage.getItem("access_token");
    fetch(
      `${API}/booking/payment?room_id=1&display_currency=KRW&checkin=${startDay}&checkout=${endDay}&adults=${adults}`,
      {
        method: "POST",
        header: {
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          reservation: reservation,
        }),
      }
    )
      // .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("Reservation Successful");
          history.push("/");
        }
      });
  };
  console.log(reservation);
  return (
    <Container>
      <Nav />
      <Header></Header>
      <MainWrapper>
        <Left>
          <h2>확인 및 결제</h2>
          <Confirm>
            <div className="placeimg">
              <img src={data.room_picture} />
            </div>
            <div className="detail">
              <p>{data.title}</p>
              <p>
                {data.place_type} · 침대 {data.beds}개 · 욕실 {data.baths}개
              </p>
              <div className="rating">
                <i className="fas fa-star"></i>
                <span>
                  {data.overall_rating && reviewTruncate(data.overall_rating)}(
                  {data.num_reviews})
                </span>
              </div>
            </div>
          </Confirm>
          <Section>
            <div className="flexBet">
              <div className="pitch">
                <h4>흔치 않은 기회입니다</h4>
                <p>{data.host_name}님의 숙소는 보통 예약이 가득 차 있습니다.</p>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  width="32"
                  height="32"
                  class="_uhlm2"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <clipPath id="animationMask_788IkdIffV">
                      <rect width="32" height="32" x="0" y="0"></rect>
                    </clipPath>
                  </defs>
                  <g clip-path="url(#animationMask_788IkdIffV)">
                    <g
                      transform="matrix(0.9681,0,0,0.9681,2.7026,1.6496)"
                      opacity="1"
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,13.559,16.367)">
                        <path
                          fill="rgb(0,166,153)"
                          fill-opacity="1"
                          d="M0 0 M9.433,-2.318 C9.431,-2.321 9.431,-2.324 9.433,-2.327 C9.433,-2.327 9.433,-2.329 9.432,-2.329 C9.428,-2.329 9.424,-2.331 9.421,-2.334 C9.421,-2.334 7.095,-5.566 7.095,-5.566 C6.29,-6.684 4.9879999999999995,-7.351 3.61,-7.351 C3.61,-7.351 -3.608,-7.351 -3.608,-7.351 C-4.986,-7.351 -6.288,-6.684 -7.094,-5.566 C-7.094,-5.566 -9.42,-2.334 -9.42,-2.334 C-9.422,-2.331 -9.426,-2.329 -9.43,-2.329 C-9.431,-2.329 -9.433,-2.327 -9.433,-2.327 C-9.432,-2.322 -9.428999999999998,-2.322 -9.431,-2.318 C-9.431999999999999,-2.317 -9.432,-2.314 -9.43,-2.314 C-9.424999999999999,-2.314 -9.419,-2.312 -9.416,-2.308 C-9.416,-2.308 -1.457,6.693 -1.457,6.693 C-0.682,7.569 0.6829999999999999,7.569 1.458,6.693 C1.458,6.693 9.417,-2.308 9.417,-2.308 C9.421,-2.312 9.425999999999998,-2.314 9.431,-2.314 C9.433,-2.314 9.434,-2.3160000000000003 9.433,-2.318z"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(0.9681,0,0,0.9681,2.7022,1.6502)"
                      opacity="1"
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,27.743,13.593)">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="miter"
                          fill-opacity="0"
                          stroke-miterlimit="10"
                          stroke="rgb(72,72,72)"
                          stroke-opacity="1"
                          stroke-width="1"
                          d="M0 0 M0.919,0.01 C0.919,0.01 0.261,0.008 -0.675,0.005"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(0.9681,0,0,0.9681,2.7022,1.6502)"
                      opacity="1"
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,5.225,4.74)">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="miter"
                          fill-opacity="0"
                          stroke-miterlimit="10"
                          stroke="rgb(72,72,72)"
                          stroke-opacity="1"
                          stroke-width="1"
                          d="M0 0 M-0.442,-1.173 C-0.404,-1.083 -0.094,-0.283 0.332,0.822"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(0.9681,0,0,0.9681,2.7022,1.6502)"
                      opacity="1"
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,22.033,5.137)">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="miter"
                          fill-opacity="0"
                          stroke-miterlimit="10"
                          stroke="rgb(72,72,72)"
                          stroke-opacity="1"
                          stroke-width="1"
                          d="M0 0 M0.337,-0.745 C0.313,-0.685 0.037,-0.05 -0.347,0.832"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(0.9681,0,0,0.9681,2.7023,1.6492)"
                      opacity="1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        fill-opacity="0"
                        stroke="rgb(72,72,72)"
                        stroke-opacity="1"
                        stroke-width="1"
                        d="M0 0 M25.482,13.592 C25.482,13.592 25.488999999999997,13.584000000000001 25.488999999999997,13.584000000000001 C25.488999999999997,13.584000000000001 25.476,13.584000000000001 25.476,13.584000000000001 C25.476,13.584000000000001 20.905,7.234000000000002 20.905,7.234000000000002 C20.905,7.234000000000002 6.2139999999999995,7.234000000000002 6.2139999999999995,7.234000000000002 C6.2139999999999995,7.234000000000002 1.642999999999999,13.584000000000001 1.642999999999999,13.584000000000001 C1.642999999999999,13.584000000000001 1.6289999999999996,13.584000000000001 1.6289999999999996,13.584000000000001 C1.6289999999999996,13.584000000000001 1.6369999999999987,13.592 1.6369999999999987,13.592 C1.6369999999999987,13.592 1.6289999999999996,13.602 1.6289999999999996,13.602 C1.6289999999999996,13.602 1.645999999999999,13.602 1.645999999999999,13.602 C1.645999999999999,13.602 13.559,27.076 13.559,27.076 C13.559,27.076 25.473,13.602 25.473,13.602 C25.473,13.602 25.488999999999997,13.602 25.488999999999997,13.602 C25.488999999999997,13.602 25.482,13.592 25.482,13.592z"
                      ></path>
                      <g
                        opacity="1"
                        transform="matrix(1,0,0,1,13.559,17.155)"
                      ></g>
                    </g>
                    <g
                      transform="matrix(0.9681,0,0,0.9681,2.7022,1.6502)"
                      opacity="1"
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,17.782,15.199)">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="miter"
                          fill-opacity="0"
                          stroke-miterlimit="10"
                          stroke="rgb(72,72,72)"
                          stroke-opacity="1"
                          stroke-width="1"
                          d="M0 0 M2.841,-7.411 C2.192,-5.899 -0.914,2.351 -2.812,7.413"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(0.9681,0,0,0.9681,2.7022,1.6502)"
                      opacity="1"
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,10.502,18.105)">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="miter"
                          fill-opacity="0"
                          stroke-miterlimit="10"
                          stroke="rgb(72,72,72)"
                          stroke-opacity="1"
                          stroke-width="1"
                          d="M0 0 M-3.057,-8.107 C-2.108,-5.895999999999999 3.057,8.107 3.057,8.107"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(0.9681,0,0,0.9681,2.7023,1.6492)"
                      opacity="1"
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="miter"
                          fill-opacity="0"
                          stroke-miterlimit="10"
                          stroke="rgb(72,72,72)"
                          stroke-opacity="1"
                          stroke-width="1"
                          d="M0 0 M24.692,13.554 C24.692,13.554 2.692,13.554 2.692,13.554"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(0.9681,0,0,0.9681,2.7022,1.6502)"
                      opacity="1"
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,10.502,18.105)">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="miter"
                          fill-opacity="0"
                          stroke-miterlimit="10"
                          stroke-dasharray=" 0 2.5"
                          stroke-dashoffset="0"
                          stroke="rgb(0,166,153)"
                          stroke-opacity="1"
                          stroke-width="0"
                          d="M0 0"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(0.9681,0,0,0.9681,2.7022,1.6502)"
                      opacity="1"
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,10.502,18.105)">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="miter"
                          fill-opacity="0"
                          stroke-miterlimit="10"
                          stroke-dasharray=" 0 2.5"
                          stroke-dashoffset="0"
                          stroke="rgb(0,166,153)"
                          stroke-opacity="1"
                          stroke-width="0"
                          d="M0 0"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(0.9681,0,0,0.9681,2.7022,1.6502)"
                      opacity="1"
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,10.502,18.105)">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="miter"
                          fill-opacity="0"
                          stroke-miterlimit="10"
                          stroke-dasharray=" 0 2.5"
                          stroke-dashoffset="0"
                          stroke="rgb(0,166,153)"
                          stroke-opacity="1"
                          stroke-width="0"
                          d="M0 0"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(0.9681,0,0,0.9681,2.7022,1.6502)"
                      opacity="1"
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,10.502,18.105)">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="miter"
                          fill-opacity="0"
                          stroke-miterlimit="10"
                          stroke-dasharray=" 0 2.5"
                          stroke-dashoffset="0"
                          stroke="rgb(0,166,153)"
                          stroke-opacity="1"
                          stroke-width="0"
                          d="M0 0"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(0.0968,0,0,0.0968,15.849,25.5427)"
                      opacity="1"
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          fill="rgb(0,166,153)"
                          fill-opacity="1"
                          d="M0 0 M0,-10.582 C5.8402058,-10.582 10.582,-5.8402058 10.582,0 C10.582,5.8402058 5.8402058,10.582 0,10.582 C-5.8402058,10.582 -10.582,5.8402058 -10.582,0 C-10.582,-5.8402058 -5.8402058,-10.582 0,-10.582z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <hr></hr>
          </Section>
          <Section>
            <h3>예약 정보</h3>

            <div className="res">
              <h4>날짜</h4>
              <div className="flexBet">
                <p>
                  {data.check_in_date} - {data.check_out_date}
                </p>
                <p>총 {calcNights()} 박</p>
              </div>
            </div>

            <div className="flexCenter">
              <div className="res">
                <h4>게스트</h4>
                <p>게스트 {data.guests_total}명</p>
              </div>
            </div>
            <hr></hr>
          </Section>
          <Section>
            <h3>결제 일정</h3>
            <div className="payment">
              <div>
                <h4>
                  {data.currency === "KRW" ? (
                    <span>₩</span>
                  ) : data.currency === "USD" ? (
                    <span>$</span>
                  ) : null}
                  {(data.price && priceToNum(data.price)) * calcNights()}
                </h4>
                <p>총액을 결제하시면 모든 절차가 완료됩니다.</p>
              </div>
              <label>
                <input type="radio" value="full" checked="true" />
              </label>
            </div>
            <h4>결제 수단</h4>
            <div className="payment">
              <div>
                {data.payment_methods &&
                  data.payment_methods.map((m, idx) => (
                    <label key={m.idx}>
                      <input
                        type="radio"
                        name="payment"
                        value={m}
                        onChange={handlePayment}
                      />
                      {m}
                    </label>
                  ))}
              </div>
            </div>
            <hr></hr>
          </Section>

          <Section>
            <h3>필수 입력 정보</h3>
            <div className="req">
              <h4>호스트에게 메시지 보내기</h4>
              <p>호스트에게 여행 목적과 도착 예정 시간을 알려주세요.</p>
            </div>
            <div className="host">
              <div className="avatar">
                <img src={data.host_avatar} />
              </div>
              <div>
                <p>{data.host_name}</p>
                <p>에어비앤비 가입: {data.user_since}년</p>
              </div>
            </div>
            <div className="message">
              <input
                type="textarea"
                name="message"
                value={reservation.greeting}
                onChange={handleMessage}
              ></input>
            </div>
            <hr></hr>
          </Section>

          <Section>
            <div className="refund">
              <h3>환불 정책</h3>
              <p>
                8월 12일 4:00 PM 전에 예약을 취소하면 요금 전액이 환불됩니다. 그
                이후 8월 21일 4:00 PM 전에 예약을 취소하면 서비스 수수료를
                제외한 요금 전액이 환불됩니다. 자세히 보기
              </p>
              <p>
                호스트가 제공하는 환불 정책이 내게 적합한지 확인하세요. 3월 15일
                혹은 그 이후 확정된 예약에는 코로나19 확산 사태에 따른
                정상참작이 가능한 상황 정책이 적용되지 않습니다. 자세히 알아보기
              </p>
            </div>
            <hr></hr>
          </Section>

          <Section>
            <p className="terms">
              아래 버튼을 선택하면, 숙소 이용규칙, 환불 정책, 및 게스트 환불
              정책에 동의하는 것입니다. 또한 숙박세 및 서비스 수수료를 포함하여
              표시된 총 금액에 동의합니다. 에어비앤비는 이제 이 지역에서 정부가
              부과한 숙박세를 징수하여 납부합니다.
            </p>
          </Section>

          <button onClick={sendReservation}>확인 및 결제</button>
        </Left>
        <Right>
          {/* pass in checkin, checkout, price */}
          <Summary
            data={data}
            price={data.price}
            calcNights={calcNights()}
            totalAmount={totalAmount}
            currency={data.currency && data.currency}
            changeCurrency={changeCurrency}
          />
        </Right>
      </MainWrapper>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  color: ${(props) => props.theme.color.black};
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
  justify-content: space-between;
  max-width: 1080px;
  margin: 0 auto 4em;
`;

const Left = styled.div`
  width: 55%;
  h2 {
    font-size: 1.875rem;
    margin-bottom: 1em;
  }
  button {
    background-color: ${(props) => props.theme.color.red};
    color: white;
    border: none;
    padding: 1.25em 2em;
    border-radius: 0.5em;
    cursor: pointer;
  }
`;

const Confirm = styled.div`
  display: flex;
  justify-content: center;
  line-height: 1.3em;
  padding-right: 2em;
  .placeimg {
    margin-right: 1em;
    img {
      width: 108px;
      height: 80px;
      border-radius: 10px;
      object-fit: cover;
    }
  }
  .detail {
    p:first-child {
      font-size: 1rem;
      font-weight: bold;
    }
    p {
      font-size: 0.875rem;
    }
    .rating {
      font-size: 0.8rem;
      .fas {
        color: ${(props) => props.theme.color.red};
      }
      span {
        color: ${(props) => props.theme.color.gray};
        margin-left: 0.25em;
      }
    }
  }
`;

const Section = styled.section`
  margin: 2em 2em 2em 0;
  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.875em;
  }
  .flexBet {
    display: flex;
    justify-content: space-between;
  }
  .flexCenter {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pitch {
    p {
      font-size: 0.875rem;
      color: ${(props) => props.theme.color.gray};
      margin: 0.35em 0;
    }
  }
  .res {
    margin: 0.875em 0;
    p {
      color: ${(props) => props.theme.color.gray};
      margin: 0.5em 0;
    }
  }
  .payment {
    display: flex;
    justify-content: space-between;
    border: 1px solid #008489;
    border-radius: 0.25em;
    padding: 1.75em 1.25em;
    margin: 1em 0 2em 0;
    p {
      margin: 0.5em 0;
    }
  }
  .req {
    h4 {
      margin-bottom: 0.5em;
    }
    p {
      font-size: 0.95rem;
      color: ${(props) => props.theme.color.gray};
    }
  }
  .host {
    display: flex;
    align-items: center;
    margin: 1.5em 0;
    .avatar {
      margin-right: 1em;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    p {
      margin-bottom: 0.25em;
    }
  }
  .message {
    width: 100%;
    margin: 2em 0;
    input {
      width: 100%;
      height: 8em;
      border: 1px solid #dedede;
      border-radius: 0.5em;
      padding; 2em;
    }
  }
  .refund {
    border-left: 8px solid #ffaf0f;
    padding-left: 1em;
    h3 {
      font-size: 1.5rem;
    }
    p {
      color: ${(props) => props.theme.color.gray};
      line-height: 1.25em;
      margin: 1em 2em 1em 0;
    }
  }
  .terms {
    font-size: 0.875rem;
    line-height: 1rem;
  }
  hr {
    margin: 1em 0;
  }
`;
const Right = styled.div`
  width: 40%;
`;

const mapStateToProps = ({ seacher }) => ({
  location: seacher.location,
  startDay: seacher.startDay,
  endDay: seacher.endDay,
  adults: seacher.adults,
  children: seacher.children,
  infants: seacher.infants,
});

const mapDispatchToProps = (dispatch) => ({
  searchActions: bindActionCreators(searchActions, dispatch),
  // AnotherActions: bindActionCreators(anotherActions, dispatch)
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Reservation)
);