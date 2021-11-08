import * as searchActions from "../../store/modules/seacher";

import React, { useState } from "react";

import Calendar from "../../components/Calendar/Calendar";
import Guest from "../../components/Search/Guest";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import styled from "styled-components";
// import { withRouter } from "react-router-dom";

const Search = ({
  history,
  searchActions,
  startDay,
  endDay,
  location,
  adults,
  children,
  infants,
}) => {
  const onChange = (e) => {
    searchActions.getLocation(e.target.value);
  };

  const goToList = () => {
    const checkinString = `&checkin=${startDay}`;
    const checkoutString = `&checkout=${endDay}`;
    const adultsString = `&adults=${adults}`;
    const childrenString = `&children=${children}`;
    const infantsString = `&infants=${infants}`;

    if (!location) {
      alert("위치를 입력하세요");
    } else {
      history.push(
        `/list?location=${location}${startDay ? checkinString : ``}${endDay ? checkoutString : ``
        }${adults ? adultsString : ``}${children ? childrenString : ``}${infants ? infantsString : ``
        }`
      );
    }
  };

  return (
    <>
      <SearchWrapper>
        <SearchInputs>
          <SearchInput>
            <InputBtn>
              <div className="location">&nbsp;위치</div>
              <i className="fas fa-search min"></i>
              <form onSubmit={goToList}>
                <input
                  placeholder="어디로 여행가세요?"
                  onChange={onChange}
                // value={location}
                ></input>
              </form>
            </InputBtn>
          </SearchInput>

          <Line></Line>
          <SearchInput className="media">
            <InputBtn>
              <div>&nbsp;체크인/체크아웃</div>
              <div>
                <Calendar />
              </div>
            </InputBtn>
          </SearchInput>
          <Line></Line>
          {/* 게스트 인원 컴포넌트 */}
          <SearchInput className="media">
            <Guest />
          </SearchInput>
        </SearchInputs>

        <SearchBtn onClick={goToList}>
          <i className="fas fa-search"></i>&nbsp;&nbsp;<span>검색</span>
        </SearchBtn>
      </SearchWrapper>
    </>
  );
};

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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));

//styled-components

const SearchWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 12px;
  margin-bottom: 70px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08) !important;
  .min {
    display: none;
  }
   {
    @media only screen and (max-width: 1000px) {
      width: 100%;
    }
    @media only screen and (max-width: 720px) {
      width: 100%;
      border-radius: 50px;
      height: 60px;
      .min {
        font-size: 16px;
        display: block;
        margin-right: 10px;
      }
      .location {
        display: none;
      }
    }
  }
`;

const SearchInputs = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
   {
    @media only screen and (max-width: 720px) {
      .media {
        display: none;
      }
    }
  }
`;

const SearchInput = styled.div`
  border-radius: 10px;
  padding: 8px;
  width: 100%;
  font-size: 12px;
  position: relative;
  input {
    border: none;
    margin-top: 3px;
    font-size: 14px;
    width: 100%;
  }
`;

const InputBtn = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 1em;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  cursor: pointer;
  div:nth-child(2) {
    color: ${(props) => props.theme.color.gray};
    margin-top: 3px;
    font-size: 14px;
  }
  @media only screen and (max-width: 720px) {
    flex-direction: row;
    align-items: center;
  }
`;

const SearchBtn = styled.button`
  border: none;
  display:flex;
  justify-content:space-around;
  align-items:center;
  /* background-color: ${(props) => props.theme.color.red}; */
  padding: 0 25px;
  color: #ffffff;
  border-radius: 10px;
  background-image: radial-gradient(circle at center, #FF385C 0%, #E61E4D 27.5%, #E31C5F 40%, #D70466 57.5%, #BD1E59 75%, #BD1E59 100% );
  background-size: 200% 200%;
  min-width:95px;
  cursor: pointer;
  @media only screen and (max-width: 720px) {
      display:none;
    }
  {
    @media only screen and (max-width: 1000px) {
      min-width: 35px;
      padding: 0 16px;
    }
  }
  span {
    @media only screen and (max-width: 1000px) {
      display:none;
    }
  }
`;
const Line = styled.div`
  height: 44px;
  border: solid 1px rgb(221, 221, 221);
  @media only screen and (max-width: 720px) {
    display: none;
  }
`;