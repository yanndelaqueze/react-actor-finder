import s from "./style.module.css";

export function SuggestionListItem({ suggestion }) {
  return (
    <>
      <p className={s.suggestion_item}>
        {suggestion.name} ({suggestion.known_for_department})
      </p>
    </>
  );
}
