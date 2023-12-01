import s from "./style.module.css";
import { SMALL_IMAGE_BASE_URL } from "../../config";

export function CastListItem({ castMember }) {
  return (
    <div>
      <div className={s.container}>
        <img
          className={s.img}
          src={SMALL_IMAGE_BASE_URL + castMember.profile_path}
          alt={castMember.name}
        />
        <div className={s.name}>{castMember.name}</div>
        <div className={s.character}>as {castMember.character}</div>
      </div>
    </div>
  );
}
