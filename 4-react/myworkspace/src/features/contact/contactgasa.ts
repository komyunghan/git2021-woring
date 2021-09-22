import contactReducer from "./ContactSlice";

// ---- saga action을 생성하는 부분

import { createAction } from "@reduxjs/toolkit";
import { ContactItem } from "./ContactSlice";

// contact를 추가하도록 요청하는 action
// {type:string, payload:ContactItem}
// {type:"contact/requestAddContact", payload: {title, contactUrl...}}

// ---- action creator 실행
// const item : ContactItem = {title, contactUrl}
// const sagaAction = requestAddContact(item);

// ---- 생성된 action 객체
// sagaAction > {type:"contact/requestAddContact", payload: {title, contactUrl...}}

// contact를 추가하도록 요청하는 action creator를 생성
// createAction<payload타입>(Action.type)
export const requestAddContact = createAction<ContactItem>(
  `${contactReducer.name}`
);

// photo redux state 처리와 관련된 saga action들을 감지(take)할 saga를 생성
// saga는 generator 함수로 작성

export default function* photoSaga() { }