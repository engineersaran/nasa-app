import React, { useEffect, useState } from "react";
import NAVBAR from "./navbar";

function NasaPhoto() {
  const [photoData, setPhotoData] = useState(null);
  const fetchURL = "https://api.nasa.gov/planetary/apod";
  const api_key = process.env.REACT_APP_NASA_KEY;

  useEffect(() => {
    fetchPhoto();
    async function fetchPhoto() {
      let url = new URL(fetchURL);
      url.search = new URLSearchParams({
        api_key: api_key,
      });
      const response = await fetch(url);
      const data = await response.json();
      setPhotoData(data);
    }
  }, []);

  if (!photoData) return <div />;

  return (
    <>
      <NAVBAR />
      <div className="nasa-photo">
        {photoData.media_type === "image" ? (
          <img src={photoData.url} alt={photoData.title} className="photo" />
        ) : (
          <iframe
            title="space-video"
            src={photoData.url}
            frameBorder="0"
            gesture="media"
            allow="encrypted-media"
            allowFullScreen
            className="photo"
          />
        )}
        <div>
          <h1>{photoData.title}</h1>
          <p className="date">{photoData.date}</p>
          <p className="explanation">{photoData.explanation}</p>
        </div>
      </div>
    </>
  );
}
export default NasaPhoto;
