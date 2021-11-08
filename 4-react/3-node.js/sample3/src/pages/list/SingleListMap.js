import React from "react";

//import components
import ImageSlider from "./Slider/ImageSlider";

//import styles and assets
// import styled from "styled-components";
import { Tag } from "../../components/Tags.js";

const SingleListMap = ({ room }) => {
  const truncate = (title) => {
    return title.length > 20 ? title.substring(0, 17) + "..." : title;
  };

  const discount = (price, rate) => {
    let discount = price * rate;
    return price - discount;
  };

  return (
    <Container>
      <Image>
        <ImageSlider slides={room.images} heart={room.is_wishlist} map />
      </Image>
      <Details>
        <Header>
          <Flex>
            <i
              className="fa fa-star"
              style={{ color: "red", marginRight: "0.25em" }}
            ></i>
            <div style={{ fontWeight: "bold" }}>{room.rating}</div>
            <div>({room.reviews})</div>
          </Flex>

          <div>{room.property_type}</div>

          <Title>{truncate(room.title)}</Title>
        </Header>
        <Bottom>
          <div className="price">
            {room.discount_rate > 0 ? (
              <div>
                <span className="discount">
                  <span>${room.price}</span>
                </span>
                ${discount(room.price, room.discount_rate)}
              </div>
            ) : (
              <span>${room.price}</span>
            )}
            <span style={{ fontWeight: "normal", color: "#767676" }}>/1박</span>
          </div>

          {room.discount_rate > 0 ? (
            <Tag icon="fa fa-tag" label="더 낮아진 요금" />
          ) : room.tag ? (
            <Tag icon="fa fa-diamond" label="예약이 금방 마감되는 숙소" />
          ) : (
            <div></div>
          )}
        </Bottom>
      </Details>
    </Container>
  );
};

const Container = styled.div`
  width: 275px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
`;

const Image = styled.div`
  width: 100%;
  height: 180px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`;

const Details = styled.div`
  padding: 1.5em;
`;

const Header = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.color.gray};
`;

const Title = styled.div`
  font-size: 1rem;
  color: ${(props) => props.theme.color.black};
  margin: 0.25em 0 0;
`;

const Bottom = styled.div`
  margin-top: 0.25em;
  .price {
    display: flex;
    font-size: 1.125rem;
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  .discount {
    color: ${(props) => props.theme.color.gray};
    font-weight: normal;
    text-decoration: line-through;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

export default SingleListMap;