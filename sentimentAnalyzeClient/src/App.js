import "./bootstrap.min.css";
import "./App.css";
import EmotionTable from "./EmotionTable.js";
import { useState } from "react";

export default function App() {
  const [state, setState] = useState({
    innercomp: <textarea rows="4" cols="50" id="textinput" />,
    mode: "text",
    sentimentOutput: [],
    sentiment: false
  });

  function renderOutput(input_mode) {
    let rows = 1;
    let mode = "url";

    if (input_mode === "text") {
      mode = "text";
      rows = 4;
    }

    setState((prevState) => ({
      ...prevState,
      innercomp: <textarea rows={rows} cols="50" id="textinput" />,
      mode: mode,
    }));
  }

  const sendForEmotionAnalysis = () => {
    const spinner = document.getElementById("spinner");
    const card = document.getElementById("card");
    const errorText = document.getElementById("error");

    setState((prevState) => ({
      ...prevState,
    }));
    let url = ".";
    let mode = state.mode;
    url =
      url +
      "/" +
      mode +
      "/emotion?" +
      mode +
      "=" +
      document.getElementById("textinput").value;
    spinner.classList.remove("d-none");

    async function sendData() {
      const response = await fetch(url);
      response
        .json()
        .then((data) => {
          spinner.classList.add("d-none");
          errorText.classList.add("d-none");
          setState((prevState) => ({
            ...prevState,
            sentimentOutput: <EmotionTable emotions={data} />,
          }));
        })
        .catch(() => {
          spinner.classList.add("d-none");
          errorText.classList.remove("d-none");
          card.classList.remove("d-none");
          errorText.textContent = mode === "url" ? "Please, add valid URL" : "Please, add more emotions or valid text";
        });
    }
    sendData();
  };

  const sendForSentimentAnalysis = () => {
    let url = ".";
    let mode = state.mode;
    const spinner = document.getElementById("spinner");
    const card = document.getElementById("card");
    const errorText = document.getElementById("error");
    url =
      url +
      "/" +
      mode +
      "/sentiment?" +
      mode +
      "=" +
      document.getElementById("textinput").value;
    spinner.classList.remove("d-none");
    async function sendData() {
      setState((prevState) => ({
        ...prevState,
        sentiment: true,
      }));

      const response = await fetch(url);
      response
        .json()
        .then((data) => {
          let output = data.label;
          let color = "white";
          switch (output) {
            case "positive":
              color = "#00f800";
              break;
            case "negative":
              color = "#f80000";
              break;
            default:
              color = "#FCE205";
          }
          spinner.classList.add("d-none");
          errorText.classList.add("d-none");
          card.classList.remove("d-none");
          output = <div style={{ color: color, fontSize: 20 }}>{output}</div>;
          setState((prevState) => ({
            ...prevState,
            sentimentOutput: output,
          }));
        })
        .catch(() => {
          spinner.classList.add("d-none");
          errorText.classList.remove("d-none");
          card.classList.remove("d-none");
          errorText.textContent = mode === "url" ? "Please, add valid URL" : "Please, add more emotions or valid text";
        });
    }

    sendData();
  };

  return (
    <div className="App">
      <div className="container mt-5">
        <h1>Sentiment Analyzer</h1>
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => renderOutput("text")}
        >
          Text
        </button>
        <button
          type="button"
          className="btn btn-secondary ml-2"
          onClick={() => renderOutput("url")}
        >
          URL
        </button>

        <div className="mt-2 mb-2">{state.innercomp}</div>
        <button
          type="button"
          className="btn btn-info mr-2"
          onClick={() => sendForSentimentAnalysis()}
        >
          Analyze Sentiment
        </button>
        <button
          type="button"
          className="btn btn-success ml-2"
          onClick={() => sendForEmotionAnalysis()}
        >
          Analyze Emotion
        </button>
        <br />
        <br />
        <br />
        <div id="spinner" class="spinner-border text-info d-none" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <br />
        <br />
        <div id="card" class="card bg-light d-none">
          <div id="card-body" class="card-body">
            {state.sentimentOutput}
            <div id="error" class="row text-danger"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
