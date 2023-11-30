import s from "./style.module.css";
import { Search as SearchIcon } from "react-bootstrap-icons";
import React, { useState } from "react";

export function SearchBar({ searchType, onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  let placeHolderText = "Search an actor/actress";

  switch (searchType) {
    case "movie":
      placeHolderText = "Search a Movie";
      break;
    case "tv-show":
      placeHolderText = "Search a TV Show";
      break;
    case "person":
      placeHolderText = "Search an actor/actress";
      break;
    default:
      placeHolderText = "Search an actor/actress";
      break;
  }

  function submit(e) {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      console.log(e.target.value);
      onSubmit(e.target.value);
      setInputValue("");
    }
  }

  function onChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <>
      <SearchIcon size={27} className={s.icon} />
      <input
        onKeyUp={submit}
        value={inputValue}
        onChange={onChange}
        type="text"
        placeholder={placeHolderText}
        className={s.input}
      />
    </>
  );
}
