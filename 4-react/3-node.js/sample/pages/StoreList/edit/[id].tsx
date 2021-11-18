import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../../provider";
import { requestModifyBookMark } from "../../../middleware/modules/BookMark";
import { BookMarkItem } from "../../../provider/modules/BookMark";
import bookMarkApi, { BookMarkItemResponse } from "../../../api/BookMark";

import Layout from "../../../components/layout";

const BookMarkEdit = () => {
  const router = useRouter();

  const id = router.query.id as string;

  const bookMarkItem = useSelector((state: RootState) =>
    state.bookMark.data.find((item) => item.id === +id)
  );
  // console.log(bookMarkItem);

  const isModifyCompleted = useSelector(
    (state: RootState) => state.bookMark.isModifyCompleted
  );

  const dispatch = useDispatch<AppDispatch>();


  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    isModifyCompleted && router.push("/StoreList");
  }, [isModifyCompleted, router]);

  // ------ 이벤트에 대해서 처리하는 부분 --------
  const changeFile = () => {
    console.log("change");
  };

  const handleSaveClick = () => {
    // 파일이 있을 때 처리
    // 파일이 없을 때 처리

    const saveItem = (item: BookMarkItem) => {
      // dispatch(modifyBookMark(item));
      dispatch(requestModifyBookMark(item)); // saga action으로 대체
      // history.push("/BookMarks");
    };

    return (
      <Layout>
        <section style={{ width: "40vw" }} className="mx-auto">
          <h2 className="text-center">BookMark Edit</h2>
          <form>
            <table className="table">
              <tbody>
                <tr>
                  <th>제목</th>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      defaultValue={bookMarkItem?.name}
                      ref={nameInput}
                    />
                  </td>
                </tr>
                <tr>
                  <th>설명</th>
                  <td>
                  </td>
                </tr>
                <tr>
                  <th>이미지</th>
                  <td>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <div>
            <button
              className="btn btn-secondary me-1 float-start"
              onClick={() => {
                router.push("/StoreList");
              }}
            >
              <i className="bi bi-grid-3x3-gap me-1"></i>
              목록
            </button>
            <button
              className="btn btn-primary float-end"
              onClick={() => {
                handleSaveClick();
              }}
            >
              <i className="bi bi-check" />
              저장
            </button>
          </div>
        </section>
      </Layout>
    );
  };

  export default BookMarkEdit;
