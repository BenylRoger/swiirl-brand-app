import React, { useState, useEffect } from "react";
import "./CommissionListing.css";

import CardContainer from "./CardContainer";

function CommissionListing() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch(
      "https://yv5njvks2xbquqciiauvn6bfj40ibxav.lambda-url.us-east-1.on.aws/"
    )
      .then((response) => response.json())
      .then((data) => {
        // Group images by commissionid
        const groupedData = data.reduce((acc, item) => {
          const { commissionid, id, image_url } = item;
          if (!acc[commissionid]) {
            acc[commissionid] = {
              commissionid,
              id,
              images: [],
              description: `ID: ${id}`,
            };
          }
          acc[commissionid].images.push({
            url: image_url.trim(),
            alt: `Image for commission ${commissionid}`,
          });
          return acc;
        }, {});

        // Transform the grouped data into an array of card objects
        const transformedCards = Object.values(groupedData);
        setCards(transformedCards);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <div className="intro-commission">
        <div className="new-symbol">NEW</div>
        <div className="new-commission-text">
          Your latest commission is here!
        </div>
      </div>
      <CardContainer cards={cards} />
    </div>
  );
}

export default CommissionListing;
