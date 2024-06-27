import React from "react";

interface SectionSizeSelectorProps {
  rows: number;
  cols: number;
  setRows: (rows: number) => void;
  setCols: (cols: number) => void;
  planterType: string;
  setPlanterType: (type: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const SectionSizeSelector: React.FC<SectionSizeSelectorProps> = ({
  rows,
  cols,
  setRows,
  setCols,
  planterType,
  setPlanterType,
  onSave,
  onCancel,
}) => {
  return (
    <div className="font-primaryBold">
      <h2 className="text-lg font-bold mb-4">セクションのサイズを選択</h2>
      <div className="mb-4">
        <label className="block mb-1">行の数:</label>
        <select
          value={rows}
          onChange={(e) => setRows(parseInt(e.target.value))}
          className="border rounded p-2"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">列の数:</label>
        <select
          value={cols}
          onChange={(e) => setCols(parseInt(e.target.value))}
          className="border rounded p-2"
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">プランタータイプ:</label>
        <select
          value={planterType}
          onChange={(e) => setPlanterType(e.target.value)}
          className="border rounded p-2"
        >
          <option value="苗植え">苗植え</option>
          <option value="寄せ植え">寄せ植え</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          onClick={onCancel}
          className="mr-4 px-4 py-2 bg-gray-200 rounded"
        >
          キャンセル
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          保存
        </button>
      </div>
    </div>
  );
};

export default SectionSizeSelector;
