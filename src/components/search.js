import React, { useEffect, useState, useReducer } from "react";
import "./search.css";
import NAVBAR from "./navbar";

function Search() {
  const imagesApiUrl = "https://images-api.nasa.gov/search";
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [totalHits, setTotalHits] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  const [imageSrc, setImageSrc] = useState(
    "https://via.placeholder.com/600x400"
  );
  const [pointer, setPointer] = useState(0);
  const [leftDisabled, setLeftDisabled] = useState(false);
  const [rightDisabled, setRightDisabled] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (pageNumber) => {
    setError(null);
    if (query && query.length > 0) {
      let url = new URL(imagesApiUrl);
      setPageNum(pageNumber);
      url.search = new URLSearchParams({
        q: query,
        media_type: "image",
        page: pageNumber,
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
          if (data.collection && data.collection.metadata) {
            setTotalHits(data.collection.metadata.total_hits);
          }
          if (data.reason) {
            setError(data.reason);
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
    setTotalHits(0);
  };

  return (
    <>
      <NAVBAR />
      <center>
        <h2>NASA Image Search</h2>
      </center>
      {error && (
        <center>
          <h2>{error}</h2>
        </center>
      )}
      <div className="slideshow">
        {totalHits != 0 && query && !error && (
          <p>
            {imageCount + 1} - {imageCount + 100} of {totalHits} for "{query}"
          </p>
        )}
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
            onClick={() => {
              setImageCount(0);
              onSearch(1);
            }}
          >
            Search
          </button>
        </div>
        {!error && (
          <div>
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
            {totalHits > 100 && (
              <div>
                <center>
                  {pageNum > 1 && (
                    <span>
                      <button
                        className="slideshow__button slideshow__pagination__button"
                        onClick={() => {
                          setImageCount(imageCount - 100);
                          onSearch(pageNum - 1);
                        }}
                      >
                        Previous
                      </button>
                    </span>
                  )}
                  <span>
                    <button
                      className="slideshow__button slideshow__pagination__button"
                      onClick={() => {
                        setImageCount(imageCount + 100);
                        onSearch(pageNum + 1);
                      }}
                    >
                      Next
                    </button>
                  </span>
                </center>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
