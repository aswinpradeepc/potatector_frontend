import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import FileUpload from './components/FileUpload';
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import {useState} from "react";
import Header from "./components/Header";

function App() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const [auth, setAuth] = useState(user ? '' : 'login');
    if (auth === "signup") {
        return (
            <div id="auth">
                <Signup setAuth={setAuth} />
            </div>
        );
    }
    if (auth === "login") {
        return (
            <div id="auth" >
                <Login setAuth={setAuth}/>
            </div>
        );
    }
    return (
        <div className="App">
            <Header setAuth={setAuth} />
            <Hero />
            <About />
            <FileUpload />
            <Footer />
        </div>
  );
}

export default App;
