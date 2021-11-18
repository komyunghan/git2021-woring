import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import router, { useRouter } from "next/router";
import { Table } from 'react-bootstrap'
import { AppDispatch, RootState } from "../../provider";
// import { requestFetchBookmarks } from "../../middleware/modules/bookmark";
import Appbar from '../../components/appbar/appbar';
import { requestRemoveBookMark } from "../../middleware/modules/BookMark";
import Data from '../../components/Map/data'
import { removeBookMark } from "../../provider/modules/BookMark";



const Bookmark = () => {
  // Bookmark state 전체를 가져옴
  const [store, setStore] = useState(Data);
  const bookmark = useSelector((state: RootState) => state.bookMark);
  const Router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const getTimeString = (unixtime: number) => {
    const day = 24 * 60 * 60 * 1000;
    const dateTime = new Date(unixtime);
    return unixtime - new Date().getTime() >= day
      ? dateTime.toLocaleDateString()
      : dateTime.toLocaleTimeString();
  };

  const handDeleteClick = (id: number) => {
    // console.log(id);
    // saga action으로 대체
    //dispatch(requestRemoveBookMark(+id)); // 전체 조회일 때
    // dispatch(requestRemovePhotoPaging(+id)); // 숫자 페이징일 때
    // dispatch(requestRemoveBookMarkNext(+id)); // 더보기 페이징일 때

    dispatch(removeBookMark(id)); // id값만 넣어서 삭제
    // history.push("/photos"); // 목록화면으로 이동
  };

  return (

    <div style={{ width: "480px" }} className="mx-auto">
      <Appbar />
      <h2 className="text-center">즐겨찾기</h2>
      <div className="d-flex justify-content-end mb-2">
      </div>
      <Table style={{ width: "480px" }}>
        <thead className="justify-content-between">
          <tr>
            <th>대표사진</th>
            <th>상호명</th>
            <th>전화번호</th>
            <th>주소</th>
            <th>예약하기</th>
          </tr>
        </thead>
        <tbody className="w-100" >
          {store.map((item: any) =>
            <tr key={`${item.id}`}>
              <th>{item.id}</th>
              <th>{item.name}</th>
              <th>{item.phoneNumber}</th>
              <th>{item.address}</th>
              <button
                onClick={() => {
                  Router.push(`/Bookmarks/detail/${item.id}`);
                }}>예약</button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  handDeleteClick(item.id);
                }}
              >
                <i className="bi bi-trash me-1" />
                삭제
              </button>
            </tr>
          )}
        </tbody>
      </Table>
    </div>

  )

};

export default Bookmark;