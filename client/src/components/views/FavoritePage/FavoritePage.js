import React, { useEffect, useState } from "react";
import "./favorite.css";
import Axios from "axios";
import { Popover } from "antd";
import { IMAGE_BASE_URL } from "../../Config";

function FavoritePage() {
  const [FavoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    fetchFavoriteList();
  }, []);

  const fetchFavoriteList = () => {
    Axios.post("/api/favorite/getFavoriteMovie", {
      userFrom: localStorage.getItem("userId"),
    }).then((response) => {
      if (response.data.success) {
        setFavoriteList(response.data.favorites);
      } else {
        alert("Failed to get information");
      }
    });
  };

  const onRemove = (movieId, userFrom) => {
    const data = {
      movieId,
      userFrom,
    };

    Axios.post("/api/favorite/removeFavorite", data).then((response) => {
      if (response.data.success) {
        fetchFavoriteList();
      } else {
        alert("Failed to remove ");
      }
    });
  };

  const tdContents = FavoriteList.map((favorite, index) => {
    const popupIMG = (
      <div>
        {favorite.movieImage ? (
          <img
            src={`${IMAGE_BASE_URL}w500${favorite.movieImage}`}
            alt="title_image"
          />
        ) : (
          "no Image"
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={popupIMG} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRunTime} minutes</td>
        <td>
          <a href={favorite.movieHomepage}>{favorite.movieHomepage}</a>
        </td>
        <td>
          <button onClick={() => onRemove(favorite.movieId, favorite.userFrom)}>
            Remove
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2> My Favorite Movies </h2>
      <hr />
      <table style={{ width: "100%", margin: "3rem auto" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Runtime</th>
            <th>Home Page</th>
            <th>Remove from List</th>
          </tr>
        </thead>
        <tbody>{tdContents}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
