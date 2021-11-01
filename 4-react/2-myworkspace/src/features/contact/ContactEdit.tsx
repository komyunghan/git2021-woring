import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { modifyContact } from "./contactSlice";

const ContactEdit = () => {
  // ------ 데이터를 가져오거나 변수를 선언하는 부분 --------
  const { id } = useParams<{ id: string }>();

  const contactItem = useSelector((state: RootState) =>
    state.contact.data.find((item) => item.id === +id)
  );

  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();


  const nameInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const descTxta = useRef<HTMLTextAreaElement>(null);

  // ------ 이벤트에 대해서 처리하는 부분 --------
  const handleSaveClick = () => {
    if (contactItem) {
      const item = { ...contactItem };
      item.name = nameInput.current ? nameInput.current.value : "";
      item.phone = phoneInput.current ? phoneInput.current.value : "";
      item.email = emailInput.current ? emailInput.current.value : "";
      item.description = descTxta.current ? descTxta.current.value : "";

      dispatch(modifyContact(item));
      history.push("/contacts")
    };
  }
  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">Contact Edit</h2>
      <form>
        <table className="table">
          <tbody>
            <tr>
              <th>이름</th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={contactItem?.name}
                  ref={nameInput}
                />
              </td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={contactItem?.phone}
                  ref={phoneInput}
                />
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={contactItem?.email}
                  ref={emailInput}
                />
              </td>
            </tr>
            <tr>
              <th>메모</th>
              <td>
                <textarea
                  className="form-control"
                  style={{ height: "40vh" }}
                  ref={descTxta}
                  defaultValue={contactItem?.description}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div>
        <button
          className="btn btn-secondary me-1 float-start"
          onClick={() => {
            history.push("/contacts");
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
    </div>
  );
};

export default ContactEdit;