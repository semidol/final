import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Homepage from "./Components/Homepage/Homepage";
import { Provider, useDispatch } from "react-redux";
import { logOut, store } from "./store";
import { Route, Routes } from "react-router-dom";
import Loginpage from "./Components/Loginpage/Loginpage";
import Searchpage from "./Components/Searchpage/Searchpage";
import Resultpage from "./Components/Resultpage/Resultpage";
import PrivateRoute from "./hoc/PrivateRoute";
import { useEffect } from "react";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/login" element={<Loginpage />}/>
        <Route path="/search" element={<PrivateRoute><Searchpage /></PrivateRoute>} />
        <Route path="/result" element={<PrivateRoute><Resultpage /></PrivateRoute>} />
      </Routes>
      <Footer />
    </Provider>
  );
}

export default App;
