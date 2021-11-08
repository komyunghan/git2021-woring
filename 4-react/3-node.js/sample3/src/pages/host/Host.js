import React, { Component } from "react";

import { API } from "../../config";
import Footer from "../../components/Footer";
// import ImageUploader from "react-images-upload";
// import styled from "styled-components";
// import { withRouter } from "react-router-dom";

class Host extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place_type: "1",
      property_type: "",
      max_capacity: 0,
      bedroom: [{ name: "1번 침실", bed: { size: "1", number: "1" } }],
      bathroom: 0,
      bathroom_type: "",
      address: "",
      features: [],
      safety_facilities: [],
      shared_spaces: [],
      title: "",
      images: [],
      description: "",
      blockeddate_start: "",
      blockeddate_end: "",
      rules: "",
      check_in: "14:00:00",
      check_out: "11:00:00",
      price: "",
      monthly_stay: "",
    };
  }

  onChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handlePlus = (e) => {
    e.preventDefault();
    const { name } = e.target;
    this.setState((current) => ({ [name]: current[name] + 1 }));
  };

  handleMinus = (e) => {
    e.preventDefault();
    const { name } = e.target;
    if (this.state[name] !== 0) {
      this.setState((current) => ({ [name]: current[name] - 1 }));
    }
  };

  handleMulti = (e) => {
    const { value } = e.target;
    let selectedTypes = [...this.state.features];
    if (selectedTypes.includes(value)) {
      selectedTypes = selectedTypes.filter((s) => s !== value);
    } else {
      selectedTypes = [...selectedTypes, value];
    }
    this.setState({ features: selectedTypes });
  };

  handleSafety = (e) => {
    const { value } = e.target;
    let selectedTypes = [...this.state.shared_spaces];
    if (selectedTypes.includes(value)) {
      selectedTypes = selectedTypes.filter((s) => s !== value);
    } else {
      selectedTypes = [...selectedTypes, value];
    }
    this.setState({ shared_spaces: selectedTypes });
  };

  handleShare = (e) => {
    const { value } = e.target;
    let selectedTypes = [...this.state.safety_facilities];
    if (selectedTypes.includes(value)) {
      selectedTypes = selectedTypes.filter((s) => s !== value);
    } else {
      selectedTypes = [...selectedTypes, value];
    }
    this.setState({ safety_facilities: selectedTypes });
  };

  onDrop = (images) => {
    this.setState({
      images: this.state.images.concat(images),
    });
  };

  onFetch = () => {
    const token = localStorage.getItem("access_token");
    fetch(`${API}/api/register/room`, {
      method: "POST",
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=----WebKitFormBoundaryIn312MOjBWdkffIM",
        Authorization: token,
      },
      body: JSON.stringify({
        inputs: this.state,
      }),
    }).then(this.props.history.push("/detail/173"));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < this.state.images.length; i++) {
      formData.append("images", this.state.images[i]);
    }
    this.setState({ images: formData }, this.onFetch);
  };

  render() {
    const {
      place_type,
      property_type,
      max_capacity,
      bedroom,
      bathroom,
      bathroom_type,
      address,
      features,
      safety_facilities,
      shared_spaces,
      title,
      images,
      description,
      blockeddate_start,
      blockeddate_end,
      rules,
      check_in,
      check_out,
      price,
      monthly_stay,
    } = this.state;
    console.log(this.state);

    return (
      <Container>
        <Header>
          <svg width="102" height="32" fill="#008489">
            <path d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5zM41.54 24.12a5.02 5.02 0 01-3.95-1.83 6.55 6.55 0 01-1.6-4.48 6.96 6.96 0 011.66-4.58 5.3 5.3 0 014.08-1.86 4.3 4.3 0 013.7 1.92l.1-1.57h2.92V23.8h-2.93l-.1-1.76a4.52 4.52 0 01-3.88 2.08zm.76-2.88c.58 0 1.09-.16 1.57-.45.44-.32.8-.74 1.08-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.55.45zM53.45 8.46c0 .35-.06.67-.22.93-.16.25-.38.48-.67.64-.29.16-.6.22-.92.22-.32 0-.64-.06-.93-.22a1.84 1.84 0 01-.67-.64 1.82 1.82 0 01-.22-.93c0-.36.07-.68.22-.93.16-.3.39-.48.67-.64.29-.16.6-.23.93-.23a1.84 1.84 0 011.6.86 2 2 0 01.21.94zm-3.4 15.3V11.7h3.18v12.08h-3.19zm11.68-8.9v.04c-.15-.07-.35-.1-.5-.13-.2-.04-.36-.04-.55-.04-.89 0-1.56.26-2 .8-.48.55-.7 1.32-.7 2.31v5.93h-3.19V11.69h2.93l.1 1.83c.32-.64.7-1.12 1.24-1.48a3.1 3.1 0 011.81-.5c.23 0 .45.02.64.06.1.03.16.03.22.06v3.2zm1.28 8.9V6.74h3.18v6.5c.45-.58.96-1.03 1.6-1.38a5.02 5.02 0 016.08 1.31 6.55 6.55 0 011.6 4.49 6.96 6.96 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.1 1.57-2.92.03zm6.15-2.52c.57 0 1.08-.16 1.56-.45.44-.32.8-.74 1.08-1.25.26-.51.38-1.12.38-1.8 0-.67-.12-1.28-.38-1.79a3.75 3.75 0 00-1.08-1.25 2.95 2.95 0 00-3.12 0c-.45.32-.8.74-1.09 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.56.45zm7.51 2.53V11.69h2.93l.1 1.57a3.96 3.96 0 013.54-1.89 4.1 4.1 0 013.82 2.44c.35.76.54 1.7.54 2.75v7.24h-3.19v-6.82c0-.84-.19-1.5-.57-1.99-.38-.48-.9-.74-1.56-.74-.48 0-.9.1-1.27.32-.35.23-.64.52-.86.93a2.7 2.7 0 00-.32 1.35v6.92h-3.16zm12.52 0V6.73h3.19v6.5a4.67 4.67 0 013.73-1.89 5.02 5.02 0 013.95 1.83 6.57 6.57 0 011.59 4.48 6.95 6.95 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.09 1.57-2.93.03zm6.18-2.53c.58 0 1.09-.16 1.56-.45.45-.32.8-.74 1.09-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a3.63 3.63 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.95.45 1.55.45z"></path>
          </svg>
        </Header>

        <MainWrapper>
          <Left>
            <form>
              <div>
                <h1>등록하실 숙소 종류는 무엇인가요?</h1>
              </div>
              <Option>
                <Title>우선 범위를 좁혀볼까요?</Title>
                <select
                  style={{ width: "130px" }}
                  name="place_type"
                  onChange={this.onChange}
                >
                  <option value="1" selected>
                    아파트
                  </option>
                  <option value="2">주택</option>
                  <option value="3">별채</option>
                  <option value="4">독특한 숙소</option>
                  <option value="5">게스트하우스</option>
                  <option value="6">부티크호텔</option>
                </select>
              </Option>
              <Option>
                <Title>게스트가 묵게 될 숙소 유형을 골라주세요.</Title>
                <input
                  onChange={this.onChange}
                  type="radio"
                  name="property_type"
                  value="1"
                />
                집 전체
                <input
                  onChange={this.onChange}
                  type="radio"
                  name="property_type"
                  value="2"
                />
                개인실
                <input
                  onChange={this.onChange}
                  type="radio"
                  name="property_type"
                  value="3"
                />
                다인실
              </Option>
              <Option>
                <Title>장기 숙박이 가능한가요?</Title>
                <input
                  onChange={this.onChange}
                  type="radio"
                  name="monthly_stay"
                  value="True"
                />
                가능
                <input
                  onChange={this.onChange}
                  type="radio"
                  name="monthly_stay"
                  value="False"
                />
                불가능
              </Option>
              <Option>
                <Title>숙소에 얼마나 많은 인원이 숙박 할 수 있나요?</Title>
                <CounterWrap>
                  <label>최대 숙박 인원</label>
                  <Counter>
                    <button
                      className="numberBtn"
                      name="max_capacity"
                      onClick={this.handleMinus}
                    >
                      -
                    </button>
                    {max_capacity}
                    <button
                      className="numberBtn"
                      name="max_capacity"
                      onClick={this.handlePlus}
                    >
                      +
                    </button>
                  </Counter>
                </CounterWrap>
              </Option>
              <Option>
                <Title>게스트가 사용할 수 있는 침실은 몇 개 인가요?</Title>
                <select style={{ width: "110px" }} name="range">
                  <option value="침실 1개" selected>
                    침실 1개
                  </option>
                </select>
              </Option>
              {/* <Option>
                <Title> 게스트가 사용할 수 있는 침대는 몇 개 인가요?</Title>
                <br />
                <label>싱글</label>
                <button>-</button> 0<button>+</button>
                <br />
                <label>더블</label>
                <button>-</button> 0 <button>+</button>
                <br />
                <label>퀸</label>
                <button>-</button> 0 <button>+</button>
                <br />
                <label>킹</label>
                <button>-</button> 0 <button>+</button>
                <br />
              </Option> */}
              <Option>
                <Title>욕실 수</Title>
                <CounterWrap>
                  <label>욕실</label>
                  <Counter>
                    <button
                      className="numberBtn"
                      name="bathroom"
                      onClick={this.handleMinus}
                    >
                      -
                    </button>
                    {bathroom}
                    <button
                      className="numberBtn"
                      name="bathroom"
                      onClick={this.handlePlus}
                    >
                      +
                    </button>
                  </Counter>
                </CounterWrap>
              </Option>
              <Option>
                <Title>욕실 타입</Title>
                <input
                  onChange={this.onChange}
                  type="radio"
                  name="bathroom_type"
                  value="단독 공간 사용"
                />
                단독 공간 사용
                <input
                  onChange={this.onChange}
                  type="radio"
                  name="bathroom_type"
                  value="공용 공간 사용"
                />
                공용 공간 사용
              </Option>
              <Option>
                <Title>숙소의 위치를 알려주세요</Title>
                <textarea name="address" onChange={this.onChange}></textarea>
              </Option>
              <Option>
                <Title> 어떤 편의시설을 제공하시나요?</Title>
                <input
                  onChange={this.handleMulti}
                  type="checkbox"
                  name=""
                  value="1"
                />
                필수 품목
                <input
                  onChange={this.handleMulti}
                  type="checkbox"
                  name=""
                  value="2"
                />
                무선인터넷
                <input
                  onChange={this.handleMulti}
                  type="checkbox"
                  name="features"
                  value="3"
                />
                TV
                <input
                  onChange={this.handleMulti}
                  type="checkbox"
                  name="features"
                  value="4"
                />
                난방
                <input
                  onChange={this.handleMulti}
                  type="checkbox"
                  name="features"
                  value="5"
                />
                에어컨
                <input
                  onChange={this.handleMulti}
                  type="checkbox"
                  name="features"
                  value="6"
                />
                다리미
                <input
                  onChange={this.handleMulti}
                  type="checkbox"
                  name="features"
                  value="7"
                />
                샴푸
                <input
                  onChange={this.handleMulti}
                  type="checkbox"
                  name="features"
                  value="8"
                />
                헤어드라이어
                <br />
                <input
                  onChange={this.handleMulti}
                  type="checkbox"
                  name="features"
                  value="9"
                />
                조식,커피,차
                <input
                  onChange={this.handleMulti}
                  type="checkbox"
                  name="features"
                  value="10"
                />
                업무 가능 공간/책상
                <input
                  onChange={this.handleMulti}
                  type="checkbox"
                  name="features"
                  value="11"
                />
                벽난로
                <input
                  onChange={this.handleMulti}
                  type="checkbox"
                  name="features"
                  value="12"
                />
                옷장/서랍장
                <input
                  onChange={this.handleMulti}
                  type="checkbox"
                  name="features"
                  value="13"
                />
                게스트 전용 출입문
              </Option>
              <Option>
                <Title>안전 시설</Title>
                <input
                  onChange={this.handleSafety}
                  type="checkbox"
                  name="safety_facilities"
                  value="1"
                />
                화재 감지기
                <input
                  onChange={this.handleSafety}
                  type="checkbox"
                  name="safety_facilities"
                  value="2"
                />
                일산화탄소 감지기
                <input
                  onChange={this.handleSafety}
                  type="checkbox"
                  name="safety_facilities"
                  value="3"
                />
                구급상자
                <input
                  onChange={this.handleSafety}
                  type="checkbox"
                  name="safety_facilities"
                  value="4"
                />
                소화기
                <input
                  onChange={this.handleSafety}
                  type="checkbox"
                  name="safety_facilities"
                  value="5"
                />
                침실문 잠금장치
              </Option>
              <Option>
                <Title>게스트가 어떤 공간을 사용할 수 있나요?</Title>
                <input
                  onChange={this.handleShare}
                  type="checkbox"
                  name="shared_spaces"
                  value="1"
                />
                주방
                <input
                  onChange={this.handleShare}
                  type="checkbox"
                  name="shared_spaces"
                  value="2"
                />
                세탁 공간 - 세탁기
                <input
                  onChange={this.handleShare}
                  type="checkbox"
                  name="shared_spaces"
                  value="3"
                />
                세탁 공간 - 건조기
                <input
                  onChange={this.handleShare}
                  type="checkbox"
                  name="shared_spaces"
                  value="4"
                />
                주차
                <input
                  onChange={this.handleShare}
                  type="checkbox"
                  name="shared_spaces"
                  value="5"
                />
                헬스장
                <input
                  onChange={this.handleShare}
                  type="checkbox"
                  name="shared_spaces"
                  value="6"
                />
                수영장
                <input
                  onChange={this.handleShare}
                  type="checkbox"
                  name="shared_spaces"
                  value="7"
                />
                자쿠지
              </Option>

              <Option>
                <Title>숙소의 제목을 만드세요.</Title>
                <textarea name="title" onChange={this.onChange}></textarea>
              </Option>
              <Option>
                <Title>멋진 사진으로 숙소가 돋보이게 해주세요.</Title>
                {/* <input
                  id="ImageUploader"
                  onChange={this.fileChangeHandler}
                  type="file"
                  accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp"
                ></input> */}
                <ImageUploader
                  withIcon={false}
                  buttonText="사진 업로드"
                  onChange={this.onDrop}
                  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                  withLabel={false}
                  maxFileSize={5242880}
                  style={{ width: "550px" }}
                  withPreview={true}
                />
              </Option>
              <Option>
                <Title>게스트에게 숙소에 대해 설명해주세요.</Title>
                <textarea
                  name="description"
                  onChange={this.onChange}
                ></textarea>
              </Option>
              <Option>
                <Title>이용규칙</Title>
                <textarea name="rules" onChange={this.onChange}></textarea>
              </Option>
              <Option>
                <Title> 체크인 가능 시간을 선택해주세요.</Title>
                <DateWrap>
                  <Date>
                    <label>체크인</label>

                    <select
                      style={{ width: "100px" }}
                      name="check_in"
                      onChange={this.onChange}
                    >
                      <option value="14:00:00" selected>
                        14:00
                      </option>
                      <option value="15:00:00">15:00</option>
                    </select>
                  </Date>
                  <Date>
                    <label>체크아웃</label>
                    <select
                      style={{ width: "100px" }}
                      name="check_out"
                      onChange={this.onChange}
                    >
                      <option value="11:00:00" selected>
                        11:00
                      </option>
                      <option value="12:00:00">12:00</option>
                    </select>
                  </Date>
                </DateWrap>
              </Option>
              <Option>
                <Title> 예약 불가 날짜</Title>
                <DateWrap>
                  <Date>
                    <label>시작</label>

                    <input
                      name="blockeddate_start"
                      onChange={this.onChange}
                      type="date"
                    ></input>
                  </Date>
                  <Date>
                    <label>끝</label>

                    <input
                      name="blockeddate_end"
                      onChange={this.onChange}
                      type="date"
                    ></input>
                  </Date>
                </DateWrap>
              </Option>

              <Option>
                <Title> 숙소 요금 설정하기</Title>
                <label style={{ fontSize: "20px" }}>$</label>
                <Price
                  type="number"
                  name="price"
                  onChange={this.onChange}
                ></Price>
              </Option>
            </form>
            <hr></hr>
            <div className="flexBet">
              <div
                onClick={() => {
                  this.props.history.push("/");
                }}
                className="back"
              >
                뒤로
              </div>
              <div>
                <Button onClick={this.handleSubmit}>다음</Button>
              </div>
            </div>
          </Left>
        </MainWrapper>
        <Footer />
      </Container>
    );
  }
}

export default withRouter(Host);

const Container = styled.div`
  width: 100%;
  color: ${(props) => props.theme.color.black};
`;

const Header = styled.div`
  max-width: 780px;
  margin: 0 auto 3em;
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1080px;
  margin: 0 auto;
  padding-bottom: 80px;
`;

const Left = styled.div`
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
  h1 {
    font-size: 1.5rem;
    margin-bottom: 3rem;
  }
  .flexBet {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #008489;
  }
`;

const Button = styled.button`
  background-color: #008489;
  color: white;
  font-weight: bold;
  padding: 1em 1.5em;
  border: none;
  border-radius: 0.5em;
  cursor: pointer;
`;

const Option = styled.div`
  margin-bottom: 50px;
  select {
    padding: 0.4em 0.5em;
    font-family: inherit;
    background: url("https://t1.daumcdn.net/cfile/tistory/99761B495C84AA8716")
      no-repeat 95% 50%;
    border: 1px solid #999;
    border-radius: 0px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  textarea {
    width: 550px;
  }
  label {
    margin: 3px 0;
    color: ${(props) => props.theme.color.gray};
  }
  input {
    margin-left: 10px;
    margin-bottom: 10px;
  }
`;
const Title = styled.h2`
  color: ${(props) => props.theme.color.black};
  font-size: 1rem;
  margin-bottom: 6px;
`;

const CounterWrap = styled.div`
  display: flex;
  align-items: center;
`;
const Counter = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
  margin-left: 30px;
  align-items: center;
  .numberBtn {
    width: 30px;
    height: 30px;
    border: solid 1px rgb(176, 176, 176);
    border-radius: 50%;
    background-color: transparent;
  }
`;

const Price = styled.textarea`
  border: none;
  border-bottom: solid 1px black;
  height: 22px;
  margin-top: 20px;
  &:focus {
    outline: none;
  }
`;

const DateWrap = styled.div`
  display: flex;
`;
const Date = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;