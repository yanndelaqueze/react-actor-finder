import s from "./style.module.css";
import { useEffect, useState } from "react";
// BOOTSTRAP ICONS
import { Film, Tv, Person } from "react-bootstrap-icons";

export function App() {
  const [currentRecord, setCurrentRecord] = useState();
  const [currentRecordType, setCurrentRecordType] = useState();

  // setCurrentRecordType("person");
  // setCurrentRecord();

  return (
    <>
      <div className={s.main_container}>
        <div className={s.header}>HEADER</div>
        <div className={s.details}>DETAILS</div>
        <div className={s.list}>LIST</div>
      </div>
    </>
  );
}
