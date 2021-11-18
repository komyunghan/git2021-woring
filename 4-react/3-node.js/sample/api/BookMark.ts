import axios from "axios";
import { createAxiosInstance } from "./_request";

export interface BookMarkPagingReponse {
  content: BookMarkItemResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// 서버로 부터 받아오는 데이터 1건에 대한 타입
export interface BookMarkItemResponse {
  id: number;
  title: string;
  description: string;
  fileType: string;
  fileName: string;
  createdTime: number;
}

export interface BookMarkItemRequest {
  title: string;
  description?: string;
  fileType: string;
  fileName: string;
}

// 서버하고 데이터 연동하는 api처리 목록을 별도의 객체로 작성
// process.env.변수명
const bookMarkApi = {
  get: (id: number) =>
    createAxiosInstance().get<BookMarkItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/StoreList/${id}`
    ),
  // axios.get<응답데이터의타입>(요청URL);
  // GET 요청URL HTTP/1.1
  fetch: () =>
    createAxiosInstance().get<BookMarkItemResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/StoreList`
    ),

  fetchPaging: (page: number, size: number) =>
    createAxiosInstance().get<BookMarkPagingReponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/StoreList/paging?page=${page}&size=${size}`
    ),

  // axios.post<응답타입>(요청URL, 요청객체(JSON바디));
  // POST 요청URL HTTP/1.1  {...}
  add: (bookMarkItem: BookMarkItemRequest) =>
    createAxiosInstance().post<BookMarkItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/StoreList`,
      bookMarkItem
    ),
  // axios.delete<응답타입>(요청URL);
  // DELETE 요청URL HTTP/1.1
  remove: (id: number) =>
    createAxiosInstance().delete<boolean>(
      `${process.env.NEXT_PUBLIC_API_BASE}/StoreList/${id}`
    ),

  // axios.PUT<응답타입>(요청URL, 요청객체(JSON바디));
  // PUT 요청URL HTTP/1.1  {...}
  modify: (id: number, bookMarkItem: BookMarkItemRequest) =>
    createAxiosInstance().put<BookMarkItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/StoreList/${id}`,
      bookMarkItem
    ),
};

export default bookMarkApi;
