import React, { useState } from "react";
import axios from "axios";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi
const theGrid = [
  "(1,1)",
  "(2,1)",
  "(3,1)",
  "(1,2)",
  "(2,2)",
  "(3,2)",
  "(1,3)",
  "(2,3)",
  "(3,3)",
];

export default function AppFunctional(props) {
  const [coords, setCoords] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);

  function getXY() {
    return theGrid[coords];
  }

  function getXYMesaj(yon) {
    if (yon == "left") {
      setMessage("Sola gidemezsiniz");
    } else if (yon == "up") {
      setMessage("Yukarıya gidemezsiniz");
    } else if (yon == "right") {
      setMessage("Sağa gidemezsiniz");
    } else if (yon == "down") {
      setMessage("Aşağıya gidemezsiniz");
    }
  }

  function reset() {
    setSteps(initialSteps);
    setCoords(initialIndex);
    setEmail(initialEmail);
    setMessage(initialMessage);
  }

  function ilerle(evt) {
    if (evt == "left" && !(coords % 3 == 0)) {
      setSteps(steps + 1);
      setCoords(coords - 1);
    } else if (evt == "up" && coords / 3 >= 1) {
      setSteps(steps + 1);
      setCoords(coords - 3);
    } else if (evt == "right" && !(coords % 3 == 2)) {
      setSteps(steps + 1);
      setCoords(coords + 1);
    } else if (evt == "down" && coords / 3 < 2) {
      setSteps(steps + 1);
      setCoords(coords + 3);
    } else {
      getXYMesaj(evt);
    }
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();

    let theData = {
      x: 1,
      y: 2,
      steps: steps,
      email: email,
    };

    setEmail(initialEmail);

    const config = {
      method: "post",
      url: "http://localhost:9000/api/result",
      headers: {
        "Content-Type": "application/json",
      },
      data: theData,
    };

    axios(config)
      .then(function (response) {
        setMessage(response.data.message);
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar {getXY()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === coords ? " active" : ""}`}>
            {idx === coords ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={(e) => ilerle(e.target.id)} id="left">
          SOL
        </button>
        <button onClick={(e) => ilerle(e.target.id)} id="up">
          YUKARI
        </button>
        <button onClick={(e) => ilerle(e.target.id)} id="right">
          SAĞ
        </button>
        <button onClick={(e) => ilerle(e.target.id)} id="down">
          AŞAĞI
        </button>
        <button onClick={() => reset()} id="reset">
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
