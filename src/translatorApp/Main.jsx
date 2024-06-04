import { useEffect, useState } from "react";
import "./textTranslate.css";

function Main() {
  document.title = "Text Translator App";

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_HOST = import.meta.env.VITE_API_HOST;

  const [languages, setLanguages] = useState([]);

  const [selected, setSelected] = useState({
    from: "",
    to: "",
  });
  const [text, setText] = useState({
    from: "",
    to: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (selected.to.length > 0 && selected.from.length > 0)
      if (selected.to === selected.from) setError("Select Different languages");
  }, [selected]);

  useEffect(() => {
    const url = "https://text-translator2.p.rapidapi.com/getLanguages";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
    };
    async function fetchData() {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result.data.languages);
        setLanguages(result.data.languages);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  function translate() {
    const url = "https://text-translator2.p.rapidapi.com/translate";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
      body: new URLSearchParams({
        source_language: selected.from,
        target_language: selected.to,
        text: text.from,
      }),
    };

    async function fetchData() {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setText({ ...text, to: result.data.translatedText });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }

  // console.log(selected);

  return (
    <>
      {error.length > 0 ? <p>{error}</p> : ""}
      <h2>Text Translator</h2>
      <div id="translator">
        <label htmlFor="from">From</label>
        <select
          name=""
          id="from"
          onChange={(e) => {
            setSelected({ ...selected, from: e.target.value });
          }}
        >
          {languages.map((language, index) => {
            return (
              <option key={index} value={language.code}>
                {language.name}
              </option>
            );
          })}
        </select>

        <label htmlFor="to">To</label>
        <select
          name=""
          id="to"
          onChange={(e) => {
            setSelected({ ...selected, to: e.target.value });
          }}
        >
          {languages.map((language, index) => {
            return (
              <option key={index} value={language.code}>
                {language.name}
              </option>
            );
          })}
        </select>
      </div>

      <div id="output">
        <textarea
          name=""
          id="fromText"
          value={text.from}
          onChange={(e) => {
            setText({ ...text, from: e.target.value });
          }}
          placeholder="Enter text to translate here..."
        >
          {text.from}
        </textarea>
        <textarea
          name=""
          id="toText"
          value={text.to}
          placeholder="Translated text will appear here..."
          readOnly
        >
          {text.to}
        </textarea>
      </div>

      <button onClick={translate}>Translate</button>
    </>
  );
}

export default Main;
