import s from "./style.module.css";
import { CreditListItem } from "../CreditListItem/CreditListItem";

export function CreditList({ creditList, currentRecord, onClickItem }) {
  function getGender() {
    if (currentRecord.gender === 1) {
      return "her";
    } else {
      return "him";
    }
  }

  return (
    <>
      <div className={s.title}>You have seen {getGender()} in</div>
      <div className={s.list}>
        {creditList.map((credit) => {
          return (
            <span key={credit.id} className={s.credit_list_item}>
              <CreditListItem credit={credit} onClick={onClickItem} />
            </span>
          );
        })}
      </div>
    </>
  );
}
