import s from "./style.module.css";
import { useEffect, useState } from "react";
// BOOTSTRAP ICONS

import { PersonAPI } from "./api/person";
import { BACKDROP_BASE_URL } from "./config";
import { SearchSelector } from "./components/SearchSelector/SearchSelector";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { PersonDetail } from "./components/PersonDetail/PersonDetail";

export function App() {
  const [currentRecord, setCurrentRecord] = useState();
  const [currentRecordType, setCurrentRecordType] = useState();

  async function fetchTrendingPeople() {
    const populars = await PersonAPI.fetchTrendingPeople();
    console.log(populars);
    setCurrentRecord(populars);
    setCurrentRecordType("person");
  }

  useEffect(() => {
    fetchTrendingPeople();
  }, []);

  return (
    <>
      <div
        className={s.main_container}
        style={{
          background:
            currentRecord && currentRecordType === "person"
              ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentRecord.profile_path}") no-repeat center / cover`
              : "black",
        }}
      >
        <div className={s.header}>
          <div className="row">
            <div className="col-4">
              <span>LOGO HERE</span>
            </div>
            <div className="col-md-12 col-lg-2">
              <SearchSelector className="col-md-12 col-lg-2" />
            </div>
            <div className="col-md-12 col-lg-6">
              <SearchBar className="col-md-12 col-lg-6" />
            </div>
          </div>
        </div>
        <div className={s.details}>
          {currentRecord && currentRecordType === "person" && (
            <PersonDetail record={currentRecord} />
          )}
        </div>
        <div className={s.list}>LIST</div>
      </div>
    </>
  );
}
