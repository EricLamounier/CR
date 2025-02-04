import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/pt-br';

import { MinusIcon, PaperPlaneIcon } from '@radix-ui/react-icons';

import './App.css';

dayjs.extend(customParseFormat);
dayjs.locale('pt-br');

type RowType = {
  key?: string;
  disciplina: string;
  creditos: number;
  nf: number;
}

function App() {

  const [totalCreditos, setTotalCreditos] = useState(0)
  const [totalNF, setTotalNF] = useState(0)
  const [rows, setRows] = useState<RowType[]>([]);

  useEffect(()=>{
    const items = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("row")) {
        const value = localStorage.getItem(key);
        items.push(value && JSON.parse(value));
      }
    }
    console.log(items)
    setRows(items)
  },[0]);

  return (
    <div className='bg-gray-900 p-4 text-white'>
      <div className='my-table'>
        <div className='flex flex-col gap-4 my-table-header'>
          <HeaderTable />
        </div>
        <div className='flex flex-col gap-4 my-table-body'>
          {
            rows.map(row => {
              return <Row disciplina={row.disciplina} creditos={row.creditos} nf={row.nf} key={row.key}/>
            })
          }
        </div>
      </div>

      <div className='flex gap-2 w-full my-total mt-10'>
        <div className="size-18 grow-1 ">
          <p>Total Créditos</p>
          <input 
            type="number"
            readOnly
            disabled
            placeholder="Créditos" 
            className="w-full bg-gray-800 p-2 rounded-sm drop-shadow-lg focus:outline-2 focus:outline-purple-300 border-0"/>
        </div>
        <div className="size-18 grow-1 ">
          <p>Total NF</p>
          <input 
            type="number"
            readOnly
            disabled
            placeholder="NF" 
            className="w-full bg-gray-800 p-2 rounded-sm drop-shadow-lg focus:outline-2 focus:outline-purple-300 border-0"/>
        </div>
      </div>
    </div>
  );
}

const HeaderTable = () => {
  return (
    <div className="h-7 mb-4 flex border-b-1 border-gray-500 gap-1 my-table-header">
      <div className="size-10 grow-3 ">
        <p>Disciplina</p>
      </div>
      <div className="size-10 grow-1 ">
        <p>Créditos</p>
      </div>
      <div className="size-10 grow-1 ">
        <p>NF</p>
      </div>
      <div className="size-10 w-10 grow-0 ">
        <p></p>
      </div>
    </div>
  )
}



const Row = ({disciplina, creditos, nf} : RowType) => {
  const teste = () => {
    localStorage.setItem('row-1', JSON.stringify({key: 'row-134',disciplina: 'disc', creditos: 12, nf: 244}))
  }

  const [disciplinaValue, setDisciplinaValue] = useState(disciplina)
  const [creditosValue, setCreditosValue] = useState(creditos)
  const [nfValue, setNFValue] = useState(nf)
  

  return (
    <div className="flex gap-1 my-table-row">
      <div className="size-10 grow-3 ">
        <input 
          type="text"
          placeholder="Disciplina" 
          value={disciplinaValue}
          onChange={(e)=>setDisciplinaValue(e.target.value)}
          className="w-full bg-gray-800 p-2 rounded-sm drop-shadow-lg focus:outline-2 focus:outline-purple-300 border-0"
        />
      </div>
      <div className="size-10 grow-1 ">
        <input 
          type="number"
          placeholder="Créditos"
          value={creditosValue}
          onChange={(e)=>setCreditosValue(Number(e.target.value))}
          className="w-full bg-gray-800 p-2 rounded-sm drop-shadow-lg focus:outline-2 focus:outline-purple-300 border-0"/>
      </div>
      <div className="size-10 grow-1 ">
        <input 
          type="number"
          placeholder="NF" 
          value={nfValue}
          onChange={(e)=>setNFValue(Number(e.target.value))}
          className="w-full bg-gray-800 p-2 rounded-sm drop-shadow-lg focus:outline-2 focus:outline-purple-300 border-0"/>
      </div>
      <div className="size-10 w-10 grow-0 ">
        <button 
          onClick={()=>teste()}
          type="button"
          className="p-2 w-full h-full bg-gray-800 p-2 rounded-sm drop-shadow-lg active:bg-gray-900"
        >
          {/*<PaperPlaneIcon className="w-full h-full text-purple-300" />*/}
          <MinusIcon className="w-full h-full text-purple-300 dark:fill-purple-200" />
        </button>
      </div>
    </div>
  )
}

export default App;