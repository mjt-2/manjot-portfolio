import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./Portfolio.jsx";
import ProjectsPage from "./ProjectsPage.jsx";
import ContactPage from "./ContactPage.jsx";
import ProjectDetail from "./ProjectDetail.jsx";

function NavBar() {
  const base = "px-3 py-2 rounded-lg text-sm transition-colors";
  const active = ({ isActive }) =>
    isActive ? `${base} bg-white/20 text-white` : `${base} hover:bg-white/10 text-white`;

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 shadow-[0_0_15px_rgba(167,139,250,0.5)]">
      <div className="max-w-6xl mx-auto h-14 px-5 md:px-8 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight text-lg text-white">
          Manjot Sodhi
        </Link>
        <nav className="flex items-center gap-4">
          <NavLink to="/" className={active} end>
            Home
          </NavLink>
          <NavLink to="/projects" className={active}>
            Projects
          </NavLink>
          <NavLink to="/contact" className={active}>
            Contact
          </NavLink>
          {/* Resume Link */}
          <a
            href="/Manjot_Sodhi_Resume (3).pdf"   // place resume.pdf inside your /public folder
            target="_blank"
            rel="noopener noreferrer"
            className={base + " text-white hover:bg-white/10"}
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}
