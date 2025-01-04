import React, { useEffect, useState } from "react";
import axios from "axios";
import { books_api, movies_api, rankings_api } from "../../services/api";
import { useNavigate } from "react-router-dom";

const RankingPage = () => {
  const [rankings, setRankings] = useState([]);
  const [mediaDetails, setMediaDetails] = useState({});
  const [averageRatings, setAverageRatings] = useState({});
  const userId = sessionStorage.getItem("userId");

  if (!userId) {
    return (
      <div className="container mx-auto mt-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="text-xl mb-4">You need to log in to view your rankings.</p>
        <p className="text-lg">Please log in to see your rankings and media details. 🔒</p>
      </div>
    );
  }

  const getRankings = async () => {
    try {
      const response = await axios.get(`${rankings_api}/all/${userId}`);
      setRankings(response.data);
    } catch (error) {
      console.error("Error fetching rankings:", error);
    }
  };

  const getMediaDetails = async (mediaId, mediaType) => {
    try {
      const api = mediaType === "book" ? books_api : movies_api;
      const response = await axios.get(`${api}/${mediaId}`);
      setMediaDetails((prevDetails) => ({
        ...prevDetails,
        [mediaId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching media details:", error);
    }
  };

  const getAverageRanking = async (mediaId) => {
    try {
      const response = await axios.get(`${rankings_api}/${mediaId}`);
      const rankingsForMedia = response.data;

      const totalRating = rankingsForMedia.reduce((sum, ranking) => sum + ranking.ranking, 0);
      const averageRating = totalRating / rankingsForMedia.length;

      setAverageRatings((prevRatings) => ({
        ...prevRatings,
        [mediaId]: averageRating,
      }));
    } catch (error) {
      console.error("Error fetching rankings for media:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getRankings();
    }
  }, [userId]);

  useEffect(() => {
    if (rankings.length > 0) {
      rankings.forEach((ranking) => {
        getMediaDetails(ranking.mediaId, ranking.mediaType);
        getAverageRanking(ranking.mediaId);
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
          <p>
            Average Rating: ⭐{" "}
            {averageRatings[item.mediaId]
              ? averageRatings[item.mediaId].toFixed(1)
              : "Loading..."}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RankingPage;
