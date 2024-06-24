import React, { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import { Plant } from "@/constants/plantDatabase";

interface EditPlantModalProps {
  isOpen: boolean;
  onClose: () => void;
  plants: Plant[];
  targetPlantId: number;
  initialHasLabel: boolean;
  onUpdate: (
    plantId: number,
    cuttingType: string,
    date: string,
    hasLabel: boolean
  ) => void;
}

const EditPlantModal: React.FC<EditPlantModalProps> = ({
  isOpen,
  onClose,
  plants,
  targetPlantId,
  initialHasLabel,
  onUpdate,
}) => {
  const [selectedPlantId, setSelectedPlantId] = useState<number>(targetPlantId);
  const [selectedCuttingType, setSelectedCuttingType] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [sortedPlants, setSortedPlants] = useState<Plant[]>([]);
  const [hasLabel, setHasLabel] = useState<boolean>(initialHasLabel);

  const selectedPlant = plants.find((p) => p.id === selectedPlantId);

  const handleUpdateClick = () => {
    onUpdate(selectedPlantId, selectedCuttingType, selectedDate, hasLabel);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedCuttingType("");
      setSelectedDate("");
      const sorted = [...plants].sort((a, b) =>
        a.reading.localeCompare(b.reading, "ja")
      );
      setSortedPlants(sorted);
      setSelectedPlantId(targetPlantId);
      setHasLabel(initialHasLabel);
    }
  }, [isOpen, targetPlantId, plants, initialHasLabel]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-clamp-2.5vw">編集モード</h2>
      <select
        value={selectedPlantId}
        onChange={(e) => setSelectedPlantId(Number(e.target.value))}
        className="mt-clamp-2vw p-clamp-1vw border rounded-clamp-1vw"
      >
        {sortedPlants.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <div>
        <select
          value={selectedCuttingType}
          onChange={(e) => setSelectedCuttingType(e.target.value)}
          className="mt-clamp-2vw p-clamp-1vw mr-clamp-2vw border rounded-clamp-1vw"
        >
          <option value="">選択してください</option>
          <option value="胴切り">胴切り</option>
          <option value="枝切り">枝切り</option>
        </select>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="mt-clamp-2vw p-clamp-1vw border rounded-clamp-1vw"
        />
        <div className="mt-clamp-2vw">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={hasLabel}
              onChange={(e) => setHasLabel(e.target.checked)}
            />
            <span>ラベルあり</span>
          </label>
        </div>
      </div>
      {selectedPlant && (
        <div className="flex justify-end mt-clamp-4vw">
          <button
            onClick={handleUpdateClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-clamp-1vw mt-clamp-2vw"
          >
            更新する
          </button>
        </div>
      )}
    </Modal>
  );
};

export default EditPlantModal;
