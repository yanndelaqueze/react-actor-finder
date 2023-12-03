import s from "./style.module.css";

export function SuggestionListItem({ suggestion }) {
  return (
    <>
      <div className={s.suggestion_item}>
        <div className={s.name}>{suggestion.name}</div>
        <div className={s.known_for}>({suggestion.known_for_department})</div>
      </div>
    </>
  );
}
