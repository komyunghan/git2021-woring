/* eslint-disable */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import { connect } from 'react-redux'

const 박스 = styled.div`
  padding : 20px;  
`;

const 제목 = styled.h4`
  font-size : 25px;
  color : ${props => props.색상}
`;

function Detail(props) {

  const [alert, alert변경] = useState(true);
  const [inputData, inputData변경] = useState('');

  useEffect(() => {




    const 타이머 = setTimeout(() => { alert변경(false) }, 2000);
    return () => { clearTimeout(타이머) }
  }, []);


  const [infowindow, openinfowindow] = useState(false);

  const { id } = useParams();
  const 찾은상품 = props.shoes.find(function (상품) {
    return 상품.id == id
  });
  const history = useHistory();


  return (
    <div className="container">
      <박스>
        <제목 className="red">상세페이지</제목>
      </박스>

      {inputData}
      <input onChange={(e) => { inputData변경(e.target.value) }} />

      <div className="my-alert2">
        {
          alert === true
            ? (<div className="my-alert2">
              <p>재고가 얼마 남지 않았습니다</p>
            </div>)
            : null
        }
      </div>
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>


          <Info 재고={props.재고}></Info>




          <button className="btn btn-danger" onClick={() => {

            props.재고변경([9, 11, 12]);
            props.dispatch({ type: '항목추가', 데이터: { id: 찾은상품.id, name: 찾은상품.title, quan: 1 } });
            history.push('/cart');

          }}>주문하기</button>
          &nbsp;
          <button className="btn btn-danger" onClick={() => {
            history.goBack(); // 바로 직전 페이지로 이동
            // history.push('/asdfasdf') // ''안쪽 경로로 이동
          }}>뒤로가기</button>
        </div>
      </div>
    </div>
  )
}



function Info(props) {
  return (
    <p>재고 : {props.재고[0]}</p>
  )
}
function state를props화(state) {

  return {
    state: state.reducer,
    alert열렸니: state.reducer2
  }
}


export default connect(state를props화)(Detail)