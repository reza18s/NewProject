import { MdOutlineLibraryAdd } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "./TextList.module.css";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

function TextList({
  data,
  setData,
}: {
  data: string[];
  setData: (event: any) => void;
}) {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const list = [...data];
    list[index] = value;
    setData(list);
  };

  const addHandler = () => {
    setData([...data, ""]);
  };

  const deleteHandler = (index: number) => {
    const list = [...data];
    list.splice(index, 1);
    setData(list);
  };

  return (
    <>
      {data.map((i, index) => (
        <div className={styles.card} key={index}>
          <input
            type="text"
            value={i}
            onChange={(e) => changeHandler(e, index)}
          />
          <button onClick={() => deleteHandler(index)}>
            حذف
            <AiOutlineDelete />
          </button>
        </div>
      ))}
      <button onClick={addHandler} type="button">
        افزودن
        <MdOutlineLibraryAdd />
      </button>
    </>
  );
}

export default TextList;
