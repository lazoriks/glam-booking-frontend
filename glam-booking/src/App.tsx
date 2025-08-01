import React, { useState } from 'react';
import Step1GroupSelect from './components/Step1GroupSelect';
import Step2ServiceSelect from './components/Step2ServiceSelect';
import Step3DateTimeSelect from './components/Step3DateTimeSelect';
import Step4ClientForm from './components/Step4ClientForm';
import { GoogleOAuthProvider } from '@react-oauth/google';

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

  const handleClientSubmit = async (client: {
    name: string;
    surname: string;
    mobile: string;
    email: string;
    googleId?: string;
  }) => {
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
          clientName: client.name,
          clientSurname: client.surname,
          clientMobile: client.mobile,
          clientEmail: client.email,
          clientGoogleId: client.googleId,
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

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <>
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
      </>
    </GoogleOAuthProvider>
  );
}

export default App;
