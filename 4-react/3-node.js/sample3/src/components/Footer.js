// import styled, { css } from "styled-components";

import React from "react";

export const Footer = () => {
  return (
    <Background>
      <FooterWrapper>
        <FooterTop>
          <section>
            <h4>소개</h4>
            <ul>
              <div>
                <li>다양성 및 소속감</li>
              </div>
              <div>
                <li>접근성</li>
              </div>
              <div>
                <li>신뢰와 안전</li>
              </div>
              <div>
                <li>Airbnb Citizen</li>
              </div>
              <div>
                <li>올림픽</li>
              </div>
              <div>
                <li>뉴스룸</li>
              </div>
            </ul>
          </section>
          <section>
            <h4>커뮤니티</h4>
            <ul>
              <div>
                <li>에어비앤비 매거진</li>
              </div>
              <div>
                <li>에어비앤비 어소시에이트</li>
              </div>
              <div>
                <li>에어비앤비 비즈니스 프로그램</li>
              </div>
              <div>
                <li>친구 초대하기</li>
              </div>
              <div>
                <li>채용정보</li>
              </div>
            </ul>
          </section>
          <section>
            <h4>호스팅하기</h4>
            <ul>
              <div>
                <li>숙소 호스팅</li>
              </div>
              <div>
                <li>온라인 체험 호스팅하기</li>
              </div>
              <div>
                <li>브라이언 체스키 CEO의 메시지</li>
              </div>
              <div>
                <li>책임감 있는 호스팅</li>
              </div>
              <div>
                <li>Open Homes</li>
              </div>
              <div>
                <li>자료 센터</li>
              </div>
              <div>
                <li>커뮤니티 센터</li>
              </div>
            </ul>
          </section>
          <section>
            <h4>에어비앤비 지원</h4>
            <ul>
              <div>
                <li>코로나19 관련 업데이트</li>
              </div>
              <div>
                <li>도움말 센터</li>
              </div>
              <div>
                <li>예약 취소 옵션</li>
              </div>
              <div>
                <li>에어비앤비 이웃 민원 지원</li>
              </div>
            </ul>
          </section>
        </FooterTop>
        <FooterBtm>
          <span>© 2020 Airbnb, Inc. All rights reserved</span>
          <span>개인정보 처리방침</span>
          <span>이용약관</span>
          <span>사이트맵</span>
          <span>한국의 변경된 환불 정책</span>
        </FooterBtm>
      </FooterWrapper>
    </Background>
  );
};

export default Footer;

//styled-components

const FooterWrapper = styled.footer`
  width: 100%;
  max-width: 1760px;
  min-width: 1000px;
  padding: 0 80px;
  margin: 0 auto; /*메인에서만 적용*/
`;

const FooterTop = styled.div`
  margin: 50px auto;
  display: flex;
   {
    @media only screen and (max-width: 1000px) {
      flex-direction: column;
    }
  }
  section {
    width: 25%;
     {
      @media only screen and (max-width: 1000px) {
        width: 100%;
      }
    }
    h4 {
      color: ${(props) => props.theme.color.black};
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 22px;
    }
    ul {
      color: ${(props) => props.theme.color.gray};
      font-size: 14px;
       {
        @media only screen and (max-width: 1000px) {
          width: 100vw;
          display: flex;
          flex-wrap: wrap;
          border-bottom: 1px solid #dddddd;
          margin-bottom: 40px;
        }
      }
      li {
        margin-bottom: 18px;
        cursor: pointer;
        @media only screen and (max-width: 1000px) {
          flex-wrap: wrap;
          width: 24vw;
        }
        @media only screen and (max-width: 820px) {
          width: 50vw;
        }
      }
    }
  }
`;

const FooterBtm = styled.div`
  border-top: 1px solid #dddddd;
  font-size: 14px;
  color: ${(props) => props.theme.color.black};
  padding: 24px 0;
  span {
    margin-right: 28px;
  }
`;

const Background = styled.div`
  width: 100%;
  background-color: #f7f7f7;
  border-top: 1px solid #dddddd;
  bottom: 0;
  overflow-x: hidden;
`;