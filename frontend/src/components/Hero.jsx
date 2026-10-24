import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero">
      <img src="/images/banner.png" alt="" />
      <div className="hero-text">
        <h1>Welcome to DEV@Deakin</h1>
        <p>
          A place for developers to ask questions, share articles and learn from
          tutorials.
        </p>
        <div className="hero-buttons">
          <Link to="/post" className="btn btn-main">
            Write a post
          </Link>
          <Link to="/signup" className="btn btn-light">
            Join for free
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
