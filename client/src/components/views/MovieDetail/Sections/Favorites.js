import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button } from "antd";

function Favorites(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieData.title;
  const movieImage = props.movieData.backdrop_path;
  const movieRunTime = props.movieData.runtime;
  const movieHomepage = props.movieData.homepage;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [BeFavorite, setBeFavorite] = useState(false);

  let variables = {
    userFrom,
    movieId,
    movieTitle,
    movieImage,
    movieRunTime,
    movieHomepage,
  };

  useEffect(() => {
    Axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert("Failed to get information");
      }
    });

    Axios.post("/api/favorite/beFavorite", variables).then((response) => {
      if (response.data.success) {
        setBeFavorite(response.data.beFavorite);
      } else {
        alert("Failed to get information");
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleFavorite = () => {
    if (BeFavorite) {
      Axios.post("/api/favorite/removeFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          setBeFavorite(!BeFavorite);
        } else {
          alert("Failed to remove value from list");
        }
      });
    } else {
      Axios.post("/api/favorite/addFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setBeFavorite(!BeFavorite);
        } else {
          alert("Failed to add value from list");
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={toggleFavorite}>
        {BeFavorite ? "Remove from Favorite :  " : "Add To Favorite : "}
        {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorites;
