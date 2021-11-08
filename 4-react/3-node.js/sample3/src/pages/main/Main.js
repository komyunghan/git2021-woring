import React, { useEffect, useState } from "react";

import Footer from "../../components/Footer";
import MainItem from "./MainItem";
import Nav from "../../components/Nav";
import Search from "./Search";
import img1 from "../../../src/images/1.png";
import img2 from "../../../src/images/2.png";
import img3 from "../../../src/images/3.png";
import img4 from "../../../src/images/4.png";
// import styled from "styled-components";

const Main = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const list = items.map((item) => (
    <MainItem title={item.title} desc={item.desc} img={item.img} />
  ));

  return (
    <div>
      <Nav />
      <MainWrapper>
        <Tab>
          <span>숙소</span>
          <span>장기 숙박</span>
          <span>체험</span>
          <span>온라인 체험</span>
        </Tab>
        <Search />
        <Paragraph>
          가까운 여행지, 에어비앤비와
          <br /> 탐험해보세요.
        </Paragraph>
        <List>{list}</List>
      </MainWrapper>
      <Footer />
    </div>
  );
};

export default Main;

const items = [
  {
    title: "가까운 여행지",
    desc: "자동차로 금방 다녀올 수 잇는 근교 여행지에서 휴식을 즐기세요",
    img: img1,
  },
  {
    title: "온라인 체험",
    desc: "세계 각지의 호스트가 보여주는 특별한 세상",
    img: img2,
  },
  {
    title: "나만의 공간",
    desc:
      "일행만을 위한 편안한 공간에서 친구 및 가족과 오붓한 시간을 보내세요.",
    img: img3,
  },
  {
    title: "장기 숙박",
    desc: "한 달 이상 장기 숙박할 숙소를 에어비앤비에서 찾아보세요.",
    img: img4,
  },
];

//styled-components

const MainWrapper = styled.div`
  padding: 0px 80px;
  max-width: 1760px;
  /* min-width: 1000px; */
  margin: 0 auto;
  @media only screen and (max-width: 1000px) {
    overflow-x: hidden;
    padding: 0px 50px;
  }
`;

const Tab = styled.div`
  display: flex;
  margin: 30px 0 16px 0;
  span {
    margin-right: 23px;
  }
  span:nth-child(1) {
    border-bottom: solid 2px ${(props) => props.theme.color.black};
    padding-bottom: 6px;
  }
`;

const Paragraph = styled.p`
  font-size: 44px;
  background: linear-gradient(
    to right,
    rgb(146, 23, 77) 10%,
    rgb(228, 29, 92) 20%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 58px;
  margin-bottom: 60px;
`;

const List = styled.div`
  display: flex;
  margin-bottom: 70px;
  width: 100%;
  max-width: 1760px;
  min-width: 1000px;
`;