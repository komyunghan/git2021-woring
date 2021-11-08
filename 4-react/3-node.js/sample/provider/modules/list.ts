import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { penguin } from "../../common/data";

// - 목록조회: 4열 그리드화면으로 목록조회(프로필, 타이틀, 이미지)
// - 사진추가: 추가버튼으로 제목, 설명, 이미지파일 선택 후 추가, 목록버튼

// 데이터구조를 interface로 만듦
export interface ListItem {
  id: number;
  title: string;
  description?: string;
  listUrl: string;
  fileType: string;
  fileName: string;
  createdTime: number;
}

export interface ListPage {
  data: ListItem[];
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast: boolean;
}

// 백엔드 연동 고려해서 state 구조를 설계
interface ListState {
  data: ListItem[]; // 포토 아이템 배열
  isFetched: boolean; // 서버에서 데이터를 받아왔는지에 대한 여부
  isAddCompleted?: boolean; // 데이터 추가가 완료되었는지 여부
  isRemoveCompleted?: boolean; // 데이터 삭제가 완료되었는지 여부
  isModifyCompleted?: boolean; // 데이터 수정이 완료되었는지 여부
  totalElements?: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast?: boolean;
}

// const ListPageSize = localStorage.getItem("List_page_size");

// List state를 목록 -> array
const initialState: ListState = {
  data: [],
  isFetched: false,
  page: 0,
  // pageSize: ListPageSize ? +ListPageSize : 8,
  pageSize: 8,
  totalPages: 0,
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    // PayloadAction<payload타입>
    // payload로 item객체를 받음
    addList: (state, action: PayloadAction<ListItem>) => {
      const list = action.payload;
      console.log("--in reducer function--");
      console.log(list);
      state.data.unshift(list);
      state.isAddCompleted = true; // 추가가 되었음으로 표시
    },
    // payload 없는 reducer
    // completed 관련된 속성을 삭제함(undefined 상태)
    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },
    // payload로 id값을 받음
    // action: PayloadAction<number>
    // reducer 넘어오는 action은 payload있는 액션인데,
    // payload의 타입이 number이다.
    removeList: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      // id에 해당하는 아이템의 index를 찾고 그 index로 splice를 한다.
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
      state.isRemoveCompleted = true; // 삭제 되었음을 표시
    },
    modifyList: (state, action: PayloadAction<ListItem>) => {
      // 생성해서 넘긴 객체
      const modifyItem = action.payload;
      // state에 있는 객체
      const listItem = state.data.find((item) => item.id === modifyItem.id);
      // state에 있는 객체의 속성을 넘김 객체의 속성으로 변경
      if (listItem) {
        listItem.title = modifyItem.title;
        listItem.description = modifyItem.description;
        listItem.listUrl = modifyItem.listUrl;
        listItem.fileName = modifyItem.fileName;
        listItem.fileType = modifyItem.fileType;
      }
      state.isModifyCompleted = true; // 변경 되었음을 표시
    },
    initialListItem: (state, action: PayloadAction<ListItem>) => {
      const list = action.payload;
      // 백엔드에서 받아온 데이터
      state.data = [{ ...list }];
    },
    // payload값으로 state를 초기화하는 reducer 필요함
    initialList: (state, action: PayloadAction<ListItem[]>) => {
      const lists = action.payload;
      // 백엔드에서 받아온 데이터
      state.data = lists;
      // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
    // payload값으로 state를 초기화하는 reducer 필요함
    initialPagedList: (state, action: PayloadAction<ListPage>) => {
      // 백엔드에서 받아온 데이터
      // 컨텐트
      state.data = action.payload.data;
      // 페이징 데이터
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
      // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
    initialNextList: (state, action: PayloadAction<ListPage>) => {
      // 백엔드에서 받아온 데이터를 기존데이터 뒤로 합침
      // 컨텐트
      state.data = state.data.concat(action.payload.data);
      // 페이징 데이터
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
      // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
  },
});

// action creator 내보내기: action creator는 action객체를 반환하는 함수
export const {
  addList,
  removeList,
  modifyList,
  initialListItem,
  initialList,
  initialCompleted,
  initialPagedList,
  initialNextList,
} = listSlice.actions;

export default listSlice.reducer;
