import { useState } from "react";
import "./App.css";

import dict from "./all.json";

function App() {
  const [text, setText] = useState("");

  const keys = Object.keys(dict);

  const result = keys.filter((i) =>
    i.toLowerCase().startsWith(text.toLowerCase())
  );

  const disp = result.slice(0, 20).map((i) => {
    // why?
    const body = (dict as Record<string, string>)[i];
    return {
      title: i,
      body: body,
    };
  });

  return (
    <div className="App">
      <div className="search">
        <input onChange={(e) => setText(e.target.value)} />
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
              </div>
            </div>
          );
        })}
      </div>
      {/* <textarea value={result}></textarea> */}
    </div>
  );
}

export default App;
