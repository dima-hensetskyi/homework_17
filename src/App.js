import React from "react";
import './App.css';
import Timer from "./Component/Timer"

function App() {
  const timers = [
    {
      id: 1,
      timeStart: 10,
      autoStart: false,
      step: 1000,
    },
    {
      id: 2,
      timeStart: 100,
      autoStart: true,
      step: 1000,
    },
    {
      id: 3,
      timeStart: 50,
      autoStart: true,
      step: 5000,
    }]

  return (
    <div className="App">
      {timers.map(item => <Timer {...item} key={item.id} />)}
    </div>
  );
}

export default App;
