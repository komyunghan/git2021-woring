import photoReducer from "./PhotoSlice";

// ---- saga action을 생성하는 부분

import { createAction } from "@reduxjs/toolkit";
import { PhotoItem } from "./PhotoSlice";

// photo를 추가하도록 요청하는 action
// {type:string, payload:PhotoItem}
// {type:"photo/requestAddPhoto", payload: {title, photoUrl...}}

// ---- action creator 실행
// const item : PhotoItem = {title, photoUrl}
// const sagaAction = requestAddPhoto(item);

// ---- 생성된 action 객체
// sagaAction > {type:"photo/requestAddPhoto", payload: {title, photoUrl...}}

// photo를 추가하도록 요청하는 action creator를 생성
// createAction<payload타입>(Action.type)
export const requestAddPhoto = createAction<PhotoItem>(
  `${photoReducer.name}`
);

// photo redux state 처리와 관련된 saga action들을 감지(take)할 saga를 생성
// saga는 generator 함수로 작성

export default function* photoSaga() { }