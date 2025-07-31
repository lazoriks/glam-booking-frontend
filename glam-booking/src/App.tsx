import React, { useState } from 'react';
import Step1GroupSelect from './components/Step1GroupSelect';
import Step2ServiceSelect from './components/Step2ServiceSelect';
import Step3DateTimeSelect from './components/Step3DateTimeSelect'; // ✅ імпорт нового кроку

type Service = {
  id: number;
  serviceName: string;
  price: number;
  period: number;
  description?: string;
};

function App() {
  const [step, setStep] = useState(1);
  const [groupId, setGroupId] = useState<number | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

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
  console.log('Selected appointment:', { masterId, datetime, services: selectedServices });
  // TODO: Перейти до наступного кроку або відправити POST на бекенд
};

  return (
    <>
      {step === 1 && (
        <Step1GroupSelect onSelect={handleGroupSelect} />
      )}
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
    </>
  );
}

export default App;
