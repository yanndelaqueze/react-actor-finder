import s from "./style.module.css";

export function TVShowDetail({ record }) {
  return (
    <div>
      <div className={s.head}>
        <div className={s.title}>{record.name}</div>
      </div>
      <div className={s.info}>
        <p>First Air Date : {record.first_air_date.substring(0, 4)}</p>
        <p>
          Seasons : {record.number_of_seasons} / Episodes :{" "}
          {record.number_of_episodes}
        </p>
      </div>
      <div className={s.overview}>{record.overview}</div>
    </div>
  );
}
