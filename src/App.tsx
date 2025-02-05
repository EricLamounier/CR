import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import {
  CheckIcon,
  MinusIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import "./App.css";
import InfoDialog from "./components/dialog";

dayjs.extend(customParseFormat);
dayjs.locale("pt-br");

type RowType = {
  key: string;
  disciplina: string;
  creditos: number;
  nf: number;
};

function App() {
  const [rows, setRows] = useState<RowType[]>([]);
  const [totalCreditos, setTotalCreditos] = useState(0);
  const [totalNF, setTotalNF] = useState(0);
  const [totalCR, setTotalCR] = useState(0);
  const [situacao, setSituacao] = useState<0 | 1 | 2>(0);
  const [aprovacoes, setAprovacoes] = useState(0);
  const [reprovacoes, setReprovacoes] = useState(0);

  useEffect(() => {
    let creditos = 0;
    let nf = 0;
    let aprovacoes = 0;
    let reprovacoes = 0;

    for (const row of rows) {
      creditos += row.creditos;
      nf += row.nf * row.creditos;
      row.nf < 60 ? reprovacoes++ : aprovacoes++;
    }

    const CR = Number((nf / (creditos <= 0 ? 1 : creditos)).toFixed(4));

    if (CR >= 60) {
      // Azul
      setSituacao(0);
    } else {
      if (reprovacoes >= aprovacoes) {
        // Vermelho
        setSituacao(2);
      } else {
        // Amarelo
        setSituacao(1);
      }
    }

    setAprovacoes(aprovacoes);
    setReprovacoes(reprovacoes);
    setTotalCR(CR);
    setTotalCreditos(creditos);
    setTotalNF(nf);
  }, [rows]);

  useEffect(() => {
    const items = Array.from({ length: localStorage.length }, (_, i) => {
      const key = localStorage.key(i);
      return key?.startsWith("CR")
        ? JSON.parse(localStorage.getItem(key) || "{}")
        : null;
    }).filter(Boolean);

    setRows(items);
  }, []);

  const handleRows = (row: RowType, action: "insert" | "update" | "delete") => {
    let updatedRows;

    if (action === "insert") {
      updatedRows = [...rows, row];
      localStorage.setItem(`CR-${row.key}`, JSON.stringify(row));
    } else if (action === "update") {
      updatedRows = rows.map((r) => (r.key === row.key ? row : r));
      localStorage.removeItem(`CR-${row.key}`);
      localStorage.setItem(`CR-${row.key}`, JSON.stringify(row));
    } else if (action === "delete") {
      localStorage.removeItem(`CR-${row.key}`);
      updatedRows = rows.filter((r) => r.key !== row.key);
    } else {
      return;
    }

    setRows(updatedRows);
  };

  return (
    <div className="w-full h-full bg-zinc-50 dark:bg-gray-900 p-2 text-white">
      <div className="my-table">
        {/*<HeaderTable />*/}
        <div className="flex flex-col gap-4 my-table-body">
          <Row handleRows={handleRows} type={0} />
          {rows.map((row) => (
            <Row key={row.key} handleRows={handleRows} row={row} type={2} />
          ))}
        </div>
      </div>
      <div>
        <p>total NF</p>
        <p>{totalNF}</p>

        <p>total NF</p>
        <p>{totalNF}</p>

        <p>CR</p>
        <p>{totalCR}</p>

        <p>situacao</p>

        <p
          className={`flex items-center justify-center h-8 relative px-4 text-center ${situacao == 0 ? "bg-blue-300" : situacao == 1 ? "bg-yellow-200" : "bg-red-300"} text-center rounded`}
        >
          <span>
            {situacao == 0
              ? "Coeficiente Bom (Azul)"
              : situacao == 1
                ? "Coeficiente Mediano (Amarelo)"
                : "Coeficiente Insuficiente (Vermelho)"}
          </span>
          <InfoDialog />
        </p>
      </div>
    </div>
  );
}

const HeaderTable = () => (
  <div className="h-7 mb-4 flex border-b-1 border-gray-500 gap-1 my-table-header">
    {["Disciplina", "Créditos", "NF", ""].map((header, index) => (
      <div
        key={index}
        className={`size-10 ${index === 0 ? "grow-3" : "grow-1"}`}
      >
        <p>{header}</p>
      </div>
    ))}
  </div>
);

type RowProps = {
  type: 0 | 1 | 2;
  row?: RowType;
  handleRows: (row: RowType, action: "insert" | "update" | "delete") => void;
};

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

      handleRows(newRow, "insert");
      setDisciplina("");
      setCreditos("");
      setNF("");
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

    disciplinaInputRef.current && disciplinaInputRef.current.focus();
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
    <div className="flex gap-1 my-table-row">
      <div className="size-10 grow-3 ">
        <input
          ref={disciplinaInputRef}
          type="text"
          placeholder="Disciplina"
          value={disciplina}
          onChange={handleChange(setDisciplina)}
          className="w-full bg-zinc-100 border-1 border-zinc-400 p-2 rounded-sm focus:outline-2 focus:outline-purple-300 border-0"
        />
      </div>
      <div className="size-10 grow-1 ">
        <input
          type="number"
          placeholder="Créditos"
          value={creditos}
          onChange={handleChange(setCreditos)}
          className="w-full bg-zinc-100 border-1 border-zinc-400 p-2 rounded-sm focus:outline-2 focus:outline-purple-300 border-0"
        />
      </div>
      <div className="size-10 grow-1 ">
        <input
          type="number"
          placeholder="NF"
          value={nf}
          onChange={handleChange(setNF)}
          className="w-full bg-zinc-100 border-1 border-zinc-400 p-2 rounded-sm focus:outline-2 focus:outline-purple-300 border-0"
        />
      </div>
      <div className="size-10 w-10 grow-0 ">
        <button
          onClick={handleSubmit}
          type="button"
          className="w-full h-full bg-zinc-100 border p-[10px] rounded-sm active:bg-gray-900"
        >
          {(() => {
            if (currentType === 0) {
              return (
                <PaperPlaneIcon className="w-full h-full text-purple-300" />
              );
            } else if (currentType === 1) {
              return <CheckIcon className="w-full h-full text-purple-300" />;
            } else if (currentType === 2) {
              return (
                <MinusIcon className="w-full h-full text-purple-300 dark:fill-purple-200" />
              );
            }
          })()}
        </button>
      </div>
    </div>
  );
};

export default App;
