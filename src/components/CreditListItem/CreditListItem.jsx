import s from "./style.module.css";
import { SMALL_IMAGE_BASE_URL } from "../../config";
import { Film, Tv } from "react-bootstrap-icons";
import no_image from "../../assets/images/no-image.jpeg";

export function CreditListItem({ credit }) {
  function getLogo() {
    if (credit.media_type === "movie") {
      return <Film />;
    } else if (credit.media_type === "tv") {
      return <Tv />;
    }
  }

  function getDate() {
    if (credit.media_type === "movie") {
      return credit.release_date.substring(0, 4);
    } else if (credit.media_type === "tv") {
      return credit.first_air_date.substring(0, 4);
    }
  }

  function getTitle() {
    if (credit.media_type === "movie" && credit.original_title.length >= 25) {
      return credit.original_title.substring(0, 25) + "...";
    }
    if (credit.media_type === "movie" && credit.original_title.length < 25) {
      return credit.original_title;
    }
    if (credit.media_type === "tv" && credit.original_name.length >= 25) {
      return credit.original_name.substring(0, 25) + "...";
    }
    if (credit.media_type === "tv" && credit.original_name.length < 25) {
      return credit.original_name;
    }
  }

  function getImage() {
    if (credit.backdrop_path) {
      return SMALL_IMAGE_BASE_URL + credit.backdrop_path;
    } else {
      return no_image;
    }
  }

  return (
    <div className={s.container}>
      <img className={s.img} src={getImage()} alt={getTitle()} />
      <div className={s.title}>
        {getTitle()} ({getDate()})
      </div>
      <div className={s.logo}>{getLogo()}</div>
    </div>
  );
}
