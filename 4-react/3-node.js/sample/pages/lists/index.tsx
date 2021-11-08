import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
// import Pagination from "../../components/pagination";
import { AppDispatch, RootState } from "../../provider";
import {
  requestFetchNextLists,
  requestFetchPagingLists,
} from "../../middleware/modules/list";

import { getTimeString } from "../../lib/string";

import Layout from "../../components/layout";

const List = () => {
  // list state 전체를 가져옴
  const list = useSelector((state: RootState) => state.list);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // const [currentPage, setCurrentPage] = useState<number>(0);

  // list.isFetched를 가져올때와 바뀔때마다 실행됨
  // **dispatch 객체는 위에서 생성된 후 바뀌지 않으므로
  // **dispatch 객체에 따른 effect가 발생하지는 않음
  useEffect(() => {
    // console.log(dispatch);
    // console.log(list.isFetched);
    // 데이터 fetch가 안되었으면 데이터를 받아옴
    if (!list.isFetched) {
      // 서버에서 데이터를 받아오는 action을 디스패치함
      // dispatch(requestFetchLists());

      const listPageSize = localStorage.getItem("list_page_size");

      // 숫자 페이징
      // dispatch(
      //   requestFetchPagingLists({
      //     page: 0,
      //     size: listPageSize ? +listPageSize : list.pageSize,
      //   })
      // );

      // 더보기 페이징

      dispatch(
        requestFetchNextLists({
          page: 0,
          size: listPageSize ? +listPageSize : list.pageSize,
        })
      );
    }
  }, [dispatch, list.isFetched, list.pageSize]);

  const handlePageChanged = (page: number) => {
    console.log("--page: " + page);
    // setCurrentPage(page);
    dispatch(
      requestFetchPagingLists({
        page,
        size: list.pageSize,
      })
    );
  };

  const handlePageSizeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    dispatch(
      requestFetchPagingLists({
        page: list.page,
        size: +e.currentTarget.value,
      })
    );
  };

  return (
    <Layout>
      <section>
        <h2 className="text-center">Lists</h2>
        {/* 버튼 */}
        <div className="d-flex justify-content-end mb-2">
          <select
            className="form-select form-select-sm me-2"
            style={{ width: "60px" }}
            value={list.pageSize}
            onChange={(e) => {
              handlePageSizeChanged(e);
            }}
          >
            {[2, 4, 8, 12].map((size) => (
              <option key={`select-${size}`} value={size}>
                {size}
              </option>
            ))}
          </select>
          <button
            className="btn btn-secondary me-2"
            onClick={() => {
              dispatch(
                requestFetchPagingLists({
                  page: list.page,
                  size: list.pageSize,
                })
              );
            }}
          >
            <i className="bi bi-arrow-clockwise"></i>
            새로고침
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              router.push("/Lists/create");
            }}
          >
            <i className="bi bi-plus" />
            추가
          </button>
        </div>
        {/* 컨텐트 */}
        {(!list.isFetched || list.data.length === 0) && (
          <div className="text-center my-5">데이터가 없습니다.</div>
        )}
        <div className="d-flex flex-wrap">
          {/* state 데이터 배열에 map함수로 출력 */}
          {list.isFetched &&
            list.data.length > 0 &&
            list.data.map((item, index) => (
              <div
                key={`list-item-${index}`}
                className="card"
                style={{
                  width: "calc((100% - 3rem) / 4)",
                  marginLeft: index % 4 === 0 ? "0" : "1rem",
                  marginTop: index > 3 ? "1rem" : "0",
                }}
              >
                {/* 컨텐트 wrapper -- 시작 */}
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    // id값을 물고 이동해야함
                    router.push(`/Lists/detail/${item.id}`);
                  }}
                >
                  <img
                    src={item.listUrl}
                    className="card-img-top"
                    alt={item.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <h6 className="text-muted">
                      {getTimeString(item.createdTime)}
                    </h6>
                  </div>
                </div>
                {/* 컨텐트 wrapper -- 끝 */}
              </div>
            ))}
        </div>
        {/* 페이지네이션 */}
        {/* 숫자 페이징 */}
        {/* <div className="d-flex justify-content-center mt-4">
          <Pagination
            blockSize={2} // 고정값
            totalPages={list.totalPages}
            currentPage={list.page}
            onPageChanged={handlePageChanged}
          />
        </div> */}
        {/* 더보기 페이징 */}
        {!list.isLast && (
          <div className="d-flex justify-content-center mt-4">
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault(); // 기본 동작 방지
                dispatch(
                  requestFetchNextLists({
                    page: list.page + 1,
                    size: list.pageSize,
                  })
                );
              }}
              className="link-secondary fs-6 text-nowrap"
            >
              더보기
            </a>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default List;
