import s from "./style.module.css";
import { SMALL_IMAGE_BASE_URL } from "../../config";
import no_photo from "../../assets/images/no-photo.png";

export function CastListItem({ castMember }) {
  function getPhoto() {
    if (castMember.profile_path) {
      return SMALL_IMAGE_BASE_URL + castMember.profile_path;
    } else {
      return no_photo;
    }
  }
  return (
    <div>
      <div className={s.container}>
        <img className={s.img} src={getPhoto()} alt={castMember.name} />
        <div className={s.name}>{castMember.name}</div>
        <div className={s.character}>as {castMember.character}</div>
      </div>
    </div>
  );
}
