/* eslint-disable */
import React, { useState } from 'react';



function App() {
  const [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬독학']);
  const [따봉, 따봉변경] = useState(0);
  const [modal, modal변경] = useState(false);
  const [누른제목, 누른제목변경] = useState(0);
  const [입력값, 입력값변경] = useState('');





  const posts = '강남 고기 맛집';

  // function 제목변경() {
  //   const newArray = [...글제목];
  //   newArray[0] = '여자 코트 추천';
  //   글제목변경(newArray);
  // }


  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>

      {
        글제목.map(function (글, i) {
          return (
            <div className="list" key={i}>
              <h3 onClick={() => { 누른제목변경(i) }}>{글}<span onClick={() => { 따봉변경(따봉 + 1) }}>👍</span>
                {따봉}</h3>
              <p>2월 18일 발행</p>
              <hr />
            </div>
          )
        })
      }

      <div className="publish">
        <input onChange={(e) => { 입력값변경(e.target.value) }} />
        <button onClick={() => {
          const arrayCopy = [...글제목];
          arrayCopy.unshift(입력값);
          글제목변경(arrayCopy);
        }}>저장</button>
      </div>





      <button onClick={() => { modal변경(!modal) }}>열고닫기</button>

      {
        modal === true
          ? <Modal 자식글제목={글제목} 자식누른제목={누른제목}></Modal>
          : null
      }


    </div >
  );
}

function Modal(props: any) {
  return (
    <div className="modal">
      <h2>{props.자식글제목[props.자식누른제목]}</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;
