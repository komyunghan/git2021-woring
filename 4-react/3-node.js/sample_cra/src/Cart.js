/* eslint-disable */
import React from 'react'
import { Table } from 'react-bootstrap'
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses'
import { connect, useDispatch, useSelector } from 'react-redux'

function Cart(props) {

  const state = useSelector((state) => state)
  console.log(state.reducer)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <Table responsive>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
          {state.reducer.map((a, i) => {
            return (
              <tr key={i}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.quan}</td>
                <td><button onClick={() => { dispatch({ type: '수량증가', 데이터: a.id }) }}> + </button></td>
                <td><button onClick={() => { dispatch({ type: '수량감소', 데이터: a.id }) }}> - </button></td>
              </tr>
            )
          })}
        </Table>
        {props.alert열렸니 === true
          ? <div className="my-alert2">
            <p>지금 구매하시면 신규할인 20%</p>
            <button onClick={() => { dispatch({ type: 'alert닫기' }) }}>닫기</button>
          </div>
          : null
        }
      </div>
    </div>
  )
}

// function state를props화(state) {

//   return {
//     state: state.reducer,
//     alert열렸니: state.reducer2
//   }
// }


// export default connect(state를props화)(Cart)

export default Cart;