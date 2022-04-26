import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import "./App.css";

import dict from "./all.json";

type Props = {
  word: Word;
};

interface Word {
  title: string;
  body: string;
}

const WordItem: React.FC<Props> = (props) => {
  const escaped = encodeURIComponent(props.word.title);
  return (
    <div className="word">
      <div className="wordTitle">{props.word.title}</div>
      <div className="wordBody">{props.word.body}</div>
      <div className="action">
        <a href={"https://eow.alc.co.jp/search?q=" + escaped}>Eijiro</a>
        <a href={"https://ejje.weblio.jp/content/" + escaped}>weblio</a>
        <a href={"http://gogengo.me/words/search?word%5Bquery%5D=" + escaped}>
          Gogengo
        </a>
      </div>
    </div>
  );
};

function App() {
  const [text, setText] = useState("");
  const [debouncedText] = useDebounce(text, 100);
  // why?
  const dictT = dict as Record<string, string>;
  const keys = Object.keys(dict);

  const result = keys.filter((i) =>
    i.toLowerCase().startsWith(debouncedText.toLowerCase())
  );
  const resultJE = keys.filter((i) => dictT[i].indexOf(debouncedText) >= 0);

  const disp = result.slice(0, 20).map((i): Word => {
    const body = dictT[i];
    return {
      title: i,
      body: body,
    };
  });
  const dispJE = resultJE.slice(0, 30).map((i): Word => {
    const body = dictT[i];
    return {
      title: i,
      body: body,
    };
  });

  const inputEscaped = encodeURIComponent(debouncedText);
  return (
    <div className="App">
      <div className="search">
        <input autoFocus onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="queryAction">
        Search in{" "}
        <a href={"https://eow.alc.co.jp/search?q=" + inputEscaped}>Eijiro</a>
        <a href={"https://ejje.weblio.jp/content/" + inputEscaped}>weblio</a>
        <a
          href={"http://gogengo.me/words/search?word%5Bquery%5D=" +
            inputEscaped}
        >
          Gogengo
        </a>
      </div>
      <div>
        {disp.map((i) => {
          return <WordItem word={i} />;
        })}
      </div>
      <hr />
      <h3>和英</h3>
      <div>
        {dispJE.map((i) => {
          return <WordItem word={i} />;
        })}
      </div>
    </div>
  );
}

export default App;
