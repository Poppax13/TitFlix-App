import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useMovieContext } from "../contexts/MovieContext";

function NavBar() {
  const { setSearchQuery } = useMovieContext();

  const handleReset = () => {
    setSearchQuery("");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={handleReset}>TitFlix</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link" onClick={handleReset}>
          Home
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
      </div>
    </nav>
  );
}
export default NavBar;
