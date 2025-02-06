type RowType = {
  key: string;
  disciplina: string;
  creditos: number;
  nf: number;
};

type RowProps = {
    type: 0 | 1 | 2;
    row?: RowType;
    handleRows: (row: RowType, action: "insert" | "update" | "delete") => void;
};