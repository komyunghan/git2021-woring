import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { requestFetchContacts } from "./contactSaga";

const Contact = () => {
  // Contact state 전체를 가져옴
  const Contact = useSelector((state: RootState) => state.contact);
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const getTimeString = (unixtime: number) => {
    const day = 24 * 60 * 60 * 1000;
    const dateTime = new Date(unixtime);
    return unixtime - new Date().getTime() >= day
      ? dateTime.toLocaleDateString()
      : dateTime.toLocaleTimeString();
  };
  useEffect(() => {
    if (!Contact.isFetched) {
      dispatch(requestFetchContacts());
    }
  }, [dispatch, Contact.isFetched]);

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center my-5">Contacts</h2>
      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn btn-primary text-nowrap"
          onClick={() => {
            history.push("/contacts/create");
          }}
        >
          <i className="bi bi-plus" />
          추가
        </button>
      </div>
      <form >
        <table className="table table-striped mt3 w-100">
          <thead className="justify-content-between">
            <tr>
              <th>#</th>
              <th>이름</th>
              <th>전화번호</th>
              <th>이메일</th>
              <th>작성시간</th>
            </tr>
          </thead>
          <tbody className="w-100" >
            {Contact.data.map((item) =>
              <tr key={item.id}>
                <th>{item.id}</th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push(`/contacts/detail/${item.id}`);
                  }}
                >{item.name}</th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push(`/contacts/detail/${item.id}`);
                  }}
                >{item.phone}</th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push(`/contacts/detail/${item.id}`);
                  }}
                >{item.email}</th>
                <th className="text-secondary">{getTimeString(
                  item.modifyTime ? item.modifyTime : item.createdTime
                )}</th>
              </tr>
            )}
          </tbody>
        </table>
      </form>

      <div>

      </div>
    </div>

  )

};

export default Contact;