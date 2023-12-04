import s from "./style.module.css";
import { CastListItem } from "../CastListItem/CastListItem";

export function CastList({ castList, currentRecordType, onClickItem }) {
  function getRecordType() {
    if (currentRecordType === "movie") {
      return "movie";
    }
    if (currentRecordType === "tv") {
      return "TV show";
    }
  }
  return (
    <>
      <div className={s.title}>
        In this {getRecordType()}, you may have seen
      </div>
      <div className={s.list}>
        {castList.map((castMember, i) => {
          return (
            <span key={castMember.id + i} className={s.cast_member}>
              <CastListItem castMember={castMember} onClick={onClickItem} />
            </span>
          );
        })}
      </div>
    </>
  );
}
