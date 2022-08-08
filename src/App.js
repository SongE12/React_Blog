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
            <p>2월 17일 발행</p>
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
            let copy = [...글제목];
            copy.unshift(input);
            글제목변경(copy);
            let like = [...따봉];
            like.unshift(0);
            따봉변경(like);
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
