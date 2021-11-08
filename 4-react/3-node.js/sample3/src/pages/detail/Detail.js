// import "react-dates/initialize";
import "./reactdate.css";

import * as searchActions from "../../store/modules/seacher";

// import {
//   DateRangePicker,
//   DayPickerRangeController,
//   SingleDatePicker,
// } from "react-dates";
// import { GoogleMap, LoadScript } from "@react-google-maps/api";
import React, { Component, Fragment, useEffect, useState } from "react";
// import styled, { injectGlobal } from "styled-components";

import { API } from "../../../src/config";
import Calculation from "./Calculation/Calculation";
import Calendar from "../../components/Calendar/Calendar";
import Footer from "../../../src/components/Footer";
import Guest from "../../components/Search/Guest";
import LocationMap from "../detail/LocationMap";
import Nav from "../../components/Nav";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import moment from "moment";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      roomInfo: [],
      bedroomInfo: [],
      bathInfo: [],
      characteristics: [],
      amenities: [],
      safetyFacilities: [],
      sharedSpaces: [],
      reviews: [],
      reviewsDate: [],
      ratings: [],
      monthlyDiscount: [],
    };
  }

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
            roomInfo: res.room_info,
            bedroomInfo: res.bedroom_info,
            bathInfo: res.bath_info,
            characteristics: res.characteristics,
            amenities: res.amenities,
            safetyFacilities: res.safety_facilities,
            sharedSpaces: res.shared_spaces,
            reviews: res.reviews,
            reviewsDate: res.reviews.created_at,
            ratings: res.ratings,
            monthlyDiscount: res.monthly_discount,
          }
          // () => console.log("ratings : ", res.characteristics[0].icon_fa)
        )
      );
  };

  // componentDidMount = () => {
  //   fetch(`${API}/room/detail/${this.props.location.state}`, {
  //     method: "GET",
  //     headers: {
  //       "content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => console.log("state :", res));
  // };

  render() {
    const {
      roomInfo,
      bedroomInfo,
      bathInfo,
      characteristics,
      amenities,
      safetyFacilities,
      sharedSpaces,
      reviews,
      reviewsDate,
      ratings,
      monthlyDiscount,
    } = this.state;

    // console.log(this.props.location.state.parsed);

    return (
      <>
        <Nav />
        <DetailWrapper>
          {/* <div style={{ display: "flex" }}></div> */}

          <TitleHeader>
            <UpperTitleWrapper>{roomInfo.title}</UpperTitleWrapper>
            <DownTitleWrapper>
              <PointAddress>
                {Math.round(ratings.overall * 100) / 100.0} {roomInfo.address}
              </PointAddress>
              <ShareSave>공유하기 저장</ShareSave>
            </DownTitleWrapper>

            <PhotoSliderWrapper>
              <PhotoSlider_Left>
                <img src={roomInfo.images && roomInfo.images[0]} />
              </PhotoSlider_Left>
              <PhotoSlider_Right>
                <PhotoSlider1>
                  <img src={roomInfo.images && roomInfo.images[1]} />
                </PhotoSlider1>

                <PhotoSlider2>
                  <img src={roomInfo.images && roomInfo.images[2]} />
                </PhotoSlider2>

                <PhotoSlider3>
                  <img src={roomInfo.images && roomInfo.images[3]} />
                </PhotoSlider3>

                <PhotoSlider4>
                  <img src={roomInfo.images && roomInfo.images[4]} />
                </PhotoSlider4>
              </PhotoSlider_Right>
            </PhotoSliderWrapper>
          </TitleHeader>

          <MiddleWrapper>
            <MiddleWrapper_Left>
              <Summary>
                <UpperSummary>
                  <UpperSummary_Left>
                    <UpperSummary_Left1>
                      {roomInfo.host_name}님이 호스팅하는{" "}
                      {roomInfo.property_type}
                    </UpperSummary_Left1>
                    <UpperSummary_Left2>
                      인원{roomInfo.max_capacity}명 침실{roomInfo.bedrooms}개
                      침대{roomInfo.beds}개 욕실
                      {bathInfo[0] && bathInfo[0].quantity}개
                    </UpperSummary_Left2>
                  </UpperSummary_Left>
                  <UpperSummary_Right>
                    <img src={roomInfo.host_avatar} />
                  </UpperSummary_Right>
                </UpperSummary>
                <DownSummary>
                  <DownSummary_1>
                    <DownSummary_Left>
                      {characteristics[0] && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: characteristics[0].icon_fa,
                          }}
                        />
                      )}
                    </DownSummary_Left>
                    <DownSummary_Right>
                      <DownSummary_Right1>
                        {characteristics[0] && characteristics[0].title}
                      </DownSummary_Right1>
                      <DownSummary_Right2>
                        {characteristics[0] && characteristics[0].description}
                      </DownSummary_Right2>
                    </DownSummary_Right>
                  </DownSummary_1>
                  <DownSummary_2>
                    <DownSummary_Left>
                      {/* <div
                        dangerouslySetInnerHTML={{
                          __html: '<i class="fas fa-spray-can"></i>',
                        }}
                      /> */}

                      {characteristics[1] && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: characteristics[1].icon_fa,
                          }}
                        />
                      )}
                    </DownSummary_Left>
                    <DownSummary_Right>
                      <DownSummary_Right1>
                        {characteristics[1] && characteristics[1].title}
                      </DownSummary_Right1>
                      <DownSummary_Right2>
                        {characteristics[1] && characteristics[1].description}
                      </DownSummary_Right2>
                    </DownSummary_Right>
                  </DownSummary_2>
                  <DownSummary_3>
                    <DownSummary_Left>
                      {characteristics[2] && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: characteristics[2].icon_fa,
                          }}
                        />
                      )}
                    </DownSummary_Left>
                    <DownSummary_Right>
                      <DownSummary_Right1>
                        {characteristics[2] && characteristics[2].title}
                      </DownSummary_Right1>
                      <DownSummary_Right2>
                        {characteristics[2] && characteristics[2].description}
                      </DownSummary_Right2>
                    </DownSummary_Right>
                  </DownSummary_3>
                  <DownSummary_4>
                    <DownSummary_Left>
                      <div>
                        <i class="fas fa-credit-card"></i>
                      </div>
                    </DownSummary_Left>
                    <DownSummary_Right>
                      <DownSummary_Right1>환불 정책</DownSummary_Right1>
                      <DownSummary_Right2>
                        체크인 30일 전까지 취소하시면 전액이 환불됩니다.
                      </DownSummary_Right2>
                    </DownSummary_Right>
                  </DownSummary_4>
                </DownSummary>
              </Summary>

              <Description>{roomInfo.description}</Description>
              <Bed>
                <Bed_Upper>침대/침구 유형</Bed_Upper>
                <Bed_Down>
                  <Bed_Down_Box>
                    <Bed_Image>
                      <i class="fas fa-bed"></i>
                    </Bed_Image>
                    <Bedroom_Num>
                      {bedroomInfo[0] && bedroomInfo[0].room_name}
                    </Bedroom_Num>
                    <Bed_Size_Num>
                      {bedroomInfo[0] && bedroomInfo[0].bed_info[0].size} 침대
                      {bedroomInfo[0] && bedroomInfo[0].bed_info[0].quantity}개
                    </Bed_Size_Num>
                  </Bed_Down_Box>
                </Bed_Down>
              </Bed>

              <Convinience>
                <Convinience_Upper>편의시설</Convinience_Upper>
                <Convinience_Down>
                  <Convinience_Down_Left>
                    <CDL>
                      <CDL_Image>
                        {amenities[0] && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: amenities[0].icon_fa,
                            }}
                          />
                        )}
                      </CDL_Image>
                      <CDL_Item>{amenities[0] && amenities[0].name}</CDL_Item>
                    </CDL>

                    <CDL>
                      <CDL_Image>
                        {amenities[1] && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: amenities[1].icon_fa,
                            }}
                          />
                        )}
                      </CDL_Image>
                      <CDL_Item>{amenities[1] && amenities[1].name}</CDL_Item>
                    </CDL>

                    <CDL>
                      <CDL_Image>
                        {amenities[2] && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: amenities[2].icon_fa,
                            }}
                          />
                        )}
                      </CDL_Image>
                      <CDL_Item>{amenities[2] && amenities[2].name}</CDL_Item>
                    </CDL>

                    <CDL>
                      <CDL_Image>
                        {amenities[3] && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: amenities[3].icon_fa,
                            }}
                          />
                        )}
                      </CDL_Image>
                      <CDL_Item>{amenities[3] && amenities[3].name}</CDL_Item>
                    </CDL>

                    <CDL>
                      <CDL_Image>
                        {amenities[4] && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: amenities[4].icon_fa,
                            }}
                          />
                        )}
                      </CDL_Image>
                      <CDL_Item>{amenities[4] && amenities[4].name}</CDL_Item>
                    </CDL>
                  </Convinience_Down_Left>

                  <Convinience_Down_Right>
                    <CDL>
                      <CDL_Image>
                        {amenities[5] && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: amenities[5].icon_fa,
                            }}
                          />
                        )}
                      </CDL_Image>
                      <CDL_Item>{amenities[5] && amenities[5].name}</CDL_Item>
                    </CDL>

                    <CDL>
                      <CDL_Image>
                        {amenities[6] && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: amenities[6].icon_fa,
                            }}
                          />
                        )}
                      </CDL_Image>
                      <CDL_Item>{amenities[6] && amenities[6].name}</CDL_Item>
                    </CDL>

                    <CDL>
                      <CDL_Image>
                        {amenities[7] && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: amenities[7].icon_fa,
                            }}
                          />
                        )}
                      </CDL_Image>
                      <CDL_Item>{amenities[7] && amenities[7].name}</CDL_Item>
                    </CDL>

                    <CDL>
                      <CDL_Image>
                        {amenities[8] && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: amenities[8].icon_fa,
                            }}
                          />
                        )}
                      </CDL_Image>
                      <CDL_Item>{amenities[8] && amenities[8].name}</CDL_Item>
                    </CDL>

                    <CDL>
                      <CDL_Image>
                        {amenities[9] && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: amenities[9].icon_fa,
                            }}
                          />
                        )}
                      </CDL_Image>
                      <CDL_Item>{amenities[9] && amenities[9].name}</CDL_Item>
                    </CDL>
                  </Convinience_Down_Right>
                </Convinience_Down>
              </Convinience>

              <Calendar_Left>
                <Calendar_Upper>체크인 날짜를 선택해 주세요.</Calendar_Upper>
                <DayPickerRangeController
                  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                  onDatesChange={({ startDate, endDate }) =>
                    this.setState({ startDate, endDate })
                  } // PropTypes.func.isRequired,
                  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                  onFocusChange={(focusedInput) =>
                    this.setState({ focusedInput })
                  } // PropTypes.func.isRequired,
                  initialVisibleMonth={() => moment().add(2, "M")} // PropTypes.func or null,
                  numberOfMonths="2"
                />
              </Calendar_Left>
              <Point_Review>
                <Point_Upper>
                  <i class="fas fa-star"></i> {Math.round(ratings.overall)}
                </Point_Upper>
                <Point_Down>
                  <Point_Down_Left>
                    <PDL>
                      <PDL1>청결도</PDL1>
                      <PDL2>
                        <div
                          style={{
                            width: `${ratings.cleanliness * 20}%`,
                          }}
                        ></div>
                      </PDL2>
                      <PDL3>{ratings.cleanliness}</PDL3>
                    </PDL>

                    <PDL>
                      <PDL1>의사소통</PDL1>
                      <PDL2>
                        <div
                          style={{
                            width: `${ratings.communication * 20}%`,
                          }}
                        ></div>
                      </PDL2>
                      <PDL3>{ratings.communication}</PDL3>
                    </PDL>

                    <PDL>
                      <PDL1>체크인</PDL1>
                      <PDL2>
                        <div
                          style={{
                            width: `${ratings.check_in * 20}%`,
                          }}
                        ></div>
                      </PDL2>
                      <PDL3>{ratings.check_in}</PDL3>
                    </PDL>
                  </Point_Down_Left>

                  <Point_Down_Right>
                    <PDL>
                      <PDL1>정확성</PDL1>
                      <PDL2>
                        <div
                          style={{
                            width: `${ratings.accuracy * 20}%`,
                          }}
                        ></div>
                      </PDL2>
                      <PDL3>{ratings.accuracy}</PDL3>
                    </PDL>

                    <PDL>
                      <PDL1>위치</PDL1>
                      <PDL2>
                        <div
                          style={{
                            width: `${ratings.location * 20}%`,
                          }}
                        ></div>
                      </PDL2>
                      <PDL3>{ratings.location}</PDL3>
                    </PDL>

                    <PDL>
                      <PDL1>가격 대비 만족도</PDL1>
                      <PDL2>
                        <div
                          style={{
                            width: `${ratings.value * 20}%`,
                          }}
                        ></div>
                      </PDL2>
                      <PDL3>{ratings.value}</PDL3>
                    </PDL>
                  </Point_Down_Right>
                </Point_Down>
                <Review>
                  <Review_Upper>
                    <Review_ProfilePhoto>
                      <img src={reviews[0] && reviews[0].avatar} />
                    </Review_ProfilePhoto>
                    <Review_Right>
                      <ReviewerName>
                        {reviews[0] && reviews[0].name}
                      </ReviewerName>
                      <Review_Date>
                        {reviews[0] && reviews[0].created_at}
                      </Review_Date>
                    </Review_Right>
                  </Review_Upper>
                  <Review_Content>
                    {reviews[0] && reviews[0].content}
                  </Review_Content>
                </Review>
              </Point_Review>
            </MiddleWrapper_Left>
            <MiddleWrapper_Right>
              <Calculator>
                <Calculation />
              </Calculator>
            </MiddleWrapper_Right>
          </MiddleWrapper>
          <LowerWrapper>
            <Location>
              <Location_Upper>위치</Location_Upper>
              <Location_Middle>
                <LocationMap />
              </Location_Middle>
              <Location_Down></Location_Down>
            </Location>

            <Rule>
              <Convinience_Upper>알아두어야 할 사항</Convinience_Upper>
              <Convinience_Down>
                <Convinience_Down_Left>
                  <CDL>
                    <CDL_Image>
                      {amenities[0] && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: amenities[0].icon_fa,
                          }}
                        />
                      )}
                    </CDL_Image>
                    <CDL_Item>오후 {roomInfo.check_in} 이후</CDL_Item>
                  </CDL>

                  <CDL>
                    <CDL_Image>
                      {amenities[1] && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: amenities[1].icon_fa,
                          }}
                        />
                      )}
                    </CDL_Image>
                    <CDL_Item>오전 {roomInfo.check_out}</CDL_Item>
                  </CDL>

                  <CDL>
                    <CDL_Image>
                      {amenities[2] && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: amenities[2].icon_fa,
                          }}
                        />
                      )}
                    </CDL_Image>
                    <CDL_Item>흡연금지</CDL_Item>
                  </CDL>

                  <CDL>
                    <CDL_Image>
                      {amenities[3] && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: amenities[3].icon_fa,
                          }}
                        />
                      )}
                    </CDL_Image>
                    <CDL_Item>반려동물 동반 불가</CDL_Item>
                  </CDL>

                  <CDL>
                    <CDL_Image>
                      {amenities[4] && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: amenities[4].icon_fa,
                          }}
                        />
                      )}
                    </CDL_Image>
                    <CDL_Item>파티나 이벤트 금지</CDL_Item>
                  </CDL>

                  <ViewAll>
                    <div>모두 보기</div>
                  </ViewAll>
                </Convinience_Down_Left>
              </Convinience_Down>
            </Rule>
          </LowerWrapper>
        </DetailWrapper>
        <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail);

const DetailWrapper = styled.div`
  /* div{
    display: flex;
  } */
  /* border: 20px solid blue; */
`;
const TitleHeader = styled.div`
  width: 1120px;
  height: 88px;
  margin: 0 auto;
  margin-top: 20px;
  /* border: 1px solid orange; */
`;

const UpperTitleWrapper = styled.div`
  width: 1120px;
  height: 30px;
  font-size: 26px;
  font-weight: 600;
  margin: 10px 0px;
`;

const DownTitleWrapper = styled.div`
  width: 1120px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin: 14px 0px;
  /* border: 1px solid red; */
`;

const PointAddress = styled.div`
  /* width: 1120px; */
  height: 30px;
  font-size: 14px;
`;

const ShareSave = styled.div`
  /* width: 1120px; */
  height: 30px;
  font-size: 14px;
`;

const PhotoSliderWrapper = styled.div`
  width: 1120px;
  height: 541.39px;
  display: flex;
  cursor: pointer;
`;

const PhotoSlider_Left = styled.div`
  width: 560px;
  height: 541.39px;
  img {
    width: 560px;
    height: 541.39px;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  /* border: 20px solid blue; */
  /* border: 1px solid orange; */
`;

const PhotoSlider_Right = styled.div`
  width: 560px;
  height: 541.39px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  /* border: 1px solid green; */
`;
const PhotoSlider1 = styled.div`
  img {
    width: 272px;
    height: 270.69px;
  }
  /* border: 1px solid purple; */
`;
const PhotoSlider2 = styled.div`
  width: 272px;
  height: 270.69px;
  img {
    border-top-right-radius: 12px;
    width: 272px;
    height: 270.69px;
  }
  /* border: 1px solid purple; */
`;
const PhotoSlider3 = styled.div`
  width: 272px;
  height: 270.69px;
  img {
    width: 272px;
    height: 270.69px;
  }
  /* border: 1px solid purple; */
`;
const PhotoSlider4 = styled.div`
  width: 272px;
  height: 270.69px;
  img {
    width: 272px;
    height: 270.69px;
    border-bottom-right-radius: 12px;
  }
  /* border: 1px solid purple; */
`;

const MiddleWrapper = styled.div`
  display: flex;
  width: 1120px;
  margin: 0 auto;
  margin-top: 580px;
  border-bottom: 1px solid #dddddd;
  /* border: 5px solid black; */
`;
const MiddleWrapper_Left = styled.div`
  display: block;
  width: 646.59px;
  /* border: 5px solid green; */
`;

const Summary = styled.div`
  display: block;
  width: 646.59px;
  border-bottom: 1px solid #dddddd;
`;

const UpperSummary = styled.div`
  width: 646.59px;
  display: flex;
  align-items: center;
  padding-bottom: 40px;
  border-bottom: 1px solid #dddddd;
`;
const UpperSummary_Left = styled.div`
  width: 574.59px;
  height: 56px;
  /* border: 1px solid purple; */
`;

const UpperSummary_Left1 = styled.div`
  width: 574.59px;
  height: 26px;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
  /* border: 1px solid black; */
`;

const UpperSummary_Left2 = styled.div`
  width: 574.59px;
  height: 20px;
  font-size: 16px;
  font-weight: 400;
  /* border: 1px solid black; */
`;

const UpperSummary_Right = styled.div`
  img {
    width: 56px;
    height: 56px;
    border-radius: 70%;
  }
  /* border: 1px solid black; */
`;

const DownSummary = styled.div``;
const DownSummary_1 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 15px 0px;
`;
const DownSummary_2 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 15px 0px;
`;
const DownSummary_3 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 15px 0px;
`;
const DownSummary_4 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 15px 0px;
`;

const DownSummary_Left = styled.div`
  div {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  /* border: 1px solid purple; */
`;
const DownSummary_Right = styled.div`
  height: 40px;
  margin: 10px 0px 10px 10px;
`;
const DownSummary_Right1 = styled.div`
  height: 20px;
  font-size: 16px;
  font-weight: 600;
`;
const DownSummary_Right2 = styled.div`
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #717171;
`;
const Description = styled.div`
  display: block;
  width: 646.59px;
  border-bottom: 1px solid #dddddd;
  padding: 40px 0px 40px 0px;
  line-height: 150%;
`;

const Bed = styled.div`
  display: block;
  width: 646.59px;
  border-bottom: 1px solid #dddddd;
  padding: 40px 0px;
`;

const Bed_Upper = styled.div`
  width: 646.59px;
  height: 26px;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
`;
const Bed_Down = styled.div`
  width: 646.59px;
  height: 143px;
`;
const Bed_Down_Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px;
  width: 204.28px;
  height: 143px;
  border: 1px solid #dddddd;
  border-radius: 12px;
  vertical-align: middle;
`;
const Bed_Image = styled.div`
  width: 24px;
  height: 24px;
`;
const Bedroom_Num = styled.div`
  width: 154.28px;
  height: 20px;
  font-size: 16px;
  font-weight: 600;
`;
const Bed_Size_Num = styled.div`
  width: 154.28px;
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #222222;
  border: 1px soild green;
`;

const Convinience = styled.div`
  display: block;
  width: 646.59px;
  border-bottom: 1px solid #dddddd;
  padding: 40px 0px;
`;
const Convinience_Upper = styled.div`
  width: 646.59px;
  height: 26px;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Convinience_Down = styled.div`
  width: 646.59px;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;
  display: flex;
`;
const Convinience_Down_Left = styled.div`
  width: 262.73px;
  margin-right: 50px;
`;
const Convinience_Down_Right = styled.div`
  width: 262.73px;
`;

const CDL = styled.div`
  width: 646.59px;
  display: flex;
  margin: 20px 0px;
`;

const CDL_Image = styled.div`
  div {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    /* border: 1px solid purple; */
  }
`;
const CDL_Item = styled.div`
  width: 230px;
  height: 24px;
  margin-left: 10px;
`;
const Calendar_Left = styled.div`
  display: block;
  width: 646.59px;
  border-bottom: 1px solid #dddddd;
  padding: 40px 0px;
`;
const Calendar_Upper = styled.div`
  width: 646.59px;
  height: 26px;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Point_Review = styled.div`
  display: block;
  width: 646.59px;
  /* border-bottom: 1px solid #dddddd; */
  padding: 40px 0px;
`;
const Point_Upper = styled.div`
  width: 646.59px;
  height: 26px;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  i {
    color: #ff385c;
  }
`;
const Point_Down = styled.div`
  width: 646.59px;
  font-size: 16px;
  font-weight: 400;
  display: flex;
`;

const Point_Down_Left = styled.div`
  width: 262.73px;
  margin-right: 50px;
`;

const Point_Down_Right = styled.div`
  width: 262.73px;
`;

const PDL = styled.div`
  display: flex;
  margin: 20px 0;
`;

const PDR = styled.div`
  display: flex;
  margin: 20px 0;
`;

const PDL1 = styled.div`
  width: 250px;
`;
const PDL2 = styled.div`
  width: 100px;
  margin-right: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  div {
    border: 2px solid black;
    border-radius: 2px;
  }
`;
const PDL3 = styled.div`
  width: 30px;
`;

const Review = styled.div``;

const Review_Upper = styled.div`
  display: flex;
  margin: 30px 0;
`;

const Review_ProfilePhoto = styled.div`
  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
`;

const Review_Right = styled.div`
  width: 72px;
  height: 40px;
  margin-left: 20px;
`;

const ReviewerName = styled.div`
  width: 72px;
  height: 25px;
  font-size: 16px;
  font-weight: 600;
`;

const Review_Date = styled.div`
  width: 72px;
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #717171;
`;

const Review_Content = styled.div`
  width: 646.59px;
  font-size: 16px;
  font-weight: 400;
`;

const LowerWrapper = styled.div`
  width: 1120px;
  margin: 0 auto;
  /* border: 1px solid green; */
`;
const Location = styled.div`
  width: 1120px;
  padding: 40px 0px;
  border-bottom: 1px solid #dddddd;
`;
const Location_Upper = styled.div`
  width: 1120px;
  height: 26px;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
`;
const Location_Middle = styled.div`
  width: 1120px;
  height: 480px;
`;
const Location_Down = styled.div`
  width: 1120px;
  height: 20px;
  font-size: 16px;
  font-weight: 400;
`;

const MiddleWrapper_Right = styled.div`
  margin: 0 auto;
  /* border: 1px solid purple; */
`;

const Calculator = styled.div`
  margin: 0 auto;
  position: sticky;
  top: 40px;
`;

const Rule = styled.div`
  display: block;
  width: 646.59px;
  border-bottom: 1px solid #dddddd;
  padding: 40px 0px;
`;

const ViewAll = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #717171;
  cursor: pointer;
  text-decoration: underline;
`;