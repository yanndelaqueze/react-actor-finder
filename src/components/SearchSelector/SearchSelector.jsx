import { Film, Tv, Person } from "react-bootstrap-icons";
import s from "./style.module.css";

export function SearchSelector({ onClickItem, value }) {
  return (
    <>
      <div className={s.container}>
        <Film
          className={s.selector}
          onClick={() => onClickItem("movie")}
          style={{ color: value === "movie" ? "#e1b34b" : "inherit" }}
        />
        <Tv
          className={s.selector}
          onClick={() => onClickItem("tv")}
          style={{ color: value === "tv" ? "#e1b34b" : "inherit" }}
        />
        <Person
          className={s.selector}
          onClick={() => onClickItem("person")}
          style={{ color: value === "person" ? "#e1b34b" : "inherit" }}
        />
      </div>
    </>
  );
}
