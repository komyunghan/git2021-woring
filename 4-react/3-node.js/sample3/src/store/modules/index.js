import { combineReducers } from "redux";
import seacher from "./seacher";
import user from "./user";

export default combineReducers({
  seacher,
  user,
  // 다른 리듀서를 만들게되면 여기에 넣어줌..
});