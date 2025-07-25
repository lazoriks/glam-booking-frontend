import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './App.css';
//import Header from './pages/header/header';

// Допоміжна функція для форматування LocalDateTime у ISO-формат без секунд
const formatDateTime = (date) => {
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);
  const hours = (`0${date.getHours()}`).slice(-2);
  const minutes = (`0${date.getMinutes()}`).slice(-2);
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [appointments, setAppointments] = useState([]);

  // Завантаження списку сервісів (DTO)
  useEffect(() => {
    axios
      .get('https://appointmentspring-206160864813.us-central1.run.app/api/services/list')
      .then(res => setServices(res.data))
      .catch(err => console.error('Failed to load services:', err));
  }, []);

  // Завантаження записів при зміні дати або сервісу
  useEffect(() => {
    if (selectedServiceId && selectedDate) {
      const formattedDate = formatDateTime(selectedDate);

      axios
        .get('https://appointmentspring-206160864813.us-central1.run.app/api/appointments/filter', {
          params: {
            datatime: formattedDate,
            service_id: selectedServiceId,
          },
        })
        .then(res => setAppointments(res.data))
        .catch(err => console.error('Failed to load appointments:', err));
    }
  }, [selectedServiceId, selectedDate]);

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      
      <div style={{ marginRight: '20px' }}>
        <h3>Choose Date and Time</h3>
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="yyyy-MM-dd HH:mm"
        />
      </div>

      <div>
        <h3>Select Service</h3>
        <select value={selectedServiceId} onChange={e => setSelectedServiceId(e.target.value)}>
          <option value="">--Select Service--</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.serviceName}
            </option>
          ))}
        </select>

        <h4>Appointments</h4>
        <table border="1">
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Service ID</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, i) => (
              <tr key={i}>
                <td>{a.clientId}</td>
                <td>{a.clientName}</td>
                <td>{a.mobile}</td>
                <td>{a.serviceId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
// Note: Make sure to adjust the API URLs and data structure according to your backend implementation.
// This code assumes that the backend API is already set up to handle the requests as specified.
// Also, ensure that you have the necessary CORS configuration on your backend to allow requests from your frontend application. 