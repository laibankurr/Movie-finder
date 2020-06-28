import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../commons/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import { Row } from "antd";
import GridCards from "../commons/GridCards";
import Favorites from "../MovieDetail/Sections/Favorites";

function MovieDetail(props) {
  let movieId = props.match.params.movieId;

  const [MovieDetail, setMovieDetail] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [CastToggle, setCastToggle] = useState(false);

  useEffect(() => {
    let crewURL = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

    let detailURL = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(detailURL)
      .then((response) => response.json())
      .then((response) => {
        setMovieDetail(response);
      });

    fetch(crewURL)
      .then((response) => response.json())
      .then((response) => {
        setCasts(response.cast);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onToggleCast = () => {
    setCastToggle(!CastToggle);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${MovieDetail.backdrop_path}`}
        title={MovieDetail.original_title}
        overview={MovieDetail.overview}
      />

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorites
            movieData={MovieDetail}
            movieId={movieId}
            userFrom={localStorage.getItem("userId")}
          />
        </div>

        <MovieInfo movie={MovieDetail} />
        <br />
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button onClick={onToggleCast}> View the cast </button>
        </div>

        {CastToggle && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      cast.profile_path
                        ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                        : "null"
                    }
                    //castId={cast.cast_id}
                    castName={cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
