import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { ContactItem } from "./ContactSlice";

const ContactCreate = () => {
  // 입력 폼 ref 객체
  const nameInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const descTxta = useRef<HTMLTextAreaElement>(null);


  // 포토 데이터 배열 가져오기
  const contactData = useSelector((state: RootState) => state.contact.data);

  // dispatch 함수 만들기
  const dispatch = useDispatch<AppDispatch>();

  // history 객체 가져오기
  const history = useHistory();

  const handleAddClick = () => {
    console.log(nameInput.current?.value);
    console.log(phoneInput.current?.value);
    console.log(emailInput.current?.value);
    console.log(descTxta.current?.value);

    const item: ContactItem = {
      id: contactData.length ? contactData[0].id + 1 : 1,
      name: nameInput.current ? nameInput.current.value : "",
      phone: phoneInput.current ? phoneInput.current.value : "",
      email: emailInput.current ? emailInput.current.value : "",
      description: descTxta.current ? descTxta.current.value : "",
      createdTime: new Date().getTime(),
    };
    console.log(item)

    // dispatch(requestAddContact(item));
    history.push("/contacts")
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">Contact Create</h2>
      <form>
        <table className="table">
          <tbody>
            <tr>
              <th>이름</th>
              <td>
                <input className="form-control" type="text" ref={nameInput} />
              </td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>
                <input className="form-control" type="text" ref={phoneInput} />
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input className="form-control" type="text" ref={emailInput} />
              </td>
            </tr>
            <tr>
              <th>메모</th>
              <td>
                <textarea
                  className="form-control"
                  style={{ height: "40vh" }}
                  ref={descTxta}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div>
        <button
          className="btn btn-secondary float-start"
          onClick={() => {
            history.push("/contact");
          }}
        >
          <i className="bi bi-grid-3x3-gap me-1"></i>
          목록
        </button>
        <button
          className="btn btn-primary float-end"
          onClick={() => {
            handleAddClick();
          }}
        >
          <i className="bi bi-check" />
          저장
        </button>
      </div>
    </div>
  );
};

export default ContactCreate;