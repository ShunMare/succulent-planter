import React, { useEffect } from "react";

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

const potTypeOptions = [
  { value: 0, label: "黒い鉢" },
  { value: 1, label: "猫すっき" },
  { value: 2, label: "濃い茶色い鉢" },
  { value: 3, label: "グレーの鉄でできた鉢" },
  { value: 4, label: "明るい茶色い鉢" },
  { value: 5, label: "白い鉢" },
  { value: 6, label: "グレーのエッジの広い鉢" },
  { value: 7, label: "木で編み込まれたつくられた鉢" },
  { value: 8, label: "青い鉢" },
  { value: 9, label: "緑の鉢" },
  { value: 10, label: "四角いレンガの鉢" },
  { value: 11, label: "緑のエッジの太い鉢" },
  { value: 12, label: "黒いポット" },
  { value: 13, label: "茶色いエッジの細い鉢" },
  { value: 14, label: "木箱の鉢" },
  { value: 15, label: "オレンジ色のポット" },
  { value: 16, label: "シンプルな黒いプランター" },
  { value: 17, label: "黒いプランター" },
  { value: 18, label: "オレンジ色のプランター" },
  { value: 19, label: "プラスチックの黒いポット" },
  { value: 20, label: "四角形のオレンジの鉢" },
  { value: 21, label: "四角い白いポット" },
  { value: 22, label: "波打ったエッジの白い鉢" },
];

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
  useEffect(() => {
    setPotType(0);
  }, [setPotType]);

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
            className="border rounded p-clamp-2"
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
            className="border rounded p-clamp-2"
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
          className="border rounded p-clamp-2"
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
          className="border rounded p-clamp-2"
        >
          {potTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end">
        <button
          onClick={onCancel}
          className="mr-clamp-4 px-clamp-4 py-2 bg-gray-200 rounded"
        >
          キャンセル
        </button>
        <button
          onClick={onSave}
          className="px-clamp-4 py-2 bg-blue-500 text-white rounded"
        >
          保存
        </button>
      </div>
    </div>
  );
};

export default SectionSizeSelector;
