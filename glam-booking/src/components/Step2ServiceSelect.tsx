import React, { useEffect, useState } from "react";

type Service = {
  id: number;
  serviceName: string;
  price: number;
  period: number;
  description?: string;
};

type Props = {
  groupId: number;
  onContinue: (selectedServices: Service[]) => void;
  onBack: () => void;
};

// Якщо хочеш — можна витягувати назву з API, а поки вручну:
const groupNames: Record<number, string> = {
  1: "Hair",
  2: "Nails",
  3: "Brows & Lashes",
  4: "Permanent",
  5: "Waxing",
  6: "Massage",
  7: "Treatments",
  8: "Make-up",
};

const Step2ServiceSelect: React.FC<Props> = ({ groupId, onContinue, onBack }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetch(`https://appointmentspring-206160864813.us-central1.run.app/api/services/group/${groupId}`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error loading services", err));
  }, [groupId]);

  const toggleSelect = (id: number) => {
    setSelected((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  const selectedServices = services.filter((s) => selected.has(s.id));
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalTime = selectedServices.reduce((sum, s) => sum + s.period, 0);

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => {
            setSelected(new Set()); // очищаємо
            onBack();
          }}
          className="text-2xl text-pink-600 hover:text-pink-800"
        >
          ←
        </button>
        <h2 className="text-2xl font-bold">{groupNames[groupId] || "Services"}</h2>
      </div>

      {services.map((s) => (
        <div key={s.id} className="flex justify-between items-center border-b py-3">
          <div>
            <p className="font-semibold">{s.serviceName}</p>
            <p className="text-gray-500 text-sm">{s.period} min</p>
            <p className="text-lg font-bold">€{s.price}</p>
          </div>
          <button
            onClick={() => toggleSelect(s.id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
              selected.has(s.id) ? "bg-pink-500 border-pink-500 text-white" : "border-gray-400"
            }`}
          >
            {selected.has(s.id) ? "✓" : "+"}
          </button>
        </div>
      ))}

      {selected.size > 0 && (
        <div className="mt-6 border-t pt-4 text-right">
          <p className="text-lg">
            <strong>{selected.size}</strong> service(s), <strong>{totalTime}</strong> min
          </p>
          <p className="text-xl font-bold text-pink-600">€{totalPrice.toFixed(2)}</p>
          <button
            className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-pink-600 transition"
            onClick={() => onContinue(selectedServices)}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default Step2ServiceSelect;
