//특정 기능을 구현하기위하여 필요한 액션과, 액션생성함수와, 초깃값과, 리듀서함수가 들어있는 이 파일을 모듈이라고 부른다.

// import { createAction, handleActions } from "redux-actions";

// 액션 타입 정의
const GET_LOCATION = "seacher/GET_LOCATION";
const GET_STARTDAY = "seacher/GET_STARTDAY";
const GET_ENDDAY = "seacher/GET_ENDDAY";
const GET_ADULTS = "seacher/GET_ADULTS";
const GET_CHILDREN = "seacher/GET_CHILDREN";
const GET_INFANTS = "seacher/GET_INFANTS";
const ADULT_INCREMENT = "seacher/ADULT_INCREMENT";
const ADULT_DECREMENT = "seacher/ADULT_DECREMENT";
const CHILDREN_INCREMENT = "seacher/CHILDREN_INCREMENT";
const CHILDREN_DECREMENT = "seacher/CHILDREN_DECREMENT";
const INFANTS_INCREMENT = "seacher/INFANTS_INCREMENT";
const INFANTS_DECREMENT = "seacher/INFANTS_DECREMENT";

// **** 액션 생섬함수 정의
// export const getLocation = (text) => ({ type: GET_LOCATION, payload: text });

export const getLocation = createAction(GET_LOCATION, (text) => text);
export const getStartDay = createAction(GET_STARTDAY, (text) => text);
export const getEndDay = createAction(GET_ENDDAY, (text) => text);
export const getAdults = createAction(GET_ADULTS, (num) => num);
export const getChildren = createAction(GET_CHILDREN, (num) => num);
export const getInfants = createAction(GET_INFANTS, (num) => num);

export const adultIncrement = createAction(ADULT_INCREMENT);
export const adultDecrement = createAction(ADULT_DECREMENT);
export const childrenIncrement = createAction(CHILDREN_INCREMENT);
export const childrenDecrement = createAction(CHILDREN_DECREMENT);
export const infantsIncrement = createAction(INFANTS_INCREMENT);
export const infantsDecrement = createAction(INFANTS_DECREMENT);

// **** 초기상태 정의
const initialState = {
  location: null,
  startDay: null,
  endDay: null,
  adults: 0,
  children: 0,
  infants: 0,
};

// **** 리듀서 작성
// export default function seacher(state = initialState, action) {
//   switch (action.type) {
//     case GET_LOCATION:
//       return {
//         ...state,
//         location: action.payload,
//       };

//     default:
//       return state;
//   }
// }

export default handleActions(
  {
    [GET_LOCATION]: (state, action) => ({
      ...state,
      location: action.payload,
    }),
    [GET_STARTDAY]: (state, action) => ({
      ...state,
      startDay: action.payload,
    }),
    [GET_ENDDAY]: (state, action) => ({
      ...state,
      endDay: action.payload,
    }),
    [GET_ADULTS]: (state, action) => ({
      ...state,
      adults: action.payload,
    }),
    [GET_CHILDREN]: (state, action) => ({
      ...state,
      children: action.payload,
    }),
    [GET_INFANTS]: (state, action) => ({
      ...state,
      infants: action.payload,
    }),
    [ADULT_INCREMENT]: (state, action) => ({
      ...state,
      adults: state.adults + 1,
    }),
    [CHILDREN_INCREMENT]: (state, action) => ({
      ...state,
      children: state.children + 1,
    }),
    [INFANTS_INCREMENT]: (state, action) => ({
      ...state,
      infants: state.infants + 1,
    }),
    [ADULT_DECREMENT]: (state, action) => ({
      ...state,
      adults: state.adults - 1,
    }),
    [CHILDREN_DECREMENT]: (state, action) => ({
      ...state,
      children: state.children - 1,
    }),
    [INFANTS_DECREMENT]: (state, action) => ({
      ...state,
      infants: state.infants - 1,
    }),
  },
  initialState
);