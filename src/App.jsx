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
import { SuggestionList } from "./components/SuggestionList/SuggestionList";
import { Logo } from "./components/Logo/Logo";
import logo from "./assets/images/logo.png";

export function App() {
  const [currentRecord, setCurrentRecord] = useState();
  const [currentRecordType, setCurrentRecordType] = useState();
  const [searchType, setSearchType] = useState("person");
  const [creditAsActorList, setCreditAsActorList] = useState([]);
  const [creditAsDirectorList, setCreditAsDirectorList] = useState([]);
  const [castList, setCastList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  async function fetchTrendingPeople() {
    const trending = await PersonAPI.fetchTrendingPeople();
    setCurrentRecord(trending);
    setCurrentRecordType("person");
  }

  async function getPersonSuggestions(input) {
    const suggestions = await PersonAPI.getPersonSuggestions(input);
    if (suggestions.length > 0) {
      setSuggestions(suggestions);
    }
  }

  async function searchPerson(name) {
    const searchResponse = await PersonAPI.searchPersonByName(name);
    if (searchResponse) {
      setCurrentRecord(searchResponse);
      setCurrentRecordType("person");
    }
  }

  async function getMovieSuggestions(input) {
    const suggestions = await MovieAPI.getMovieSuggestions(input);
    if (suggestions.length > 0) {
      setSuggestions(suggestions);
    }
  }

  async function searchMovie(title) {
    const searchResponse = await MovieAPI.searchMovieByTitle(title);
    if (searchResponse) {
      setCurrentRecord(searchResponse);
      setCurrentRecordType("movie");
    }
  }

  async function getTVShowSuggestions(input) {
    const suggestions = await TVAPI.getTVShowSuggestions(input);
    if (suggestions.length > 0) {
      setSuggestions(suggestions);
    }
  }

  async function searchTVShow(title) {
    const searchResponse = await TVAPI.searchTVShowByTitle(title);
    if (searchResponse) {
      setCurrentRecord(searchResponse);
      setCurrentRecordType("tv");
    }
  }

  async function getCreditsAsActor(id) {
    const credits = await PersonAPI.fetchCreditsAsActorById(id);
    if (credits.length > 0) {
      setCreditAsActorList(credits);
    }
  }

  async function getCreditsAsDirector(id) {
    const credits = await PersonAPI.fetchCreditsAsDirectorById(id);
    if (credits.length > 0) {
      setCreditAsDirectorList(credits);
    }
  }

  async function getMovieCast(id) {
    const cast = await MovieAPI.fetchCastById(id);
    if (cast.length > 0) {
      setCastList(cast);
    }
  }

  async function getTVShowCast(id) {
    const cast = await TVAPI.fetchCastById(id);
    if (cast.length > 0) {
      setCastList(cast);
    }
  }

  async function getMovieOrTVShowById(id, type) {
    if (type === "movie") {
      const movie = await MovieAPI.getMovieById(id);
      if (movie) {
        setCurrentRecord(movie);
        setCurrentRecordType("movie");
      }
    }
    if (type === "tv") {
      const tvShow = await TVAPI.getTVShowById(id);
      if (tvShow) {
        setCurrentRecord(tvShow);
        setCurrentRecordType("tv");
      }
    }
  }

  async function getPersonById(id) {
    const person = await PersonAPI.getPersonById(id);
    if (person) {
      setCurrentRecord(person);
      setCurrentRecordType("person");
    }
  }

  useEffect(() => {
    fetchTrendingPeople();
  }, []);

  useEffect(() => {
    if (currentRecord && currentRecordType === "person") {
      getCreditsAsActor(currentRecord.id);
    }
  }, [currentRecord, currentRecordType]);

  useEffect(() => {
    if (currentRecord && currentRecordType === "person") {
      getCreditsAsDirector(currentRecord.id);
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

  console.log("sugg", suggestions);

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
              <div className={s.search}>
                {searchType === "person" && (
                  <SearchBar
                    className="col-md-12 col-lg-6"
                    searchType={searchType}
                    onSubmit={searchPerson}
                    onInput={getPersonSuggestions}
                  />
                )}
                {suggestions.length > 0 && (
                  <SuggestionList suggestionList={suggestions} />
                )}
              </div>
              {searchType === "movie" && (
                <SearchBar
                  className="col-md-12 col-lg-6"
                  searchType={searchType}
                  onSubmit={searchMovie}
                  onInput={getMovieSuggestions}
                />
              )}
              {searchType === "tv" && (
                <SearchBar
                  className="col-md-12 col-lg-6"
                  searchType={searchType}
                  onSubmit={searchTVShow}
                  onInput={getTVShowSuggestions}
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
            <MovieDetail record={currentRecord} onClick={getPersonById} />
          )}
          {currentRecord && currentRecordType === "tv" && (
            <TVShowDetail record={currentRecord} />
          )}
        </div>

        <div className={s.list}>
          {creditAsActorList.length > 0 && currentRecordType === "person" && (
            <CreditList
              creditList={creditAsActorList}
              currentRecord={currentRecord}
              onClickItem={getMovieOrTVShowById}
              type="acting"
            />
          )}
          {creditAsDirectorList.length > 0 &&
            currentRecordType === "person" && (
              <CreditList
                creditList={creditAsDirectorList}
                currentRecord={currentRecord}
                onClickItem={getMovieOrTVShowById}
                type="directing"
              />
            )}

          {creditAsActorList && currentRecordType === "movie" && (
            <CastList
              castList={castList}
              currentRecordType={currentRecordType}
              onClickItem={getPersonById}
            />
          )}
          {creditAsActorList && currentRecordType === "tv" && (
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
