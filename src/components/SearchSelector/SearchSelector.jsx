import { Film, Tv, Person } from "react-bootstrap-icons";
import s from "./style.module.css";

export function SearchSelector({ onClickItem, searchType }) {
  return (
    <>
      <div className={s.container}>
        <Film
          className={s.selector}
          onClick={() => onClickItem("movie")}
          style={{ color: searchType === "movie" ? "#e1b34b" : "inherit" }}
        />
        <Tv
          className={s.selector}
          onClick={() => onClickItem("tv")}
          style={{ color: searchType === "tv" ? "#e1b34b" : "inherit" }}
        />
        <Person
          className={s.selector}
          onClick={() => onClickItem("person")}
          style={{ color: searchType === "person" ? "#e1b34b" : "inherit" }}
        />
      </div>
    </>
  );
}
