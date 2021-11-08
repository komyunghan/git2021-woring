import * as searchActions from "../../store/modules/seacher";

import React, { useState } from "react";

import GuestModal from "./GuestModal";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import styled from "styled-components";

const Guest = ({ searchActions, adults, children, infants }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  let guestNum;
  if (adults === 0 && children === 0 && infants === 0) {
    guestNum = `게스트 추가`;
  } else if (infants === 0) {
    guestNum = `게스트 ${adults + children}명`;
  } else if (infants !== 0) {
    guestNum = `게스트 ${adults + children}명, 유아 ${infants}명`;
  }

  return (
    <>
      <SearchInput>
        <InputBtn onClick={handleOpen}>
          <div>인원</div>
          <div>{guestNum}</div>
        </InputBtn>
        {open ? <GuestModal /> : null}
      </SearchInput>
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
export default connect(mapStateToProps, mapDispatchToProps)(Guest);

//styled-components

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
`;