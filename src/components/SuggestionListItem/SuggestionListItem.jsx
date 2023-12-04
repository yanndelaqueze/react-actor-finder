import s from "./style.module.css";

export function SuggestionListItem({ suggestion, searchType }) {
  return (
    <>
      {searchType === "person" && (
        <div className={s.suggestion_item}>
          <div className={s.name}>{suggestion.name}</div>
          <div className={s.known_for}>({suggestion.known_for_department})</div>
        </div>
      )}
      {searchType === "movie" && (
        <div className={s.suggestion_item}>
          <div className={s.name}>{suggestion.original_title}</div>
          <div className={s.info}>
            ({suggestion.release_date.substring(0, 4)})
          </div>
        </div>
      )}
      {searchType === "tv" && (
        <div className={s.suggestion_item}>
          <div className={s.name}>{suggestion.name}</div>
          {suggestion.first_air_date && (
            <div className={s.info}>
              ({suggestion.first_air_date.substring(0, 4)})
            </div>
          )}
        </div>
      )}
    </>
  );
}
