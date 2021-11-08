import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Checkbox from "../../components/Checkbox";

const MoreFilter = ({
  filter,
  amenities,
  languages,
  handleModal,
  handleOutside,
  handleAmenities,
  handleAmenitiesType,
  submitAmenities,
}) => {
  return (
    <Container>
      <Backdrop id="outside" onClick={(e) => handleOutside(e)}>
        <Box>
          <div className="header">
            <div>
              <i className="fas fa-times" onClick={handleModal}></i>
            </div>
            <div>필터 추가하기</div>
            <div></div>
          </div>
          <div className="content">
            <Section>
              <h2>편의시설</h2>

              {filter.amenities.map((amenity) => (
                <div className="eachline">
                  <label>
                    <input
                      type="checkbox"
                      value={amenity}
                      onChange={handleAmenitiesType}
                    />
                    {amenity}
                  </label>
                </div>
              ))}
            </Section>
            <Section>
              <h2>건물유형</h2>

              {filter.property_types.map((property) => (
                <div className="eachline">
                  <label>
                    <input type="checkbox" value={property} />
                    {property}
                  </label>
                </div>
              ))}
            </Section>
          </div>
          <div></div>
          <div className="submit">
            <div>지우기</div>
            <Btn onClick={submitAmenities}>저장</Btn>
          </div>
        </Box>
      </Backdrop>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Box = styled.form`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  z-index: 101;
  border-radius: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: 1.75em;
  }
  .content {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
    padding: 1em 1.5em;
  }
  .submit {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 1em 1.5em;
    background: white;
    border-top: 1px solid #eee;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`;

const Section = styled.div`
  border-bottom: 1px solid #eeeeee;
  padding: 1em 0;
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.25em;
  }
  div.eachline {
    display: flex;
    flex-basis: 50%;
    margin-bottom: 1.15em;
    align-items: center;
    label {
      flex-basis: 50%;
      color: ${(props) => props.theme.color.gray};
      margin-left: 0.35em;
    }
  }
`;

const Btn = styled.button`
  background-color: black;
  color: white;
  border-radius: 0.5em;
  border: none;
  padding: 0.75em 1.25em;
  cursor: pointer;
`;

export default MoreFilter;