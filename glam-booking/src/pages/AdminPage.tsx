import React, { useState, useEffect } from 'react';

const TABS = ['db_appointments', 'db_service', 'db_masters', 'db_clients'] as const;
type Tab = typeof TABS[number];

const today = new Date().toISOString().split("T")[0];

const AdminPage: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('db_appointments');
  const [data, setData] = useState<any[]>([]);
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

  useEffect(() => {
    const saved = localStorage.getItem('adminAuth');
    if (saved === 'true') setAuthenticated(true);
  }, []);

  const handleLogin = () => {
    if (login === 'admin' && password === 'Beauty2025') {
      setAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
    } else {
      alert('Wrong credentials');
    }
  };

  const fetchData = () => {
    let url = `https://appointmentspring-206160864813.us-central1.run.app/api/admin/${activeTab}`;
    if (activeTab === 'db_appointments') {
      url += `?from=${fromDate}&to=${toDate}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  };

  useEffect(() => {
    if (authenticated) fetchData();
  }, [authenticated, activeTab]);

  const handleAdd = () => {
    alert(`Add new to ${activeTab}`);
  };

  const handleEdit = (item: any) => {
    alert(`Edit item ${item.id} in ${activeTab}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this item?')) {
      fetch(`https://appointmentspring-206160864813.us-central1.run.app/api/admin/${activeTab}/${id}`, {
        method: 'DELETE',
      })
        .then(() => fetchData())
        .catch(console.error);
    }
  };

  if (!authenticated) {
    return (
      <div className="max-w-sm mx-auto mt-20 space-y-4 p-6 border rounded shadow">
        <h2 className="text-xl font-bold text-center">Admin Login</h2>
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={e => setLogin(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded hover:bg-pink-600 transition"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Tabs */}
      <div className="flex gap-4 border-b pb-2">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 border-b-2 ${
              activeTab === tab ? 'border-pink-600 font-bold' : 'border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter for appointments */}
      {activeTab === 'db_appointments' && (
        <div className="flex gap-4 items-center">
          <div>
            <label className="block text-sm">From</label>
            <input
              type="date"
              value={fromDate}
              onChange={e => setFromDate(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">To</label>
            <input
              type="date"
              value={toDate}
              onChange={e => setToDate(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <button onClick={fetchData} className="mt-5 bg-black text-white px-4 py-2 rounded hover:bg-pink-600">
            Filter
          </button>
        </div>
      )}

      {/* Add Button */}
      <div className="text-right">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add
        </button>
      </div>

      {/* Table */}
      <table className="w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {data.length > 0 &&
              Object.keys(data[0]).map(key => <th key={key} className="p-2 border">{key}</th>)}
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id} className="hover:bg-gray-50">
              {Object.values(item).map((val, i) => (
                <td key={i} className="p-2 border">{String(val)}</td>
              ))}
              <td className="p-2 border space-x-2">
                <button onClick={() => handleEdit(item)} className="text-blue-500 hover:underline">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
