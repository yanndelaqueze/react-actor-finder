import s from "./style.module.css";

export function MovieDetail({ record }) {
  return (
    <div>
      <div className={s.head}>
        <div className={s.title}>{record.original_title}</div>
      </div>
      <div className={s.overview}>{record.overview}</div>
    </div>
  );
}