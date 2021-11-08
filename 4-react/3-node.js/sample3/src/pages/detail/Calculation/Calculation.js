import "../../detail/reactdate.css";

import * as searchActions from "../../../store/modules/seacher";

// import {
//   DateRangePicker,
//   DayPickerRangeController,
//   SingleDatePicker,
// } from "react-dates";
// import { Link, withRouter } from "react-router-dom";
import React, { Component, Fragment, useEffect, useState } from "react";

import { API } from "../../../config";
import Calendar from "../../../components/Calendar/Calendar";
import Guest from "../../../components/Search/Guest";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import styled from "styled-components";

class Calculation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      unitPrice: [],
      ratings: [],
      totalPrice: 0,
      cleanCost: 40,
      stage1: false,
      stage2: true,
      stage3: false,
    };
  }

  // componentDidMount = () => {
  //   fetch(`${API}/room/detail/1`, {
  //     method: "GET",
  //     headers: {
  //       "content-Type": "application/json",
  //     },
  //   })
  componentDidMount = () => {
    fetch(`${API}/room/detail/${this.props.match.params.id}`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      // .then((res) => console.log("res :", res));
      .then((res) =>
        this.setState(
          {
            unitPrice: res.room_info.price,
            monthlyDiscount: res.monthly_discount,
            ratings: res.ratings,
          }
          // () => console.log("bathInfo : ", res.room_info.images)
        )
      );
  };

  totalPriceCalculator = (startDate, endDate) => {
    const { unitPrice } = this.state;
    let duration = 0;
    if (endDate) {
      duration = endDate.diff(startDate, "days");
    }
    const totalPrice = duration * unitPrice;
    this.setState({ duration, totalPrice });

    if (duration < 28) {
      this.setState({ stage3: true });
    } else if (duration >= 28) {
      this.setState({ stage3: false });
    }
  };

  displayHandler = () => {
    this.setState({ stage1: true });
    this.setState({ stage2: false });
  };

  render() {
    // console.log("stage3 :", this.state.stage3);
    // console.log(this.props.location.state.parsed.checkin);
    // console.log("startDate :", this.state.startDate);

    const {
      duration,
      unitPrice,
      totalPrice,
      cleanCost,
      monthlyDiscount,
      ratings,
    } = this.state;

    return (
      <>
        <CalendarWrapper>
          <TopWrapper>
            {this.state.stage2 && (
              <GuideWrapper1>
                요금을 확인하려면 날짜를 입력하세요.
              </GuideWrapper1>
            )}
            {this.state.stage1 && (
              <GuidePrice>
                <GuideWrapper2>${unitPrice.toLocaleString()}</GuideWrapper2>
                <GuideWrapper3>/박</GuideWrapper3>
              </GuidePrice>
            )}
            <PointWrapper>
              <i class="fas fa-star"></i> {Math.round(ratings.overall)}
            </PointWrapper>
          </TopWrapper>
          <MiddleWrapper>
            <Calendar
              displayHandler={this.displayHandler}
              totalPriceCalculator={this.totalPriceCalculator}
            />
          </MiddleWrapper>

          <Guest />

          {this.state.stage2 && <Button>예약 가능 여부 보기</Button>}

          {this.state.stage1 && (
            <div>
              {this.state.stage3 ? (
                <BottomWrapper>
                  <Button>
                    <div className="linkButton">
                      <Link
                        to={{
                          pathname: "/reservation",
                          state: {
                            room_id: this.props.match.params.id,
                          },
                        }}
                      >
                        예약 하기
                      </Link>
                    </div>
                  </Button>
                  <CommentWrapper>
                    예약 확정 전에는 요금이 청구되지 않습니다
                  </CommentWrapper>
                  <CalculWrapper>
                    <Calcul_Left_Wrapper>
                      <tr>
                        <td className="longwidth">
                          {" "}
                          ${unitPrice.toLocaleString()} x {duration}박{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>청소비</td>
                      </tr>
                      <tr>
                        <td>서비스 수수료</td>
                      </tr>
                      <tr>
                        <td>숙박세와 수수료</td>
                      </tr>
                    </Calcul_Left_Wrapper>
                    <Calcul_Right_Wrapper>
                      <tr>
                        <td> ${totalPrice.toLocaleString()} </td>
                      </tr>
                      <tr>
                        <td>${cleanCost.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td>
                          ${Math.round(totalPrice * 0.17).toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          $
                          {Math.round(totalPrice * 0.17 * 0.1).toLocaleString()}
                        </td>
                      </tr>
                    </Calcul_Right_Wrapper>
                  </CalculWrapper>
                  <Line />
                  <GrandTotalWrapper>
                    <Grand_Left_Wrapper>
                      <tr>
                        <td>총 합계</td>
                      </tr>
                    </Grand_Left_Wrapper>
                    <Grand_Right_Wrapper>
                      <tr>
                        <td>
                          $
                          {Math.round(
                            totalPrice +
                            cleanCost +
                            totalPrice * 0.17 +
                            totalPrice * 0.17 * 0.1
                          ).toLocaleString()}
                        </td>
                      </tr>
                    </Grand_Right_Wrapper>
                  </GrandTotalWrapper>
                </BottomWrapper>
              ) : (
                <BottomWrapper>
                  <Button>
                    <Link
                      to={{
                        pathname: "/reservation",
                        state: {
                          room_id: this.props.match.params.id,
                        },
                      }}
                    >
                      예약 하기
                    </Link>
                  </Button>
                  <CommentWrapper>
                    예약 확정 전에는 요금이 청구되지 않습니다
                  </CommentWrapper>
                  <CalculWrapper>
                    <Calcul_Left_Wrapper>
                      <tr>
                        <td className="longwidth">
                          {" "}
                          ${unitPrice.toLocaleString()} x {duration}박{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>청소비</td>
                      </tr>
                      <tr>
                        <td>장기 요금 할인</td>
                      </tr>
                      <tr>
                        <td>서비스 수수료</td>
                      </tr>
                      <tr>
                        <td>숙박세와 수수료</td>
                      </tr>
                    </Calcul_Left_Wrapper>
                    <Calcul_Right_Wrapper>
                      <tr>
                        <td> ${totalPrice.toLocaleString()} </td>
                      </tr>
                      <tr>
                        <td>${cleanCost.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td>
                          -$
                          <span
                            dangerouslySetInnerHTML={{
                              __html: Math.round(
                                totalPrice * monthlyDiscount
                              ).toLocaleString(),
                            }}
                          />
                          {/* $"{-totalPrice}*{monthlyDiscount}" */}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          ${Math.round(totalPrice * 0.17).toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          $
                          {Math.round(totalPrice * 0.17 * 0.1).toLocaleString()}
                        </td>
                      </tr>
                    </Calcul_Right_Wrapper>
                  </CalculWrapper>
                  <Line />
                  <GrandTotalWrapper>
                    <Grand_Left_Wrapper>
                      <tr>
                        <td>총 합계</td>
                      </tr>
                    </Grand_Left_Wrapper>
                    <Grand_Right_Wrapper>
                      <tr>
                        <td>
                          $
                          {Math.round(
                            totalPrice +
                            cleanCost +
                            totalPrice * 0.17 +
                            totalPrice * 0.17 * 0.1 -
                            totalPrice * monthlyDiscount
                          ).toLocaleString()}
                        </td>
                      </tr>
                    </Grand_Right_Wrapper>
                  </GrandTotalWrapper>
                </BottomWrapper>
              )}
            </div>
          )}
        </CalendarWrapper>
      </>
    );
  }
}
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
  connect(mapStateToProps, mapDispatchToProps)(Calculation)
);

const CalendarWrapper = styled.div`
  width: 362.63px;
  margin: 24px 0px;
  padding: 8px 24px 24px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px !important;
  border-radius: 12px;
  /* border: 1px solid blue; */
`;

const TopWrapper = styled.div`
  width: 314.63px;
  height: 76px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  /* border: 1px solid red */
`;

const GuideWrapper1 = styled.div`
  width: 251.38px;
  height: 54px;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
`;

const GuidePrice = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  /* border: 1px solid red */
`;

const GuideWrapper2 = styled.div`
  width: 91.23px;
  height: 28px;
  font-size: 22px;
  font-weight: 600;
  text-align: left;
`;

const GuideWrapper3 = styled.div`
  width: 26.81px;
  height: 21px;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
`;

const PointWrapper = styled.div`
  width: 48.06px;
  height: 36px;
  font-size: 14px;
  text-align: right;
  i {
    color: #ff385c;
  }
`;

const MiddleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0px 0px 20px 0px;
`;

const BottomWrapper = styled.div``;

const Button = styled.button`
  width: 314.63px;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background-image: var(
    --dls19-brand-gradient-radial,
    radial-gradient(
      circle at center,
      #ff385c 0%,
      #e61e4d 27.5%,
      #e31c5f 40%,
      #d70466 57.5%,
      #bd1e59 75%,
      #bd1e59 100%
    )
  ) !important;
  background-position: calc((100 - var(--mouse-x, 0)) * 1%)
    calc((100 - var(--mouse-y, 0)) * 1%);
  cursor: pointer;
  text-align: center;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
    "Helvetica Neue", sans-serif;
  border-radius: 8px;
  outline: none;
  .linkButton {
    color: white;
  }
`;

const CommentWrapper = styled.div`
  font-size: 14px;
  color: #222222;
  margin: 20px 0px;
  text-align: center;
`;

const CalculWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Calcul_Left_Wrapper = styled.div`
  font-size: 16px;
  color: #222222;
  td {
    width: 140px;
    height: 25px;
    text-align: left;
    text-decoration: underline;
  }
`;

const Calcul_Right_Wrapper = styled.div`
  font-size: 16px;
  color: #222222;
  td {
    width: 140px;
    height: 25px;
    text-align: right;
  }
`;

const Line = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid #dddddd;
  margin: 10px 0px;
`;

const GrandTotalWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  /* border: 1px solid blue; */
`;

const Grand_Left_Wrapper = styled.div`
  font-size: 16px;
  color: #222222;
  font-weight: 600;
  td {
    width: 140px;
    height: 25px;
    text-align: left;
    text-decoration: underline;
  }
`;

const Grand_Right_Wrapper = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #222222;
  td {
    width: 140px;
    height: 25px;
    text-align: right;
  }
`;