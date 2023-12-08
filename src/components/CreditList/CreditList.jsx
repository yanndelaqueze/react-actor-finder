import s from "./style.module.css";
import { CreditListItem } from "../CreditListItem/CreditListItem";

export function CreditList({ creditList, currentRecord, onClickItem, type }) {
  function getGender() {
    if (currentRecord.gender === 1) {
      return "her";
    } else {
      return "him";
    }
  }

  function getGender2() {
    if (currentRecord.gender === 1) {
      return "She";
    } else {
      return "He";
    }
  }

  return (
    <>
      {type === "acting" && (
        <>
          <div className={s.title}>You may have seen {getGender()} in : </div>
          <div className={s.list}>
            {creditList.map((credit, i) => {
              return (
                <span
                  key={credit.id + "/" + credit.character}
                  className={s.credit_list_item}
                >
                  <CreditListItem
                    credit={credit}
                    onClick={onClickItem}
                    type="acting"
                  />
                </span>
              );
            })}
          </div>
        </>
      )}
      {type === "directing" && (
        <>
          <div className={s.title}>{getGender2()} directed : </div>
          <div className={s.list}>
            {creditList.map((credit, i) => {
              return (
                <span key={credit.id + i} className={s.credit_list_item}>
                  <CreditListItem
                    credit={credit}
                    onClick={onClickItem}
                    type="directing"
                  />
                </span>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
