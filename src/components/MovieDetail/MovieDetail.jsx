import s from "./style.module.css";
import { useEffect, useState } from "react";
import { MovieAPI } from "../../api/movie";
import { SMALL_IMAGE_BASE_URL, IMAGE_BASE_URL } from "../../config";
import no_photo from "../../assets/images/no-photo.png";

export function MovieDetail({ record, onClick }) {
  const [director, setDirector] = useState();

  async function getDirector(id) {
    const director = await MovieAPI.getDirector(id);
    if (director) {
      setDirector(director);
    }
  }

  useEffect(() => {
    if (record) {
      getDirector(record.id);
    }
  }, [record]);

  function getDirectorPhoto() {
    if (director.profile_path) {
      return SMALL_IMAGE_BASE_URL + director.profile_path;
    } else {
      return no_photo;
    }
  }

  function getPoster() {
    if (record.poster_path) {
      return IMAGE_BASE_URL + record.poster_path;
    } else {
      return;
    }
  }

  return (
    <div>
      <div className={s.head}>
        <div className={s.title}>{record.original_title}</div>
      </div>
      <div className={s.info}>
        ({record.release_date.substring(0, 4)}
        {" - "}
        {record.production_countries[0].name})
      </div>
      <div className={s.details}>
        <img className={s.poster} src={getPoster()} alt="" />
        {director && (
          <>
            <div className={s.director} onClick={() => onClick(director.id)}>
              <p> Directed by : </p>
              <img
                className={s.director_photo}
                src={getDirectorPhoto()}
                alt={director.name}
              />
              <p>{director.name}</p>
            </div>
          </>
        )}
      </div>
      <div className={s.overview}>{record.overview}</div>
    </div>
  );
}
