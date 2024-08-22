import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import styles from "./CustomDatePicker.module.css";

function CustomDatePicker({
  data,
  setData,
}: {
  data: Date;
  setData: (event: any[]) => void;
}) {
  const changeHandler = (e: any) => {
    const date = new Date(e);
    setData(date);
  };

  return (
    <div className={styles.container}>
      <p>تاریخ ساخت</p>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={data}
        onChange={changeHandler}
        calendarPosition="bottom-right"
      />
    </div>
  );
}

export default CustomDatePicker;
