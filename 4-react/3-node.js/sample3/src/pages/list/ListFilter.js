import React, { useState, useEffect } from "react";
import Range from "../../components/Range/Range";
// import styled from "styled-components";

const ListFilter = ({
  rooms,
  TogglePlace,
  placeOpen,
  savePlaceType,
  submitPlace,
  TogglePrice,
  priceOpen,
  ToggleFilter,
  filterOpen,
  saveFilterType,
  submitFilter,
  savePropertyType,
  saveLanguage,
  clearFilter,
}) => {
  // state
  const [filter, setFilter] = useState([]);

  // fetch data
  useEffect(() => {
    fetch("/data/filter.json")
      .then((res) => res.json())
      .then((res) => {
        setFilter(res);
      });
  }, []);

  // Modal
  const handleOutside = (e) => {
    if (e.target.id === "outside") {
      ToggleFilter();
    }
  };

  return (
    <Container>
      <EachFilter>
        <Pill onClick={TogglePlace}>숙소유형</Pill>
        {placeOpen ? (
          <Dropdown>
            <div className="flex">
              <input
                type="checkbox"
                value={"집 전체"}
                onChange={savePlaceType}
              />
              <div>
                <h4>집 전체</h4>
                <p>집 전체를 단독으로 사용합니다.</p>
              </div>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                value={"개인실"}
                onChange={savePlaceType}
              />
              <div>
                <h4>개인실</h4>
                <p>
                  침실은 단독으로 쓰고, 이외의 공간은 호스트나 다른 게스트와
                  함께 이용할 수도 있습니다.
                </p>
              </div>
            </div>
            <div className="flex">
              <input type="checkbox" value={"객실"} onChange={savePlaceType} />
              <div>
                <h4>객실</h4>
                <p>부티크 호텔, 호스텔 등의 개인실이나 다인실을 이용합니다.</p>
              </div>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                value={"다인실"}
                onChange={savePlaceType}
              />
              <div>
                <h4>다인실</h4>
                <p>
                  사적 공간 없이, 침실이나 욕실 등을 호스트나 다른 게스트와 함께
                  이용합니다.
                </p>
              </div>
            </div>
            <button onClick={submitPlace}>저장</button>
          </Dropdown>
        ) : null}
      </EachFilter>
      <EachFilter>
        <Pill onClick={TogglePrice}>요금</Pill>
        {priceOpen ? (
          <PriceDropdown>
            <div>
              <h4>요금</h4>
              {/* <Range rooms={rooms}></Range> */}
            </div>
          </PriceDropdown>
        ) : null}
      </EachFilter>
      <EachFilter>
        <Pill onClick={ToggleFilter}>필터 추가하기</Pill>
        {filterOpen ? (
          <Modal>
            <Backdrop id="outside" onClick={(e) => handleOutside(e)}>
              <Box>
                <div className="header">
                  <div>
                    <i className="fas fa-times"></i>
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
                            onChange={saveFilterType}
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
                          <input
                            type="checkbox"
                            value={property}
                            onChange={savePropertyType}
                          />
                          {property}
                        </label>
                      </div>
                    ))}
                  </Section>
                  <Section>
                    <h2>호스트 언어</h2>
                    {filter.languages.map((language) => (
                      <div className="eachline">
                        <label>
                          <input
                            type="checkbox"
                            value={language}
                            onChange={saveLanguage}
                          />
                          {language}
                        </label>
                      </div>
                    ))}
                  </Section>
                </div>
                <div></div>
                <div className="submit">
                  <div onClick={clearFilter}>지우기</div>
                  <Btn onClick={submitFilter}>저장</Btn>
                </div>
              </Box>
            </Backdrop>
          </Modal>
        ) : null}
      </EachFilter>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  color: ${(props) => props.theme.color.black};
  /* margin: 0.875em 0; */
  margin: 1.5em 2em;
  z-index: 100;
`;

const EachFilter = styled.div`
  position: relative;
`;

const Pill = styled.button`
  background-color: transparent;
  border: 1px solid #969696;
  border-radius: 5em;
  padding: 0.65em 1.75em;
  margin: 1em 0.25em;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  width: 400px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 2em;
  z-index: 100;
  div.flex {
    display: flex;
    margin-bottom: 0.75em;
    input {
      margin-right: 0.75em;
    }
  }
  h4 {
    font-size: 1.25 rem;
    font-weight: normal;
    margin: 0.25em 0;
  }
  p {
    font-size: 0.875rem;
  }
  button {
    background-color: black;
    color: white;
    border-radius: 0.5em;
    border: none;
    padding: 0.75em 1.25em;
    cursor: pointer;
  }
`;

const PriceDropdown = styled.div`
  position: absolute;
  width: 400px;
  height: 360px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 2em;
  z-index: 100;
`;

const Modal = styled.div`
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

export default ListFilter;

// const ListFilter = ({
//   rooms,
//   handlePlaceType,
//   handleAmenitiesType,
//   clearPlace,
//   submitPlace,
//   handleTogglePlace,
//   handleTogglePrice,
//   priceOpen,
//   placeOpen,
//   amenitiesOpen,
//   submitAmenities,
// }) => {
//   const [filter, setFilter] = useState([]);
//   const [dropdown, setDropdown] = useState(undefined);

//

//   return (
//     <Container>
//       <Pill onClick={handleTogglePrice}>요금</Pill>
//       {priceOpen ? (
//         <Dropdown>
//           <div>
//             <div>요금</div>
//             <div style={{ height: "240px" }}>
//               <Range rooms={rooms}></Range>
//             </div>
//           </div>
//         </Dropdown>
//       ) : null}
//       <Pill onClick={handleToggleAmenities}>필터 추가하기</Pill>
//       {amenitiesOpen ? (
//         <MoreFilter
//           filter={filter}
//           handleOutside={handleOutside}
//           handleAmenitiesType={handleAmenitiesType}
//           submitAmenities={submitAmenities}
//         ></MoreFilter>
//       ) : null}
//     </Container>
//   );
// };

// const Container = styled.div`
//   display: flex;
//   margin: 0.875em 0;
//   z-index: 100;

//   div {
//     display: relative;
//   }
// `;

// const Pill = styled.button`
//   border-radius: 5em;
//   background-color: transparent;
//   border: 1px solid #969696;
//   color: ${(props) => props.theme.color.black};
//   padding: 0.65em 1.75em;
//   margin: 1em 0.25em;
//   cursor: pointer;
// `;

// const Filter = styled.div`
//   width: 650px;
//   height: 200px;
//   border: 1px solid ${(props) => props.theme.color.gray};
//   border-radius: 1em;
// `;

// export default ListFilter;