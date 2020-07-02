import React, { useEffect, useState } from "react";
import NAVBAR from "./navbar";

function NasaPhoto() {
  const [photoData, setPhotoData] = useState(null);
  const [dateInput, setDateInput] = useState("");
  const [error, setError] = useState(null);
  const fetchURL = "https://api.nasa.gov/planetary/apod";
  const api_key = process.env.REACT_APP_NASA_KEY;

  const fetchDatePhoto = (event) => {
    event.preventDefault();
    setError(null);
    let url = new URL(fetchURL);
    url.search = new URLSearchParams({
      api_key: api_key,
      date: dateInput,
    });
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setPhotoData(data);
          if (data.code && data.msg) {
            setError(data.msg);
          }
        }
      })
      .catch((error) => console.log("couldnt fetch image", error));
  };

  const handleDateInputChange = (event) => {
    setDateInput(event.target.value);
  };

  return (
    <>
      <NAVBAR />
      <center>
        <h2>NASA Picture Of The Day</h2>
      </center>
      <div className="nasa-photo">
        <form onSubmit={(event) => fetchDatePhoto(event)}>
          Enter a date (YYYY-MM-DD):
          <input
            type="text"
            name={dateInput}
            placeholder="YYYY-MM-DD"
            required
            pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
            title="Enter a date in this format YYYY-MM-DD"
            onChange={(event) => handleDateInputChange(event)}
          />
          <input type="submit" value="Show the picture" />
        </form>
      </div>
      {error && (
        <center>
          <h2>{error}</h2>
        </center>
      )}
      {!error && photoData && (
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
      )}
    </>
  );
}
export default NasaPhoto;
