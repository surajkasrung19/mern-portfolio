import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminPanel from "./pages/AdminPanel";
import "./App.css";

function App() {
  if (window.location.pathname === "/admin") {
    return <AdminPanel />;
  }

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills /> 
      <Projects />
      <Experience />
      <Contact />
      <Footer />

      
    </>
  );
}

export default App;
