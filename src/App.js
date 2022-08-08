import "./App.css";
import { useState } from "react";

function App() {
  let [글제목, 글제목변경] = useState([
    "남자코트 추천",
    "강남 우동맛집",
    "파이썬독학",
  ]);
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [input, setInput] = useState();
  let [날짜, 날짜변경] = useState(["2월 17일", "2월 17일", "2월 17일"]);
  const date = new Date();

  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDay()).slice(-2);
  const dateStr = month + "월" + " " + day + "일";

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>

      {글제목.map(function (a, i) {
        return (
          <div className="list" key={i}>
            <h4
              onClick={() => {
                setModal(!modal);
                let copy = title;
                copy = i;
                setTitle(copy);
              }}
            >
              {글제목[i]}{" "}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  let copy = [...따봉];
                  copy[i] += 1;
                  따봉변경(copy);
                }}
              >
                👍 {따봉[i]}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  let copy = [...글제목];
                  copy.splice(i, 1);
                  글제목변경(copy);
                  let like = [...따봉];
                  like.splice(i, 1);
                  따봉변경(like);
                }}
              >
                삭제
              </button>
            </h4>
            <p>{날짜[i]}</p>
          </div>
        );
      })}

      <div className="input">
        <input
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="text"
        />
        <button
          onClick={() => {
            if (!input) return;
            let titleCopy = [...글제목];
            titleCopy.unshift(input);
            글제목변경(titleCopy);
            let likeCopy = [...따봉];
            likeCopy.unshift(0);
            따봉변경(likeCopy);
            let dayCopy = [...날짜];
            dayCopy.unshift(dateStr);
            날짜변경(dayCopy);
          }}
        >
          추가
        </button>
      </div>

      {modal ? (
        <Modal 글제목={글제목} 글제목변경={글제목변경} title={title} />
      ) : null}
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>

      <button
        onClick={() => {
          let copy = [...props.글제목];
          copy[0] = "여자코트 추천";
          props.글제목변경(copy);
        }}
      >
        글수정
      </button>
    </div>
  );
}

export default App;
