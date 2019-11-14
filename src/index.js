import React from "react";
import ReactDOM from "react-dom";
import MyForm from "./MyForm";
import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles.scss';
import './sassy.css';
// testing

function App() {
  return (
    <div className="App">
      <MyForm />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
