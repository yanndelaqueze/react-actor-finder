import s from "./style.module.css";

export function TVShowDetail({ record }) {
  return (
    <div>
      <div className={s.head}>
        <div className={s.title}>{record.name}</div>
      </div>
      <div className={s.overview}>{record.overview}</div>
    </div>
  );
}
