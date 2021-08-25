import { useRef, useState } from "react";

interface Prop {
  id: number;
  text: string | undefined;
  url: any;
  createTime: number;
  modifyTime?: number;
  type: string;
}

const getTimeString = (unixTime: number) => {
  const dateTime = new Date(unixTime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};

const Feed = () => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement | any>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [feedList, setData] = useState<Prop[]>([
  ]);

  const add = () => {
    const file = fileRef.current?.files[0];
    const inputText = textRef.current?.value;
    const fileType = file.type;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const baseUrl = reader.result;

      const data: Prop = {
        id: feedList.length > 0 ? feedList[0].id + 1 : 1,
        text: inputText,
        url: baseUrl,
        createTime: new Date().getTime(),
        type: fileType,
      };

      setData([data, ...feedList]);
    };

    formRef.current?.reset();
  };

  const remove = (id: number) => {
    setData(feedList.filter((item) => item.id !== id));
  };

  return (
    <>
      <h2 className="text-conter my-5">Feed</h2>
      <form
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        ref={formRef}
      >
        <textarea
          style={{ boxSizing: "border-box", height: "10rem" }}
          className="form-control mb-1 w-100"
          placeholder="Leave a post here"
          ref={textRef}
        ></textarea>

        <div className="d-flex">
          <input
            type="file"
            className="form-control me-1"
            accept="image/png, image/jpeg, video/mp4"
            ref={fileRef}
          />
          <button
            className="btn btn-primary text-nowrap"
            type="button"
            onClick={() => {
              add();
            }}
          >
            입력
          </button>
        </div>
      </form>

      {feedList.map((item) =>
        item.type === "video/mp4" ? (
          <div key={item.id} className="card">
            <video controls>
              <source src={item.url} type="video/mp4"></source>
            </video>
            <p className="card-text">{item.text}</p>
            <div className="card-body d-flex">
              <span>
                {getTimeString(
                  item.modifyTime ? item.modifyTime : item.createTime
                )}
              </span>
              <a
                onClick={() => {
                  remove(item.id);
                }}
                href="#!"
                className="link-secondary fs-6 float-end"
              >
                삭제
              </a>
            </div>
          </div>
        ) : (
          <div className="card">
            <img src={item.url} className="card-img-top" alt="..." />
            <p className="card">{item.text}</p>
            <div className="card d-flex">
              <span>
                {getTimeString(
                  item.modifyTime ? item.modifyTime : item.createTime
                )}
              </span>
              <a
                onClick={() => {
                  remove(item.id);
                }}
                href="#!"
                className="link-secondary fs-6 float-end"
              >
                삭제
              </a>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Feed;