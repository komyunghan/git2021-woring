import listReducer, {
  addList,
  initialCompleted,
  initialNextList,
  initialPagedList,
  initialList,
  initialListItem,
  modifyList,
  ListPage,
  removeList,
} from "../../provider/modules/list";
import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ListItem } from "../../provider/modules/list";
import {
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "@redux-saga/core/effects";
import api, {
  ListItemRequest,
  ListItemResponse,
  ListPagingReponse,
} from "../../api/list";
import { AxiosResponse } from "axios";
import { endProgress, startProgress } from "../../provider/modules/progress";
import { addAlert } from "../../provider/modules/alert";
import { RootState } from "../../provider";

/* ========= saga action Payload 타입 =============== */
export interface PageRequest {
  page: number;
  size: number;
}

/* ========= saga action을 생성하는 부분 =============== */

// list를 추가하도록 요청하는 action
// {type:string, payload:listItem}
// {type:"list/requestAddlist", payload: {title, listUrl...}}

// list를 추가하도록 요청하는 action creator를 생성
// const actionCreator = createAction<Payload타입>(Action.type문자열)
// 전체 데이터 조횡에서 추가할 때
export const requestAddList = createAction<ListItem>(
  `${listReducer.name}/requestAddList`
);

// 숫자 페이징에서 추가할 때
export const requestAddListPaging = createAction<ListItem>(
  `${listReducer.name}/requestAddListPaging`
);

// 더보기 페이징에서 추가할 때
export const requestAddListNext = createAction<ListItem>(
  `${listReducer.name}/requestAddListNext`
);

// List를 가져오는 action
export const requestFetchLists = createAction(
  `${listReducer.name}/requestFetchlists`
);

// List를 페이징으로 가져오는 action
export const requestFetchPagingLists = createAction<PageRequest>(
  `${listReducer.name}/requestFetchPaginglists`
);

// 다음 페이지 List를 가져오는 action
export const requestFetchNextLists = createAction<PageRequest>(
  `${listReducer.name}/requestFetchNextlists`
);

// 1건의 List만 가져오는 action
export const requestFetchListItem = createAction<number>(
  `${listReducer.name}/requestFetchListItem`
);

// List를 삭제하는 action
export const requestRemoveList = createAction<number>(
  `${listReducer.name}/requestRemoveList`
);

// List를 삭제하는 action(숫자페이징일때)
export const requestRemoveListPaging = createAction<number>(
  `${listReducer.name}/requestRemoveListPaging`
);

// List를 삭제하는 action(더보기페이징일때)
export const requestRemoveListNext = createAction<number>(
  `${listReducer.name}/requestRemoveListNext`
);

// List를 수정하는 action
export const requestModifyList = createAction<ListItem>(
  `${listReducer.name}/requestModifyList`
);

/* ========= saga action을 처리하는 부분 =============== */

// 서버에 POST로 데이터를 보내 추가하고, redux state를 변경
function* addDataPaging(action: PayloadAction<ListItem>) {
  yield console.log("--addDataPaging--");
  yield console.log(action);

  try {
    // action의 payload로 넘어온 객체
    const listItemPayload = action.payload;

    // rest api로 보낼 요청객체
    const listItemRequest: ListItemRequest = {
      title: listItemPayload.title,
      // title: "", // 임시로 에러 유발(400)
      description: listItemPayload.description,
      listUrl: listItemPayload.listUrl,
      fileType: listItemPayload.fileType,
      fileName: listItemPayload.fileName,
    };

    // ------ 1. rest api에 post로 데이터 보냄
    // call(함수, 매개변수1, 매개변수2...) -> 함수를 호출함

    // spinner 보여주기
    yield put(startProgress());
    // 함수가 Promise를 반환하면, (비동기함수)
    // Saga 미들웨어에서 현재 yield에 대기상태로 있음
    // Promise가 resolve(처리완료)되면 다음 yield로 처리가 진행됨
    // reject(거부/에러)되면 예외를 던짐(throw) -> try ... catch문으로 받을 수 있음.

    // await api.add(listItemRequest) 이 구문과 일치함
    // 결과값을 형식을 지졍해야함
    const result: AxiosResponse<ListItemResponse> = yield call(
      api.add,
      listItemRequest
    );

    // spinner 사라지게 하기
    yield put(endProgress());

    // ------ 2. redux state를 변경함
    // **2021-09-28- 페이징 처리 추가 로직
    // 추가하기전에 현재 페이지의 가장 마지막 데이터를 삭제
    // redux state 조회하기
    const listData: ListItem[] = yield select(
      (state: RootState) => state.list.data
    );
    // 현재 데이터가 있으면
    if (listData.length > 0) {
      // 가장 마지막 요소의 id값을 가져오고 삭제함
      const deleteId = listData[listData.length - 1].id;
      yield put(removeList(deleteId));
    }

    // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
    const listItem: ListItem = {
      id: result.data.id,
      title: result.data.title,
      description: result.data.description,
      listUrl: result.data.listUrl,
      fileType: result.data.fileType,
      fileName: result.data.fileName,
      createdTime: result.data.createdTime,
    };

    // dispatcher(액션)과 동일함
    // useDispatch로 dispatcher 만든 것은 컴포넌트에서만 가능
    // put이펙트를 사용함
    yield put(addList(listItem));

    // completed 속성 삭제
    yield put(initialCompleted());

    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "success", message: "저장되었습니다." })
    );
  } catch (e: any) {
    // 에러발생
    // spinner 사라지게 하기
    yield put(endProgress());
    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}

function* addDataNext(action: PayloadAction<ListItem>) {
  yield console.log("--addDataNext--");
  yield console.log(action);

  try {
    // action의 payload로 넘어온 객체
    const listItemPayload = action.payload;

    // rest api로 보낼 요청객체
    const listItemRequest: ListItemRequest = {
      title: listItemPayload.title,
      // title: "", // 임시로 에러 유발(400)
      description: listItemPayload.description,
      listUrl: listItemPayload.listUrl,
      fileType: listItemPayload.fileType,
      fileName: listItemPayload.fileName,
    };

    // ------ 1. rest api에 post로 데이터 보냄
    // call(함수, 매개변수1, 매개변수2...) -> 함수를 호출함

    // spinner 보여주기
    yield put(startProgress());
    // 함수가 Promise를 반환하면, (비동기함수)
    // Saga 미들웨어에서 현재 yield에 대기상태로 있음
    // Promise가 resolve(처리완료)되면 다음 yield로 처리가 진행됨
    // reject(거부/에러)되면 예외를 던짐(throw) -> try ... catch문으로 받을 수 있음.

    // await api.add(listItemRequest) 이 구문과 일치함
    // 결과값을 형식을 지졍해야함
    const result: AxiosResponse<ListItemResponse> = yield call(
      api.add,
      listItemRequest
    );

    // spinner 사라지게 하기
    yield put(endProgress());

    // ------ 2. redux state를 변경함
    // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
    const listItem: ListItem = {
      id: result.data.id,
      title: result.data.title,
      description: result.data.description,
      listUrl: result.data.listUrl,
      fileType: result.data.fileType,
      fileName: result.data.fileName,
      createdTime: result.data.createdTime,
    };

    // dispatcher(액션)과 동일함
    // useDispatch로 dispatcher 만든 것은 컴포넌트에서만 가능
    // put이펙트를 사용함
    yield put(addList(listItem));

    // completed 속성 삭제
    yield put(initialCompleted());

    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "success", message: "저장되었습니다." })
    );
  } catch (e: any) {
    // 에러발생
    // spinner 사라지게 하기
    yield put(endProgress());
    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}

// Redux 사이드 이펙트
// 1. api 연동
// 2. 파일처리
// 3. 처리중 메시지 보여주기/감추기
// 4. 에러메시지 띄우기
// 서버에서 GET으로 데이터를 가저오고, redux state를 초기화
function* fetchData() {
  yield console.log("--fetchData--");

  // spinner 보여주기
  yield put(startProgress());

  // 백엔드에서 데이터 받아오기
  const result: AxiosResponse<ListItemResponse[]> = yield call(api.fetch);

  // spinner 사라지게 하기
  yield put(endProgress());

  // 응답데이터배열을 액션페이로드배열로 변환
  // ListItemReponse[] => ListItem[]
  const lists = result.data.map(
    (item) =>
    ({
      id: item.id,
      title: item.title,
      description: item.description,
      listUrl: item.listUrl,
      fileType: item.fileType,
      fileName: item.fileName,
      createdTime: item.createdTime,
    } as ListItem)
  );

  // state 초기화 reducer 실행
  yield put(initialList(lists));
}

function* fetchPagingData(action: PayloadAction<PageRequest>) {
  yield console.log("--fetchPagingData--");

  const page = action.payload.page;
  const size = action.payload.size;

  localStorage.setItem("list_page_size", size.toString());

  // spinner 보여주기
  yield put(startProgress());

  try {
    // 백엔드에서 데이터 받아오기
    const result: AxiosResponse<ListPagingReponse> = yield call(
      api.fetchPaging,
      page,
      size
    );

    // spinner 사라지게 하기
    yield put(endProgress());

    // 받아온 페이지 데이터를 Payload 변수로 변환
    const listPage: ListPage = {
      // 응답데이터배열을 액션페이로드배열로 변환
      // ListItemReponse[] => ListItem[]
      data: result.data.content.map(
        (item) =>
        ({
          id: item.id,
          title: item.title,
          description: item.description,
          listUrl: item.listUrl,
          fileType: item.fileType,
          fileName: item.fileName,
          createdTime: item.createdTime,
        } as ListItem)
      ),
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      page: result.data.number,
      pageSize: result.data.size,
      isLast: result.data.last,
    };

    // state 초기화 reducer 실행
    yield put(initialPagedList(listPage));
  } catch (e: any) {
    // 에러발생
    // spinner 사라지게 하기
    // yield put(endProgress());
    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}

function* fetchNextData(action: PayloadAction<PageRequest>) {
  yield console.log("--fetchNextData--");

  const page = action.payload.page;
  const size = action.payload.size;

  // spinner 보여주기
  yield put(startProgress());

  try {
    // 백엔드에서 데이터 받아오기
    const result: AxiosResponse<ListPagingReponse> = yield call(
      api.fetchPaging,
      page,
      size
    );

    // spinner 사라지게 하기
    yield put(endProgress());

    // 받아온 페이지 데이터를 Payload 변수로 변환
    const listPage: ListPage = {
      // 응답데이터배열을 액션페이로드배열로 변환
      // ListItemReponse[] => ListItem[]
      data: result.data.content.map(
        (item) =>
        ({
          id: item.id,
          title: item.title,
          description: item.description,
          listUrl: item.listUrl,
          fileType: item.fileType,
          fileName: item.fileName,
          createdTime: item.createdTime,
        } as ListItem)
      ),
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      page: result.data.number,
      pageSize: result.data.size,
      isLast: result.data.last,
    };

    // state 초기화 reducer 실행
    yield put(initialNextList(listPage));
  } catch (e: any) {
    // 에러발생
    // spinner 사라지게 하기
    yield put(endProgress());
    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}

// 1건의 데이터만 조회
function* fetchDataItem(action: PayloadAction<number>) {
  yield console.log("--fetchDataItem--");

  const id = action.payload;

  // 백엔드에서 데이터 받아오기
  const result: AxiosResponse<ListItemResponse> = yield call(api.get, id);

  const list = result.data;

  // state 초기화 reducer 실행
  yield put(initialListItem(list));
}

function* removeDataPaging(action: PayloadAction<number>) {
  yield console.log("--removeData--");

  // id값
  const id = action.payload;

  // spinner 보여주기
  yield put(startProgress());

  // rest api 연동
  const result: AxiosResponse<boolean> = yield call(api.remove, id);

  // spinner 사라지게 하기
  yield put(endProgress());

  // 반환 값이 true이면
  if (result.data) {
    // state 변경(1건삭제)
    yield put(removeList(id));
  } else {
    // alert박스를 추가해줌
    yield put(
      addAlert({
        id: nanoid(),
        variant: "danger",
        message: "오류로 저장되지 않았습니다.",
      })
    );
  }

  // completed 속성 삭제
  yield put(initialCompleted());

  // 현재 페이지 데이터를 다시 가져옴
  // 현재 페이지와 사이즈 값을 읽어옴
  const page: number = yield select((state: RootState) => state.list.page);
  const size: number = yield select((state: RootState) => state.list.pageSize);

  yield put(requestFetchPagingLists({ page, size }));
}

function* removeDataNext(action: PayloadAction<number>) {
  yield console.log("--removeDataNext--");

  // id값
  const id = action.payload;

  // spinner 보여주기
  yield put(startProgress());

  // rest api 연동
  const result: AxiosResponse<boolean> = yield call(api.remove, id);

  // spinner 사라지게 하기
  yield put(endProgress());

  // 반환 값이 true이면
  if (result.data) {
    // state 변경(1건삭제)
    yield put(removeList(id));
  } else {
    // alert박스를 추가해줌
    yield put(
      addAlert({
        id: nanoid(),
        variant: "danger",
        message: "오류로 저장되지 않았습니다.",
      })
    );
  }

  // completed 속성 삭제
  yield put(initialCompleted());
}

function* modifyData(action: PayloadAction<ListItem>) {
  yield console.log("--modifyData--");

  // action의 payload로 넘어온 객체
  const listItemPayload = action.payload;

  // rest api로 보낼 요청객체
  const listItemRequest: ListItemRequest = {
    title: listItemPayload.title,
    description: listItemPayload.description,
    listUrl: listItemPayload.listUrl,
    fileType: listItemPayload.fileType,
    fileName: listItemPayload.fileName,
  };

  // // spinner 보여주기
  yield put(startProgress());
  console.log("--sprinner--");

  const result: AxiosResponse<ListItemResponse> = yield call(
    api.modify,
    listItemPayload.id,
    listItemRequest
  );

  // // spinner 사라지게 하기
  yield put(endProgress());

  // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
  const listItem: ListItem = {
    id: result.data.id,
    title: result.data.title,
    description: result.data.description,
    listUrl: result.data.listUrl,
    fileType: result.data.fileType,
    fileName: result.data.fileName,
    createdTime: result.data.createdTime,
  };

  // state 변경
  yield put(modifyList(listItem));

  // completed 속성 삭제
  yield put(initialCompleted());
}

/* ========= saga action을 감지(take)하는 부분 =============== */
// list redux state 처리와 관련된 saga action들을 감지(take)할 saga를 생성
// saga는 generator 함수로 작성
export default function* listsaga() {
  // takeEvery(처리할액션, 액션을처리할함수)
  // 동일한 타입의 액션은 모두 처리함
  yield takeEvery(requestAddList, addDataNext);
  yield takeEvery(requestAddListPaging, addDataPaging);
  yield takeEvery(requestAddListNext, addDataNext);

  // takeLatest(처리할액션, 액션을처리할함수)
  // 동일한 타입의 액션중에서 가장 마지막 액션만 처리, 이전 액션은 취소

  // 1건의 데이터만 조회
  yield takeEvery(requestFetchListItem, fetchDataItem);
  yield takeLatest(requestFetchLists, fetchData);
  yield takeLatest(requestFetchPagingLists, fetchPagingData);
  yield takeLatest(requestFetchNextLists, fetchNextData);

  // 삭제처리
  yield takeEvery(requestRemoveList, removeDataNext);
  yield takeEvery(requestRemoveListPaging, removeDataPaging);
  yield takeEvery(requestRemoveListNext, removeDataNext);

  // 수정처리
  yield takeEvery(requestModifyList, modifyData);
}
