import s from "./style.module.css";
import { useEffect, useState } from "react";
import { MovieAPI } from "../../api/movie";
import { SMALL_IMAGE_BASE_URL } from "../../config";
import no_photo from "../../assets/images/no-photo.png";

export function MovieDetail({ record }) {
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

  console.log(director);

  function getPhoto() {
    if (director.profile_path) {
      return SMALL_IMAGE_BASE_URL + director.profile_path;
    } else {
      return no_photo;
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
      {director && (
        <>
          <p> Directed by : </p>
          <div className={s.director}>
            <img
              className={s.director_photo}
              src={getPhoto()}
              alt={director.name}
            />
            <p>{director.name}</p>
          </div>
        </>
      )}
      <div className={s.overview}>{record.overview}</div>
    </div>
  );
}
