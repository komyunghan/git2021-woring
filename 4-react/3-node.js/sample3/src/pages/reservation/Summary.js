import React from "react";
// import styled from "styled-components";

const Summary = ({ data, changeCurrency, calcNights, totalAmount }) => {
  const priceToNum = (str) => {
    str = str.slice(0, -3);
    return str;
  };

  return (
    <Container>
      <div>
        <h2>요금 세부정보</h2>
        <div className="flexBet">
          <div className="totalPrice">
            {data.currency === "KRW" ? (
              <span>₩ </span>
            ) : data.currency === "USD" ? (
              <span>$ </span>
            ) : null}
            {`${data.price && priceToNum(data.price)} X ${calcNights}박`}
          </div>
          <div>
            <span>
              {data.currency === "KRW" ? (
                <span>₩ </span>
              ) : data.currency === "USD" ? (
                <span>$ </span>
              ) : null}
              {(data.price && priceToNum(data.price)) * calcNights}
            </span>
          </div>
        </div>
      </div>

      <hr></hr>
      <ShortMsg>통화선택</ShortMsg>
      <Currency>
        {data.currency === "KRW" ? (
          <div>
            <button className="active" disabled="true">
              KRW
            </button>
            <button value="USD" className="inactive" onClick={changeCurrency}>
              USD
            </button>
          </div>
        ) : (
          <div>
            <button className="active" disabled="true">
              USD
            </button>
            <button value="KRW" className="inactive" onClick={changeCurrency}>
              KRW
            </button>
          </div>
        )}
      </Currency>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  border: 1px solid #e4e4e4;
  border-radius: 1em;
  padding: 2em;
  h2 {
    font-size: 1.375rem;
  }
  .flexBet {
    display: flex;
    justify-content: space-between;
    margin: 2em 0;
  }
  .totalPrice {
  }
`;

const ShortMsg = styled.div`
  margin: 2em 0 1em 0;
`;

const Currency = styled.div`
  div {
    display: flex;
    .active {
      font-weight: bold;
      color: black;
      margin-right: 0.5em;
      background-color: transparent;
      border: none;
    }
    .inactive {
      text-decoration: underline;
      margin-right: 0.5em;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }
`;
export default Summary;