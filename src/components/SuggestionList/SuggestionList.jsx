import s from "./style.module.css";
import { SuggestionListItem } from "../../components/SuggestionListItem/SuggestionListItem";

export function SuggestionList({ suggestionList }) {
  return (
    <>
      <div className={s.list}>
        {suggestionList.map((suggestion, i) => {
          return (
            <span key={suggestion.name + i} className={s.suggestion_list_item}>
              <SuggestionListItem suggestion={suggestion} />
            </span>
          );
        })}
      </div>
    </>
  );
}
