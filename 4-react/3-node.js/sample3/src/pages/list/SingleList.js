import React from "react";
// import { useHistory } from "react-router-dom";

//import components
import ImageSlider from "./Slider/ImageSlider";

//import styles and assets
// import styled from "styled-components";
import { Tag } from "../../components/Tags";

const SingleList = ({ rooms, handleRoomID, parsed }) => {
  let history = useHistory();
  const truncate = (str) => {
    return str.length > 40 ? str.substring(0, 37) + "..." : str;
  };

  const discount = (price, rate) => {
    let discount = price * rate;
    return price - discount;
  };

  return (
    <div>
      {rooms.map((house) => (
        <Container
          key={house.room_id}
          onMouseOver={() => handleRoomID(house.room_id)}
          onMouseLeave={() => handleRoomID(null)}
        >
          <Image>
            <ImageSlider slides={house.images} heart={house.is_wishlist} />
          </Image>

          <Details
            onClick={() =>
              history.push(`/detail/${house.room_id}`, {
                parsed,
              })
            }
          >
            <Header>
              <Flex>
                <div>{house.property_type}</div>
                <Flex>
                  <i
                    className="fas fa-star"
                    style={{ color: "red", marginRight: "0.25em" }}
                  ></i>
                  <div style={{ fontWeight: "bold" }}>{house.rating}</div>
                  <div>({house.reviews})</div>
                </Flex>
              </Flex>
              <Title>{truncate(house.title)}</Title>
            </Header>
            <Options>
              <div>
                인원 {house.max_capacity}명 · 침실 {house.bedrooms}개 · 침대
                {house.beds}개 · 욕실 1개
              </div>
              <div>
                {house.features.map((feature, idx) => (
                  <span key={feature.idx}>{feature}</span>
                ))}
              </div>
            </Options>
            <Bottom>
              {house.discount_rate > 0 ? (
                <Tag icon="fas fa-tag" label="더 낮아진 요금" />
              ) : house.tag ? (
                <Tag icon="far fa-gem" label="예약이 금방 마감되는 숙소" />
              ) : (
                <div></div>
              )}
              <div>
                <div className="price">
                  {house.discount_rate > 0 ? (
                    <div>
                      <span className="discount">
                        <span>${house.price}</span>
                      </span>
                      ${discount(house.price, house.discount_rate)}
                    </div>
                  ) : (
                    <span>${house.price}</span>
                  )}
                  <span style={{ fontWeight: "normal", color: "#767676" }}>
                    /1박
                  </span>
                </div>
                <div className="total">총 요금: ₩273,882</div>
              </div>
            </Bottom>
          </Details>
        </Container>
      ))}
    </div>
  );
};

const Container = styled.div`
  display: flex;
  padding: 0 0 1.5em 0;
  border-bottom: 1px solid #e4e4e4;
  margin: 1.5em 2em;
`;

const Image = styled.div`
  width: 300px;
`;

const Details = styled.div`
  flex-grow: 1;
  padding-left: 1.25em;
`;

const Header = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.color.gray};
`;

const Title = styled.div`
  font-size: 1.125rem;
  color: ${(props) => props.theme.color.black};
  margin: 1em 0;
`;

const Options = styled.div`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${(props) => props.theme.color.gray};
  margin: 1em 0;
  span:after {
    content: " · ";
  }
  span:last-child:after {
    content: "";
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2em;
  .price {
    display: flex;
    justify-content: flex-end;
    font-size: 1.125rem;
    font-weight: bold;
  }
  .discount {
    color: ${(props) => props.theme.color.gray};
    font-weight: normal;
    text-decoration: line-through;
  }
  .total {
    font-size: 0.875rem;
    color: ${(props) => props.theme.color.gray};
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default SingleList;