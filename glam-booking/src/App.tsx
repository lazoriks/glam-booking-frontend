import React, { useState } from 'react';
import Step1GroupSelect from './components/Step1GroupSelect';
import Step2ServiceSelect from './components/Step2ServiceSelect';

function App() {
  const [groupId, setGroupId] = useState<number | null>(null);

  const handleContinue = (selectedServices: any[]) => {
    console.log('Continue to step 3 with:', selectedServices);
    // TODO: step 3, setSelectedServices(selectedServices), setStep(3), etc.
  };

  return (
    <>
      {!groupId ? (
        <Step1GroupSelect onSelect={setGroupId} />
      ) : (
        <Step2ServiceSelect groupId={groupId} onContinue={handleContinue} />
      )}
    </>
  );
}

export default App;
