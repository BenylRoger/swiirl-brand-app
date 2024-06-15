import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./CommissionListing.css";

import CardContainer from "./CardContainer";

function CommissionListing() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for loader
  const username = useSelector((state) => state.user.username);

  useEffect(() => {
    // Fetch data from the API
    fetch(
      `https://yv5njvks2xbquqciiauvn6bfj40ibxav.lambda-url.us-east-1.on.aws/?join=true&createdby=${username}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Group commissions by their ID
        const groupedCommissions = data.reduce((acc, commission) => {
          const { id, name, campaign_goal, image_url, imagename } = commission;
          if (!acc[id]) {
            acc[id] = {
              id,
              name,
              campaign_goal,
              images: [],
            };
          }
          if (image_url) {
            acc[id].images.push({
              url: image_url,
              alt: `Image for commission ${id}`,
              imagename: imagename,
            });
          }
          return acc;
        }, {});

        // Convert grouped commissions into array
        const transformedCards = Object.values(groupedCommissions);
        setCards(transformedCards);
        setIsLoading(false); // Hide loader after data is fetched and processed
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Hide loader even if there is an error
      });
  }, [username]);

  return (
    <div>
      {isLoading ? (
        <div className="loader-container">
          <img
            src="/Loader/Loader.svg"
            className="loader-middle"
            alt="Loading"
          />
        </div>
      ) : (
        <>
          <div className="intro-commission">
            <div className="new-symbol">NEW</div>
            <div className="new-commission-text">
              Your latest commission is here!
            </div>
          </div>
          <CardContainer cards={cards} />
        </>
      )}
    </div>
  );
}

export default CommissionListing;
