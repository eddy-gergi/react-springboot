import React, { useEffect, useState } from "react";
import axios from "axios";
import { books_api, movies_api, rankings_api } from "../../services/api";
import { useNavigate } from "react-router-dom";

const RankingPage = () => {
  const [rankings, setRankings] = useState([]);
  const [mediaDetails, setMediaDetails] = useState({});
  const [averageRatings, setAverageRatings] = useState({});
  const [sortOrder, setSortOrder] = useState("descending");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRankings, setTotalRankings] = useState(0);
  const userId = sessionStorage.getItem("userId");

  const itemsPerPage = 6;

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
      const response = await axios.get(
        `${rankings_api}/all/${userId}?orderByColumn=ranking&orderByDirection=${sortOrder}`
      );
      if (response.data) {
        setRankings(response.data || []);
        setTotalRankings(response.data.length || 0);
      }
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

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "descending" ? "ascending" : "descending"));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (userId) {
      getRankings();
    }
  }, [userId, sortOrder]);

  useEffect(() => {
    if (rankings.length > 0) {
      rankings.forEach((ranking) => {
        getMediaDetails(ranking.mediaId, ranking.mediaType);
        getAverageRanking(ranking.mediaId);
      });
    }
  }, [rankings]);

  
  const currentRankings = rankings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4 text-center flex justify-between items-center">
        Rankings
        <button onClick={toggleSortOrder} className="text-xl">
          {sortOrder === "descending" ? "↓" : "↑"}
        </button>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentRankings.length > 0 ? (
          currentRankings.map((item) => (
            <div
              key={item.id}
              className="card bg-base-100 shadow-lg rounded-lg p-6 flex flex-col items-center"
            >
              <h2 className="text-2xl font-bold mb-2">
                {mediaDetails[item.mediaId]?.title || "Loading..."}
              </h2>
              <div className="flex items-center space-x-2 mb-2">
                <p className="text-lg">Your Rating:</p>
                <div className="text-yellow-500">{'⭐'.repeat(item.ranking)}</div>
              </div>
              <p className="text-lg mb-2">
                Average Rating: ⭐{" "}
                {averageRatings[item.mediaId]
                  ? averageRatings[item.mediaId].toFixed(1)
                  : "Loading..."}
              </p>
              <p className="text-sm text-gray-500">Media Type: {item.mediaType}</p>
            </div>
          ))
        ) : (
          <p>No rankings available</p>
        )}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-outline"
        >
          {"<"}
        </button>
        <p className="text-lg">
          Page {currentPage} of {Math.ceil(totalRankings / itemsPerPage)}
        </p>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= totalRankings}
          className="btn btn-outline"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default RankingPage;
