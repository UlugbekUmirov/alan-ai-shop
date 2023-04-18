import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Card from "./components/Card";

function App() {
  return (
    <div className="">
      <ToastContainer />
      <Card />
    </div>
  );
}

export default App;
