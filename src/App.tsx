import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/pt-br';
import { CheckIcon, MinusIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import './App.css';

dayjs.extend(customParseFormat);
dayjs.locale('pt-br');

type RowType = {
  key: string;
  disciplina: string;
  creditos: number | string;
  nf: number | string;
};

function App() {
  const [rows, setRows] = useState<RowType[]>([]);

  useEffect(() => {
    const items = Array.from({ length: localStorage.length }, (_, i) => {
      const key = localStorage.key(i);
      return key?.startsWith('row') ? JSON.parse(localStorage.getItem(key) || '{}') : null;
    }).filter(Boolean);

    setRows(items);
  }, []);

  const handleRows = (row: RowType, action: 'insert' | 'update' | 'delete') => {
    let updatedRows;

    if (action === 'insert') {
      updatedRows = [...rows, row];
    } else if (action === 'update') {
      updatedRows = rows.map(r => (r.key === row.key ? row : r));
    } else {
      updatedRows = rows.filter(r => r.key !== row.key);
    }

    setRows(updatedRows);
    localStorage.setItem(`row-${row.key}`, JSON.stringify(row));
  };

  return (
    <div className='bg-gray-900 p-2 text-white'>
      <div className='my-table'>
        <HeaderTable />
        <div className='flex flex-col gap-4 my-table-body'>
          <Row handleRows={handleRows} type='add' />
          {rows.map(row => (
            <Row key={row.key} handleRows={handleRows} row={row} type='edit' />
          ))}
        </div>
      </div>
    </div>
  );
}

const HeaderTable = () => (
  <div className='h-7 mb-4 flex border-b-1 border-gray-500 gap-1 my-table-header'>
    {['Disciplina', 'Créditos', 'NF', ''].map((header, index) => (
      <div key={index} className={`size-10 ${index === 0 ? 'grow-3' : 'grow-1'}`}>
        <p>{header}</p>
      </div>
    ))}
  </div>
);

type RowProps = {
  type: 'add' | 'edit';
  row?: RowType;
  handleRows: (row: RowType, action: 'insert' | 'update' | 'delete') => void;
};

const Row = ({ row, type, handleRows }: RowProps) => {
  const [disciplina, setDisciplina] = useState(row?.disciplina || '');
  const [creditos, setCreditos] = useState(row?.creditos || '');
  const [nf, setNF] = useState(row?.nf || '');

  const handleSubmit = () => {
    if (type === 'add') {
      const newRow = { key: uuidv4(), disciplina, creditos, nf };
      handleRows(newRow, 'insert');
      setDisciplina('');
      setCreditos('');
      setNF('');
    } else {
      handleRows({ ...row!, disciplina, creditos, nf }, 'update');
    }
  };

  const handleRemove = () => row && handleRows(row, 'delete');

  return (
    <div className='flex gap-1 my-table-row'>
      {[setDisciplina, setCreditos, setNF].map((setValue, index) => (
        <div key={index} className={`size-10 ${index === 0 ? 'grow-3' : 'grow-1'}`}>
          <input
            type={index === 0 ? 'text' : 'number'}
            placeholder={['Disciplina', 'Créditos', 'NF'][index]}
            value={[disciplina, creditos, nf][index]}
            onChange={e => setValue(e.target.value)}
            className='w-full bg-gray-800 p-2 rounded-sm drop-shadow-lg focus:outline-2 focus:outline-purple-300 border-0'
          />
        </div>
      ))}
      <div className='size-10 w-10 grow-0'>
        <button
          onClick={type === 'add' ? handleSubmit : type === 'edit' ? handleRemove : undefined}
          type='button'
          className='w-full h-full bg-gray-800 p-[10px] rounded-sm drop-shadow-lg active:bg-gray-900'
        >
          {type === 'add' ? <PaperPlaneIcon className='w-full h-full text-purple-300' /> : <MinusIcon className='w-full h-full text-purple-300' />}
        </button>
      </div>
    </div>
  );
};

export default App;
