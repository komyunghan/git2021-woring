import { useRef, useState } from "react";
import produce from "immer";


// 1건에 대한 타입
interface ContactState {
  id: number;
  memo0: string | undefined;
  memo1: string | undefined;
  memo2: string | undefined;
  memo3: string | undefined;
  createTime: number;
}
// eslint-disable-next-line
const getTimeString = (unixtime: number) => {
  // Locale: timezone, currency 등
  // js에서는 브라우저의 정보를 이용함
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};
const Contact = () => {


  const [contactList, setContactList] = useState<ContactState[]>([
  ]);
  const numberRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  const add = () => {
    const contact: ContactState = {
      id: contactList.length > 0 ? contactList[0].id + 1 : 1,
      memo0: numberRef.current?.value,
      memo1: nameRef.current?.value,
      memo2: phoneRef.current?.value,
      memo3: emailRef.current?.value,
      createTime: new Date().getTime(),
    };
    setContactList(
      produce((state) => {
        state.unshift(contact);
      })
    );

    // 입력값 초기화
    formRef.current?.reset();
  };

  const del = (id: number, index: number) => {
    console.log(id);
    // immer로 state 배열 직접 조작(index로 삭제)
    setContactList(
      produce((state) => {
        state.splice(index, 1);
      })
    );
  };

  return (
    <>
      <h2 className="text-center my-5">연락처 관리</h2>

      <form
        className="d-flex"
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="form-control me-2"
          placeholder="이름"
          ref={nameRef}
        />
        <input
          type="text"
          className="form-control me-2"
          placeholder="연락처"
          ref={phoneRef}
        />
        <input
          type="text"
          className="form-control me-2"
          placeholder="이메일"
          ref={emailRef}
        />
        <button
          type="button"
          className="btn btn-primary text-nowrap"
          onClick={() => {
            add();
          }}
        >
          추가
        </button>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>이름</th>
            <th>전화번호</th>
            <th>이메일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody id="table-list"></tbody>
      </table>
      <table>
        <tbody id="ul-list" className="list-group list-group-flush mt-3" ref={tbodyRef}>
          {/* 데이터와 UI요소 바인딩 */}
          {contactList.map((item, index) => (
            <tr className="list-group-item d-flex" key={item.id}>
              <td>
                <div className="w-100">
                  <span className="me-1">{item.memo0}</span>
                  <span style={{ fontSize: "0.75rem" }}>
                  </span>
                </div>
              </td>
              <td>
                <div className="w-100">
                  <span className="me-1">{item.memo1}</span>
                  <span style={{ fontSize: "0.75rem" }}>
                  </span>
                </div>
              </td>
              <td>
                <div className="w-100">
                  <span className="me-1">{item.memo2}</span>
                  <span style={{ fontSize: "0.75rem" }}>
                  </span>
                </div>
              </td>
              <td>
                <div className="w-100">
                  <span className="me-1">{item.memo3}</span>
                  <span style={{ fontSize: "0.75rem" }}>
                  </span>
                </div>
              </td>
              <button
                className="btn btn-outline-secondary btn-sm text-nowrap"
                onClick={() => {
                  del(item.id, index);
                }}
              >
                삭제
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Contact;