import React from "react";

interface SectionSizeSelectorProps {
  rows: number;
  cols: number;
  setRows: (rows: number) => void;
  setCols: (cols: number) => void;
  planterType: string;
  setPlanterType: (type: string) => void;
  potType: number;
  setPotType: (type: number) => void;
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
  potType,
  setPotType,
  onSave,
  onCancel,
}) => {
  return (
    <div className="font-primaryBold">
      <h2 className="text-clamp-3vw font-bold mb-clamp-4vw">
        セクションのサイズを選択
      </h2>
      <div className="flex gap-clamp-5vw">
        <div className="mb-clamp-4vw">
          <label className="block mb-clamp-1vw">行の数:</label>
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
        <div className="mb-clamp-4vw">
          <label className="block mb-clamp-1vw">列の数:</label>
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
      </div>
      <div className="mb-clamp-4vw">
        <label className="block mb-clamp-1vw">プランタータイプ:</label>
        <select
          value={planterType}
          onChange={(e) => setPlanterType(e.target.value)}
          className="border rounded p-2"
        >
          <option value="苗植え">苗植え</option>
          <option value="寄せ植え">寄せ植え</option>
        </select>
      </div>
      <div className="mb-clamp-4vw">
        <label className="block mb-clamp-1vw">ポットタイプ:</label>
        <select
          value={potType}
          onChange={(e) => setPotType(parseInt(e.target.value))}
          className="border rounded p-2"
        >
          {[0, 1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
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
