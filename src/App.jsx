import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Homepage from "./Components/Homepage/Homepage";
import { Provider } from "react-redux";
import { store } from "./store";
import { Route, Routes } from "react-router-dom";
import Loginpage from "./Components/Loginpage/Loginpage";


function App() {
  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/login" element={<Loginpage />}/>
      </Routes>
      <Footer />
    </Provider>
  );
}

export default App;
