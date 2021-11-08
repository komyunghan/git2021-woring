import * as searchActions from "../../store/modules/seacher";

import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import styled from "styled-components";

const GuestModal = ({ searchActions, adults, children, infants }) => {
  return (
    <Modal>
      <Guests>
        <div>
          <span>성인</span>
          <span>만 13세 이상</span>
        </div>
        <div>
          <button
            className={adults === 0 ? "disabled" : undefined}
            onClick={() => {
              if (adults === 1 && (children !== 0 || infants !== 0)) {
                searchActions.getAdults(1);
              } else if (adults !== 0) {
                searchActions.adultDecrement();
              }
            }}
          >
            -
          </button>
          <div>{adults}</div>
          <button
            onClick={() => {
              if (adults !== 16) {
                searchActions.adultIncrement();
              }
            }}
          >
            +
          </button>
        </div>
      </Guests>
      <Guests>
        <div>
          <span>어린이</span>
          <span>2~12세</span>
        </div>
        <div>
          <button
            className={children === 0 ? "disabled" : undefined}
            onClick={() => {
              if (children !== 0) {
                searchActions.childrenDecrement();
              }
            }}
          >
            -
          </button>
          <div>{children}</div>
          <button
            onClick={() => {
              if (adults === 0 && children === 0) {
                searchActions.getAdults(1);
                searchActions.getChildren(1);
              } else if (children !== 16) {
                searchActions.childrenIncrement();
              }
            }}
          >
            +
          </button>
        </div>
      </Guests>
      <Guests>
        <div>
          <span>유아</span>
          <span>2세 미만</span>
        </div>
        <div>
          <button
            className={infants === 0 ? "disabled" : undefined}
            onClick={() => {
              if (infants !== 0) {
                searchActions.infantsDecrement();
              }
            }}
          >
            -
          </button>
          <div>{infants}</div>
          <button
            className={infants === 5 ? "disabled" : undefined}
            onClick={() => {
              if (adults === 0 && infants === 0) {
                searchActions.getAdults(1);
                searchActions.getChildren(1);
              } else if (infants !== 5) {
                searchActions.infantsIncrement();
              }
            }}
          >
            +
          </button>
        </div>
      </Guests>
    </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(GuestModal);

const Modal = styled.div`
  z-index: 10;
  padding: 12px;
  position: absolute;
  left: 1em;
  top: 73px;
  width: 100%;
  height: 260px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.07);
  background-color: white;
  div:last-child {
    border: none;
  }
`;
const Guests = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px rgb(235, 235, 235);
  margin-bottom: 1em;
  padding: 16px 4px 16px 0;
  div:first-child {
    display: flex;
    flex-direction: column;
    span:nth-child(1) {
      color: ${(props) => props.theme.color.black};
      font-size: 16px;
      line-height: 20px;
      font-weight: 600;
    }
    span:nth-child(2) {
      color: ${(props) => props.theme.color.gray};
      font-size: 14px;
      line-height: 18px;
      font-weight: 400;
    }
  }
  div:nth-child(2) {
    display: flex;
    align-items: center;
    font-size: 16px;
    div {
      width: 38px;
      display: flex;
      justify-content: center;
      span {
      }
    }
    button {
      width: 30px;
      height: 30px;
      border: solid 1px rgb(176, 176, 176);
      border-radius: 50%;
      background-color: transparent;
    }
    button.disabled {
      color: rgb(235, 235, 235);
      border-color: rgb(235, 235, 235);
    }
  }
`;