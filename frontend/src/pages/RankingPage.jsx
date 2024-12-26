import React, { useEffect, useState } from "react";
import axios from "axios";
import { book_api, movie_api } from "../services/api";

const RankingPage = () => {
  const [rankings, setRankings] = useState([]);
  const [mediaDetails, setMediaDetails] = useState({});
  //const userId = "5fdc6f3c-9374-4505-a754-d87f655538c3";
  const userId = sessionStorage.getItem("userId");

  const getRankings = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/rankings/all/${userId}`);
      setRankings(response.data);
    } catch (error) {
      console.error("Error fetching rankings:", error);
    }
  };

  const getMediaDetails = async (mediaId, mediaType) => {
    try {
      const api = mediaType === "book" ? book_api : movie_api;
      const response = await axios.get(`${api}/${mediaId}`);
      setMediaDetails((prevDetails) => ({
        ...prevDetails,
        [mediaId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching media details:", error);
    }
  };

  useEffect(() => {
    getRankings();
  }, []);

  useEffect(() => {
    if (rankings.length > 0) {
      rankings.forEach((ranking) => {
        getMediaDetails(ranking.mediaId, ranking.mediaType);
      });
    }
  }, [rankings]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Rankings</h1>
      {rankings.map((item) => (
        <div key={item.id} className="card bg-base-100 shadow-lg rounded-lg p-6 mb-4">
          <h2 className="text-2xl font-bold">
            {mediaDetails[item.mediaId]?.title || "Loading..."}
          </h2>
          <p>Your Rating: ⭐ {item.ranking}</p>
          <p>Average Rating: ⭐ {item.ranking}</p>
        </div>
      ))}
    </div>
  );
};

export default RankingPage;
