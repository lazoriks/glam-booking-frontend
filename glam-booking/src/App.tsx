import React, { useState } from 'react';
import Step1GroupSelect from './components/Step1GroupSelect';

function App() {
  const [groupId, setGroupId] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      {!groupId ? (
        <Step1GroupSelect onSelect={(id) => setGroupId(id)} />
      ) : (
        <p className="text-center mt-10 text-xl">
          Group ID selected: {groupId} — loading next step...
        </p>
      )}
    </div>
  );
}

export default App;
