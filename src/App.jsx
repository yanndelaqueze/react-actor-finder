import s from "./style.module.css";
import { useEffect, useState } from "react";
// BOOTSTRAP ICONS

import { PersonAPI } from "./api/person";
import { MovieAPI } from "./api/movie";
import { TVShowAPI } from "./api/tv-show";

import { IMAGE_BASE_URL } from "./config";
import { SearchSelector } from "./components/SearchSelector/SearchSelector";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { PersonDetail } from "./components/PersonDetail/PersonDetail";
import { MovieDetail } from "./components/MovieDetail/MovieDetail";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";

export function App() {
  const [currentRecord, setCurrentRecord] = useState();
  const [currentRecordType, setCurrentRecordType] = useState();
  const [searchType, setSearchType] = useState("person");

  async function fetchTrendingPeople() {
    const trending = await PersonAPI.fetchTrendingPeople();
    setCurrentRecord(trending);
    setCurrentRecordType("person");
  }

  async function searchPerson(name) {
    const searchResponse = await PersonAPI.searchPersonByName(name);
    if (searchResponse) {
      setCurrentRecord(searchResponse);
      setCurrentRecordType("person");
    }
  }

  async function searchMovie(title) {
    const searchResponse = await MovieAPI.searchMovieByTitle(title);
    if (searchResponse) {
      setCurrentRecord(searchResponse);
      setCurrentRecordType("movie");
    }
  }

  async function searchTVShow(title) {
    const searchResponse = await TVShowAPI.searchTVShowByTitle(title);
    if (searchResponse) {
      setCurrentRecord(searchResponse);
      setCurrentRecordType("tv-show");
    }
  }

  async function getCredits(id) {
    const searchResponse = await PersonAPI.fetchCreditsById(id);
    console.log(searchResponse);
    if (searchResponse) {
      console.log("searchResponse");
    }
  }

  useEffect(() => {
    fetchTrendingPeople();
  }, []);

  useEffect(() => {
    if (currentRecord && currentRecordType === "person") {
      getCredits(currentRecord.id);
    }
  }, [currentRecord, currentRecordType]);

  console.log(currentRecord);
  console.log(currentRecordType);

  function getBackgroundImage() {
    if (currentRecord && currentRecordType === "person") {
      return `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${IMAGE_BASE_URL}${currentRecord.profile_path}") no-repeat center / cover`;
    } else if (currentRecord && currentRecordType === "movie") {
      return `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${IMAGE_BASE_URL}${currentRecord.backdrop_path}") no-repeat center / cover`;
    } else if (currentRecord && currentRecordType === "tv-show") {
      return `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${IMAGE_BASE_URL}${currentRecord.backdrop_path}") no-repeat center / cover`;
    } else {
      return "black";
    }
  }

  return (
    <>
      <div
        className={s.main_container}
        style={{
          background: getBackgroundImage(),
        }}
      >
        <div className={s.header}>
          <div className="row">
            <div className="col-4">
              <span>LOGO HERE</span>
            </div>
            <div className="col-md-12 col-lg-2">
              <SearchSelector
                className="col-md-12 col-lg-2"
                onClickItem={setSearchType}
                searchType={searchType}
              />
            </div>
            <div className="col-md-12 col-lg-6">
              {searchType === "person" && (
                <SearchBar
                  className="col-md-12 col-lg-6"
                  searchType={searchType}
                  onSubmit={searchPerson}
                />
              )}
              {searchType === "movie" && (
                <SearchBar
                  className="col-md-12 col-lg-6"
                  searchType={searchType}
                  onSubmit={searchMovie}
                />
              )}
              {searchType === "tv-show" && (
                <SearchBar
                  className="col-md-12 col-lg-6"
                  searchType={searchType}
                  onSubmit={searchTVShow}
                />
              )}
            </div>
          </div>
        </div>
        <div className={s.details}>
          {currentRecord && currentRecordType === "person" && (
            <PersonDetail record={currentRecord} />
          )}
          {currentRecord && currentRecordType === "movie" && (
            <MovieDetail record={currentRecord} />
          )}
          {currentRecord && currentRecordType === "tv-show" && (
            <TVShowDetail record={currentRecord} />
          )}
        </div>
        <div className={s.list}>LIST</div>
      </div>
    </>
  );
}
