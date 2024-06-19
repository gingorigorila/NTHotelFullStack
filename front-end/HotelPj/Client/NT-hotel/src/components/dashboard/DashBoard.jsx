// import React from 'react';


// function App() {
//   return (
//     <h1>Doanh Thu</h1>
//   );
// }

// export default App;
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Sidebar = () => {
  return (
    <div className="sidebar1">
      <h2>Doanh thu</h2>
      <ul>
        <li>Thống kê</li>
      </ul>
    </div>
  );
};

const MainContent = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Revenue',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Revenue',
      },
    },
  };

  return (
    <div className="main-content1">
      <h2>Doanh Thu</h2>
      <Line data={data} options={options} />
      <hr />
      <h1>Hãy điền tổng doanh thu ở đây</h1>
    </div>
  );
};

function DashBoard() {
  return (
    <div className="DashBoard">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default DashBoard;