import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Movie1() {
  const apiKey = "89ddc40da271d3ca53f25c3632096300";
  const apiUrlBase = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=`;

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch movies from API
  const loadMovies = async (page = 1) => {
    try {
      setLoading(true);
      const res = await fetch(apiUrlBase + page);
      const data = await res.json();

      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }

      setTotalPages(data.total_pages);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies(currentPage);
    // eslint-disable-next-line
  }, [currentPage]);

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <h2 className="fs-4 col-md nav-fill">
          <a href="#" className="nav-link text-white">
            Movies
          </a>
        </h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarEx"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarEx">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="#" className="nav-link">
                Movies
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                WebSeries
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Kids
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mt-4">
        <div id="movies" className="row g-4">
          {loading && movies.length === 0 ? (
            <p>Loading movies...</p>
          ) : (
            movies.map((movie) => {
              const poster = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/200x300?text=No+Image";

              return (
                <div className="col-md-3" key={movie.id}>
                  <div className="card h-100">
                    <img
                      src={poster}
                      className="card-img-top"
                      alt={movie.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p>⭐ {movie.vote_average}</p>
                      <p>📅 {movie.release_date}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Load More */}
        {currentPage < totalPages && (
          <div className="text-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              More Movies ⬇️
            </button>
          </div>
        )}
      </main>
    </div>
  );
}