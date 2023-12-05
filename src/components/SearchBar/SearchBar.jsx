import s from "./style.module.css";
import { Search as SearchIcon } from "react-bootstrap-icons";
import React, { useState, useEffect } from "react";

export function SearchBar({ searchType, onSubmit, onInput }) {
  const [inputValue, setInputValue] = useState("");

  let placeHolderText = "Search Actor/Actress";
  switch (searchType) {
    case "movie":
      placeHolderText = "Search Movie";
      break;
    case "tv":
      placeHolderText = "Search TV Show";
      break;
    case "person":
      placeHolderText = "Search Actor/Actress";
      break;
    default:
      placeHolderText = "Search Actor/Actress";
      break;
  }

  function submit(e) {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setInputValue("");
      onSubmit(e.target.value);
    }
  }

  function getInput(e) {
    setInputValue(e.target.value);
    onInput(e.target.value);
  }

  useEffect(() => {
    setInputValue(inputValue);
  }, [inputValue]);

  return (
    <>
      <SearchIcon size={27} className={s.icon} />
      <input
        onKeyUp={submit}
        value={inputValue}
        onChange={getInput}
        type="text"
        placeholder={placeHolderText}
        className={s.input}
        autoFocus
      />
    </>
  );
}
