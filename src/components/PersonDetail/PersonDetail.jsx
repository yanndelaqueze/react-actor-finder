import s from "./style.module.css";
import { IMAGE_BASE_URL } from "../../config";

export function PersonDetail({ record }) {
  return (
    <div>
      <div className={s.head}>
        <img
          className={s.image}
          src={IMAGE_BASE_URL + record.profile_path}
          alt=""
        />
        <div className={s.name}>{record.name}</div>
      </div>
      <div className={s.biography}>{record.biography}</div>
    </div>
  );
}
