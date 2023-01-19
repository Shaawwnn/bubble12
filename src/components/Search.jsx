import React, { useRef, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const input = useRef();
  const result = useRef();
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [show, setShow] = useState(false);

  window.addEventListener("click", e => {
    if (e.target !== input.current) {
      setShow(false);
    }
  });

  const handleSearch = async () => {
    if (input.current.value) {
      try {
        const res = await axios.get(`/users/search/${input.current.value}`);
        res.data[0] ? setSearchResult(res.data[0]) : setSearchResult(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <NavSearch>
      <div className="navSearchInner">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search"
          spellCheck="false"
          ref={input}
          onFocus={() => {
            setShow(true);
          }}
          onChange={e => {
            setQuery(e.target.value);
            handleSearch();
          }}
        />
      </div>
      {show && query && (
        <div className="navSearchPanel" ref={result}>
          {searchResult ? (
            <Link to={`/profile/${searchResult.username}`}>
              <div className="navSearchResult">
                <img
                  src={`${
                    searchResult.displayPhoto
                      ? searchResult.displayPhoto
                      : "/default.png"
                  }`}
                  alt=""
                />
                <p>{searchResult.username}</p>
              </div>
            </Link>
          ) : (
            "No Matches"
          )}
        </div>
      )}
    </NavSearch>
  );
};

export default Search;

const NavSearch = styled.div`
  flex: 0.6;
  padding: 0 40px;
  display: flex;
  justify-content: center;
  background-color: transparent;
  position: relative;
  .navSearchInner {
    max-width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    background-color: #3a3b3c;
    padding: 5px 10px;
    border-radius: 20px;
    color: #b0b3b8;
    width: 100%;
  }

  input {
    width: 100%;
    color: white;
    margin-left: 10px;
    line-height: 20px;
    font-size: 15px;
    outline: none;
    border: none;
    background-color: transparent;
  }

  .navSearchPanel {
    position: absolute;
    background-color: #242526;
    width: 80%;
    max-width: 500px;
    top: 43px;
    padding: 10px 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 5px;
    color: white;
    z-index: 2000;
    a {
      color: white;
    }
    .navSearchResult {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      border-radius: 5px;
      padding: 5px;
      cursor: pointer;
      img {
        width: 40px;
        border-radius: 50%;
      }

      &:hover {
        background-color: #2d2d2e;
      }
    }
  }
  @media screen and (max-width: 700px) {
    padding: 0 5px;

    .navSearchPanel {
      min-width: 280px;
    }
  }
`;
