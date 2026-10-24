import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        DEV@Deakin
      </Link>

      <input type="text" className="search" placeholder="Search..." />

      <div className="header-buttons">
        <Link to="/post" className="btn">
          Post
        </Link>
        <Link to="/login" className="btn">
          Login
        </Link>
      </div>
    </header>
  );
}

export default Header;
