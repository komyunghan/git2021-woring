import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../../provider";
import {
  requestFetchBookMarkItem,
  requestRemoveBookMarkNext,
  requestRemoveBookMarkPaging,
} from "../../../middleware/modules/BookMark";
// import { removebookMark } from "./bookMarkSlice";

import Layout from "../../../components/layout";
import { BookMarkItem } from "../../../provider/modules/BookMark";

const BookMarkDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // /BookMarks/detail/[id]
  const id = router.query.id as string;
  console.log(id);

  let bookMarkItem = useSelector((state: RootState) =>
    state.bookMark.data.find((item) => item.id === +id)
  );

  if (id) {
    // redux에 데이터가 없으면
    if (!bookMarkItem) {
      // 1건에 데이터를 가져와 store에 추가함
      dispatch(requestFetchBookMarkItem(+id));
    }
  }

  // 삭제 여부 감지 및 가져오기
  const isRemoveCompleted = useSelector(
    (state: RootState) => state.bookMark.isRemoveCompleted
  );

  useEffect(() => {
    isRemoveCompleted && router.push("/bookMarks");
  }, [isRemoveCompleted, router]);

  const handDeleteClick = () => {
    // saga action으로 대체
    // dispatch(requestRemovebookMark(+id)); // 전체 조회일 때
    // dispatch(requestRemovebookMarkPaging(+id)); // 숫자 페이징일 때
    dispatch(requestRemoveBookMarkNext(+id)); // 더보기 페이징일 때

    // dispatch(removeBookMark(+id)); // id값만 넣어서 삭제
    // history.push("/BookMarks"); // 목록화면으로 이동
  };

  return (
    <Layout>
      <section style={{ width: "40vw" }} className="mx-auto">
        <h2 className="text-center">BookMark Detail</h2>
        {!bookMarkItem && (
          <div className="text-center my-5">데이터가 없습니다.</div>
        )}
        {bookMarkItem && (
          <table className="table">
            <tbody>
              <tr>
                <th>제목</th>
                <td>{bookMarkItem.title}</td>
              </tr>
              <tr>
                <th>설명</th>
                <td>{bookMarkItem.description}</td>
              </tr>
              <tr>
                <th>이미지</th>
                <td>
                  <img
                    src={bookMarkItem.bookMarkUrl}
                    alt={bookMarkItem.title}
                    width={"100%"}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        )}

        <div className="d-flex">
          <div style={{ width: "50%" }}>
            <button
              className="btn btn-secondary me-1"
              onClick={() => {
                router.push("/bookMarks");
              }}
            >
              <i className="bi bi-grid-3x3-gap me-1"></i>
              목록
            </button>
          </div>
          <div style={{ width: "50%" }} className="d-flex justify-content-end">
            <button
              className="btn btn-primary me-1"
              onClick={() => {
                router.push(`/bookMarks/edit/${id}`);
              }}
            >
              <i className="bi bi-pencil me-1" />
              수정
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handDeleteClick();
              }}
            >
              <i className="bi bi-trash me-1" />
              삭제
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BookMarkDetail;
