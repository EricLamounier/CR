import "./App.css";
import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import InfoDialog from "./components/dialog";

import logoUFVWhite from './assets/ufvcrpwhite.png'
import Row from "./components/row";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { RowType } from "./components/utils";

dayjs.extend(customParseFormat);
dayjs.locale("pt-br");


function App() {
  const [rows, setRows] = useState<RowType[]>([]);
  const [totalCR, setTotalCR] = useState('0');
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

    const CR = (nf / (creditos <= 0 ? 1 : creditos));

    if (Number(CR) >= 60) { // Azul
      setSituacao(0);
    } else {
      if (reprovacoes >= aprovacoes) { // Vermelho
        setSituacao(2);
      } else { // Amarelo
        setSituacao(1);
      }
    }

    setAprovacoes(aprovacoes);
    setReprovacoes(reprovacoes);
    setTotalCR(String(CR).slice(0, 4));
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
    <div className="flex flex-col gap-4 text-zinc-800 w-full h-full p-2 dark:text-white">
      <div className="my-main flex flex-col gap-4 h-full">
        <div className="my-table">
          <HeaderTable />
          <div className="flex flex-col gap-4 my-table-body">
            <Row handleRows={handleRows} type={0} />
            <div className="h-[1px] w-full bg-zinc-500" />
            {rows.map((row) => (
              <Row key={row.key} handleRows={handleRows} row={row} type={2} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p>CR</p>
            <div className="h-[1px] grow bg-zinc-500 mx-4" />
            <p className="text-lg">{totalCR}</p>
          </div>
          <div className={`flex items-center justify-center h-8 relative px-4 text-center ${situacao == 0 ? "bg-blue-300" : situacao == 1 ? "bg-yellow-200" : "bg-red-300"} text-zinc-800 text-center rounded`}>
            <p>
              {situacao == 0
                ? "Coeficiente Bom (Azul)"
                : situacao == 1
                  ? "Coeficiente Mediano (Amarelo)"
                  : "Coeficiente Insuficiente (Vermelho)"}
            </p>
            <InfoDialog aprovacoes={aprovacoes} reprovacoes={reprovacoes} cr={totalCR}/>
          </div>
        </div>
      </div>
      <a className="w-full mt-5 flex items-center justify-center gap-2 text-sm" href="https://github.com/EricLamounier" target="_blank">
        <GitHubLogoIcon />
        <p>&lt;/&gt; Eric Lamounier</p>
      </a>
    </div>
  );
}

const HeaderTable = () => (
  <div className="flex justify-between items-center gap-2 h-20 mb-8 drop-shadow-sm bg-purple-600 rounded px-3 py-2 text-center text-white text-lg my-table-header">
    <p className="text-start text-md">Simule aqui seu coeficiente de rendimento do período ☺️</p>
    <img className="h-full" src={logoUFVWhite} alt="Logo UFV" />
  </div>
);
export default App;
