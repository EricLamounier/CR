import { CheckIcon, MinusIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RowProps } from "../utils";

const Row = ({ row, type, handleRows }: RowProps) => {
    const [disciplina, setDisciplina] = useState(row?.disciplina || "");
    const [creditos, setCreditos] = useState(row?.creditos || "");
    const [nf, setNF] = useState(row?.nf || "");
    const [currentType, setCurrentType] = useState(type);
    const disciplinaInputRef = useRef<HTMLInputElement>(null);
  
    const handleSubmit = () => {
      if (currentType === 0) {
        const newRow = {
          key: uuidv4(),
          disciplina: disciplina ?? "",
          creditos: Number(creditos),
          nf: Number(nf),
        };
  
        console.log(newRow)
  
        handleRows(newRow, "insert");
        setDisciplina("");
        setCreditos("");
        setNF("");
  
        disciplinaInputRef.current && disciplinaInputRef.current.focus();
      } else if (currentType === 1) {
        handleRows(
          {
            ...row!,
            disciplina,
            creditos: Number(creditos),
            nf: Number(nf) ?? 0,
          },
          "update",
        );
        setCurrentType(2);
      } else if (currentType === 2) {
        row && handleRows(row, "delete");
      }
    };
  
    const handleType = () => {
      if (currentType !== 0) {
        setCurrentType(1);
      }
    };
  
    const handleChange =
      <T,>(setter: React.Dispatch<React.SetStateAction<T>>) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setter(
          value === ""
            ? ("" as T)
            : ((e.target.type === "number" ? Number(value) : value) as T),
        );
        handleType();
      };
  
    return (
      <div className="flex gap-2 my-table-row">
        <div className="size-10 grow-3 ">
          <input
            ref={disciplinaInputRef}
            type="text"
            placeholder="Disciplina"
            value={disciplina}
            onChange={handleChange(setDisciplina)}
            className="w-full h-full bg-zinc-100 dark:bg-gray-800 border-1 border-zinc-500 p-2 rounded-sm placeholder:text-sm focus:outline-2 focus:outline-purple-300"
          />
        </div>
        <div className="size-10 grow-1 ">
          <input
            type="number"
            placeholder="Créditos"
            value={creditos}
            onChange={handleChange(setCreditos)}
            className="w-full h-full bg-zinc-100 dark:bg-gray-800 border-1 border-zinc-500 p-2 rounded-sm placeholder:text-sm focus:outline-2 focus:outline-purple-300"
          />
        </div>
        <div className="size-10 grow-1 ">
          <input
            type="number"
            placeholder="NF"
            value={nf}
            onChange={handleChange(setNF)}
            className="w-full h-full bg-zinc-100 dark:bg-gray-800 border-1 border-zinc-500 p-2 rounded-sm placeholder:text-sm focus:outline-2 focus:outline-purple-300"
          />
        </div>
        <div className="size-10 w-10 grow-0 ">
          <button
            onClick={handleSubmit}
            type="button"
            className="w-full h-ful bg-purple-600 p-[10px] rounded-sm placeholder:text-sm active:bg-gray-900"
          >
            {(() => {
              if (currentType === 0) {
                return (
                  <PaperPlaneIcon className="w-full h-full text-white" />
                );
              } else if (currentType === 1) {
                return <CheckIcon className="w-full h-full text-white" />;
              } else if (currentType === 2) {
                return (
                  <MinusIcon className="w-full h-full text-white dark:fill-purple-200" />
                );
              }
            })()}
          </button>
        </div>
      </div>
    );
  };

  export default Row;