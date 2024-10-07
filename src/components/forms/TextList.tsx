import { MdOutlineLibraryAdd } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { ChangeEvent } from "react";
import { Button } from "../ui/button";

function TextList({
  data,
  setData,
}: {
  data: string[];
  setData: (event: unknown) => void;
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
        <div className="my-[10px] flex" key={index}>
          <input
            className="ml-3 h-8 w-[300px] rounded-sm border border-dashed border-primary/70 px-2 py-1 text-foreground/80 outline-none focus:border-solid"
            type="text"
            value={i}
            onChange={(e) => changeHandler(e, index)}
          />
          <button
            onClick={() => deleteHandler(index)}
            className="m-0 flex items-center rounded-md border border-destructive bg-background text-destructive"
          >
            حذف
            <AiOutlineDelete />
          </button>
        </div>
      ))}
      <Button onClick={addHandler} type="button" className="">
        افزودن
        <MdOutlineLibraryAdd />
      </Button>
    </>
  );
}

export default TextList;
