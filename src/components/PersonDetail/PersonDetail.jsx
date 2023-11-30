import s from "./style.module.css";

export function PersonDetail({ record }) {
  return (
    <div>
      <div className={s.name}>{record.name}</div>
      <div className={s.biography}>{record.biography}</div>
    </div>
  );
}
