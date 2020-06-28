import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import { Row } from "antd";
import MainImage from "../commons/MainImage";
import GridCards from "../commons/GridCards";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [BannerMovie, setBannerMovie] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchURL = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(fetchURL);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMovies = (fetchURL) => {
    fetch(fetchURL)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.results);
        setMovies([...Movies, ...response.results]);
        setBannerMovie(response.results[0]);
        console.log(response.results[0].backdrop_path);
        setCurrentPage(response.page);
      });
  };

  const loadMoreHandle = () => {
    const fetchURL = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(fetchURL);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {BannerMovie && (
        <MainImage
          image={`${IMAGE_BASE_URL}w500${BannerMovie.backdrop_path}`}
          title={BannerMovie.original_title}
          overview={BannerMovie.overview}
        />
      )}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movies by Popularity</h2>
        <hr />

        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  landingPage
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : "null"
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={loadMoreHandle}> More Movie </button>
      </div>
    </div>
  );
}

export default LandingPage;
