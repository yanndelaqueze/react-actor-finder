import s from "./style.module.css";
import { useEffect, useState } from "react";
// BOOTSTRAP ICONS

import { PersonAPI } from "./api/person";
import { MovieAPI } from "./api/movie";
import { TVAPI } from "./api/tv";

import { IMAGE_BASE_URL } from "./config";
import { SearchSelector } from "./components/SearchSelector/SearchSelector";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { PersonDetail } from "./components/PersonDetail/PersonDetail";
import { MovieDetail } from "./components/MovieDetail/MovieDetail";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { CreditList } from "./components/CreditList/CreditList";
import { CastList } from "./components/CastList/CastList";
import { Logo } from "./components/Logo/Logo";
import logo from "./assets/images/logo.png";

export function App() {
  const [currentRecord, setCurrentRecord] = useState();
  const [currentRecordType, setCurrentRecordType] = useState();
  const [searchType, setSearchType] = useState("person");
  const [creditList, setCreditList] = useState([]);
  const [castList, setCastList] = useState([]);

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
    const searchResponse = await TVAPI.searchTVShowByTitle(title);
    if (searchResponse) {
      setCurrentRecord(searchResponse);
      setCurrentRecordType("tv");
    }
  }

  async function getCredits(id) {
    const credits = await PersonAPI.fetchCreditsById(id);
    if (credits.length > 0) {
      console.log("credits : ", credits);
      setCreditList(credits);
    }
  }

  async function getMovieCast(id) {
    const cast = await MovieAPI.fetchCastById(id);
    if (cast.length > 0) {
      console.log("cast : ", cast);
      setCastList(cast);
    }
  }

  async function getTVShowCast(id) {
    const cast = await TVAPI.fetchCastById(id);
    if (cast.length > 0) {
      console.log("cast : ", cast);
      setCastList(cast);
    }
  }

  async function getMovieById(id) {
    const movie = await MovieAPI.getMovieById(id);
    if (movie) {
      console.log("movie clicked : ", movie);
      setCurrentRecord(movie);
      setCurrentRecordType("movie");
    }
  }

  async function getPersonById(id) {
    const person = await PersonAPI.getPersonById(id);
    if (person) {
      console.log("person clicked : ", person);
      setCurrentRecord(person);
      setCurrentRecordType("person");
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

  useEffect(() => {
    if (currentRecord && currentRecordType === "movie") {
      getMovieCast(currentRecord.id);
    }
  }, [currentRecord, currentRecordType]);

  useEffect(() => {
    if (currentRecord && currentRecordType === "tv") {
      getTVShowCast(currentRecord.id);
    }
  }, [currentRecord, currentRecordType]);

  function getBackgroundImage() {
    if (currentRecord && currentRecordType === "person") {
      return `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${IMAGE_BASE_URL}${currentRecord.profile_path}") no-repeat center / cover`;
    } else if (currentRecord && currentRecordType === "movie") {
      return `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${IMAGE_BASE_URL}${currentRecord.backdrop_path}") no-repeat center / cover`;
    } else if (currentRecord && currentRecordType === "tv") {
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
              <Logo
                title="ActorFindr"
                subtitle="This face looks familiar..."
                image={logo}
              />
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
              {searchType === "tv" && (
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
          {currentRecord && currentRecordType === "tv" && (
            <TVShowDetail record={currentRecord} />
          )}
        </div>
        <div className={s.list}>
          {creditList && currentRecordType === "person" && (
            <CreditList
              creditList={creditList}
              currentRecord={currentRecord}
              onClickItem={getMovieById}
            />
          )}
          {creditList && currentRecordType === "movie" && (
            <CastList
              castList={castList}
              currentRecordType={currentRecordType}
              onClickItem={getPersonById}
            />
          )}
          {creditList && currentRecordType === "tv" && (
            <CastList
              castList={castList}
              currentRecordType={currentRecordType}
              onClickItem={getPersonById}
            />
          )}
        </div>
      </div>
    </>
  );
}
