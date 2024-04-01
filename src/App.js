import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import FileUpload from './components/FileUpload';
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
    <Hero />
      <About />
      <FileUpload/>
      <Footer />
    </div>
  );
}

export default App;
