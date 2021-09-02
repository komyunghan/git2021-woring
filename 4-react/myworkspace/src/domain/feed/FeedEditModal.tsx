import { useRef, useState } from "react";
import { FeedState } from "./type";

// { 함수속성 }
// 함수속성의 타입: (매개변수타입) => 리턴타입
// 함수(ex. 부모state제어)를 부모 컴포넌트로 부터 매개변수(prop)를 받음
// 자식컴포넌트에서 이벤트가 발생하면 prop으로 받은 함수를 실행

interface ModalProp {
  item: FeedState;
  onClose: () => void; // 콜백함수
  onSave: (editItem: FeedState) => void; // 콜백함수
}

const FeedEditModal = ({ item, onClose, onSave }: ModalProp) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [url, setUrl] = useState(item.dataUrl)

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setUrl(reader.result?.toString());
      };

      reader.readAsDataURL(file);
    }
  };

  const save = (Url: string | undefined) => {
    const feed: FeedState = {
      id: item.id,
      content: textRef.current?.value,
      createTime: item.createTime,
      dataUrl: Url
    };

    onSave(feed);
  };

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={() => {
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h5 className="modal-title">EDIT Feed</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                onClose();
              }}
            ></button>
          </div>
          <div className="modal-body" key={item.id}>
            {item.fileType &&
              (item.fileType?.includes("image") ? (
                <img
                  src={url}
                  className="card-img-top"
                  alt={item.content}
                />
              ) : (
                <video className="card-img-top"
                  controls src={item.dataUrl}
                />
              ))}
            <textarea
              className="form-control mb-1"
              placeholder="Leave a post here"
              style={{ boxSizing: "border-box", height: "15vh" }}
              defaultValue={item.content}
              ref={textRef}
            />
            <input
              type="file"
              className="form-control me-1"
              accept="image/png, image/jpeg, video/mp4"
              onChange={(e) => {
                changeImage(e);
              }}
              ref={inputRef}
            />
          </div>
          <div className="modal-footer">
            <button type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                onClose();
              }}
            >닫기</button>
            <button type="button"
              className="btn btn-primary"
              onClick={() => {
                save(url);
              }}
            >저장</button>
          </div>
        </div>
      </div>
    </div>
  )
};




export default FeedEditModal;