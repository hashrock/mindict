import { useState } from "react";
import "./App.css";

import dict from "./all.json";

function App() {
  const [text, setText] = useState("");
  // why?
  const dictT = dict as Record<string, string>
  const keys = Object.keys(dict);

  const result = keys.filter((i) =>
    i.toLowerCase().startsWith(text.toLowerCase()) ||
    dictT[i].indexOf(text) >= 0
  );

  const disp = result.slice(0, 20).map((i) => {
    const body = dictT[i];
    return {
      title: i,
      body: body,
    };
  });

  const inputEscaped = encodeURIComponent(text) 
  return (
    <div className="App">
      <div className="search">
        <input autoFocus onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="queryAction">
        Search in <a href={"https://eow.alc.co.jp/search?q=" + inputEscaped}>Eijiro</a>
        <a href={"https://ejje.weblio.jp/content/" + inputEscaped}>weblio</a>
        <a href={"http://gogengo.me/words/search?word%5Bquery%5D=" + inputEscaped}>Gogengo</a>
        
      </div>
      <div>
        {disp.map((i) => {
          const escaped = encodeURIComponent(i.title);
          return (
            <div className="word">
              <div className="wordTitle">{i.title}</div>
              <div className="wordBody">{i.body}</div>
              <div className="action">
                <a href={"https://eow.alc.co.jp/search?q=" + escaped}>Eijiro</a>
                <a href={"https://ejje.weblio.jp/content/" + escaped}>weblio</a>
                <a href={"http://gogengo.me/words/search?word%5Bquery%5D=" + escaped}>Gogengo</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
