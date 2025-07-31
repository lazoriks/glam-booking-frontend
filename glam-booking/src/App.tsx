import React, { useState } from 'react';
import Step1GroupSelect from './components/Step1GroupSelect';
import Step2ServiceSelect from './components/Step2ServiceSelect';
import Step3DateTimeSelect from './components/Step3DateTimeSelect';
import Step4ClientForm from './components/Step4ClientForm';

interface Service {
  id: number;
  serviceName: string;
  price: number;
  period: number;
  description?: string;
}

function App() {
  const [step, setStep] = useState(1);
  const [groupId, setGroupId] = useState<number | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedMasterId, setSelectedMasterId] = useState<number | null>(null);
  const [selectedDatetime, setSelectedDatetime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGroupSelect = (id: number) => {
    setGroupId(id);
    setStep(2);
  };

  const handleContinueFromStep2 = (services: Service[]) => {
    setSelectedServices(services);
    setStep(3);
  };

  const handleBackToStep1 = () => {
    setGroupId(null);
    setSelectedServices([]);
    setStep(1);
  };

  const handleBackToStep2 = () => {
    setStep(2);
  };

  const handleAppointmentSelect = (masterId: number, datetime: string) => {
    setSelectedMasterId(masterId);
    setSelectedDatetime(datetime);
    setStep(4);
  };

  const handleClientSubmit = async (client: { name: string; mobile: string; email: string }) => {
    if (!selectedMasterId || !selectedDatetime || selectedServices.length === 0) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('https://appointmentspring-206160864813.us-central1.run.app/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          datetime: selectedDatetime,
          serviceId: selectedServices[0].id,
          serviceIds: selectedServices.map(s => s.id),
          masterId: selectedMasterId,
          name: client.name,
          mobile: client.mobile,
          email: client.email,
        }),
      });

      if (!res.ok) throw new Error('Failed to create appointment');

      setSuccess(true);
      setTimeout(() => {
        setStep(1);
        setGroupId(null);
        setSelectedServices([]);
        setSelectedMasterId(null);
        setSelectedDatetime('');
        setIsSubmitting(false);
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      alert('Error creating appointment');
      setIsSubmitting(false);
    }
  };

  const stepLabels = ['Group', 'Services', 'Time', 'Client'];

  return (
    <div className="min-h-screen bg-[#fff8f5] text-gray-800">
      {/* 🔼 Навігація-кроки */}
      <div className="flex justify-center gap-4 pt-4 pb-2 text-sm sm:text-base">
        {stepLabels.map((label, index) => {
          const current = index + 1;
          const isActive = step === current;
          const isDone = step > current;

          return (
            <div
              key={label}
              className={`flex items-center gap-2 ${
                isActive ? 'text-pink-600 font-bold' : isDone ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs ${
                  isActive
                    ? 'bg-pink-500 text-white border-pink-500'
                    : isDone
                    ? 'bg-gray-300 text-white border-gray-300'
                    : 'border-gray-400'
                }`}
              >
                {current}
              </div>
              <span className="hidden sm:inline">{label}</span>
            </div>
          );
        })}
      </div>

      {/* 🔄 Основні кроки */}
      {step === 1 && <Step1GroupSelect onSelect={handleGroupSelect} />}

      {step === 2 && groupId !== null && (
        <Step2ServiceSelect
          groupId={groupId}
          onContinue={handleContinueFromStep2}
          onBack={handleBackToStep1}
        />
      )}

      {step === 3 && groupId !== null && (
        <Step3DateTimeSelect
          groupId={groupId}
          services={selectedServices}
          onBack={handleBackToStep2}
          onSelect={handleAppointmentSelect}
        />
      )}

      {step === 4 && (
        <Step4ClientForm
          onBack={handleBackToStep2}
          onSubmit={handleClientSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      {/* ✅ Успішна бронь */}
      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow text-center space-y-4">
            <p className="text-lg font-semibold text-green-600">Appointment booked successfully!</p>
            <button
              onClick={() => setStep(1)}
              className="px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
