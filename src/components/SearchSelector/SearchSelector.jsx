import { Film, Tv, Person } from "react-bootstrap-icons";
import s from "./style.module.css";

export function SearchSelector(props) {
  return (
    <>
      <div className={s.container}>
        <Film className={s.selector} />
        <Tv className={s.selector} />
        <Person className={s.selector} />
      </div>
    </>
  );
}
