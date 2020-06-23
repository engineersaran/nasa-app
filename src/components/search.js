import React, { useEffect, useState } from "react";
import "./search.css";
import NAVBAR from "./navbar";

function Search() {
  const imagesApiUrl = "https://images-api.nasa.gov/search";
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [imageSrc, setImageSrc] = useState(
    "https://via.placeholder.com/600x400"
  );
  const [pointer, setPointer] = useState(0);
  const [leftDisabled, setLeftDisabled] = useState(false);
  const [rightDisabled, setRightDisabled] = useState(false);

  const onSearch = () => {
    if (query && query.length > 0) {
      let url = new URL(imagesApiUrl);
      url.search = new URLSearchParams({
        q: query,
        media_type: "image",
      });
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (
            data.collection &&
            data.collection.items &&
            data.collection.items.length > 0
          ) {
            setSearchResults(data.collection.items);
            setImageSrc(data.collection.items[0].links[0].href);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const onClickRight = () => {
    let right = pointer;
    right = right + 1;
    if (right < searchResults.length && searchResults[right].links) {
      setImageSrc(searchResults[right].links[0].href);
      setPointer(right);
      setLeftDisabled(false);
    } else if (right >= searchResults.length) {
      setRightDisabled(true);
    }
  };

  const onClickLeft = () => {
    let left = pointer;
    left = left - 1;
    if (left >= 0 && searchResults[left].links) {
      setImageSrc(searchResults[left].links[0].href);
      setPointer(left);
      setRightDisabled(false);
    } else if (left <= 0) {
      setLeftDisabled(true);
    }
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <NAVBAR />
      <div className="slideshow">
        <div className="slideshow__search">
          <input
            type="text"
            className="slideshow__search__input"
            name="query"
            value={query}
            onChange={(event) => handleQueryChange(event)}
          />
          <button
            className="slideshow__button slideshow__search__button"
            onClick={onSearch}
          >
            Search
          </button>
        </div>
        <div className="slideshow__images">
          <div className="slideshow__image">
            <img
              src={imageSrc}
              alt="placeholder"
              className="slideshow__image__img"
            />
          </div>
        </div>
        <div className="slideshow__control">
          <button
            className="slideshow__button slideshow__control__right"
            onClick={onClickRight}
            disabled={rightDisabled}
          >
            &gt;
          </button>
          <button
            className="slideshow__button slideshow__control__left"
            onClick={onClickLeft}
            disabled={leftDisabled}
          >
            &lt;
          </button>
        </div>
      </div>
    </>
  );
}

export default Search;
