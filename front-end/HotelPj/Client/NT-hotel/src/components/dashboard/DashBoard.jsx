/* eslint-disable no-unused-vars */

import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import generatePDF from 'react-to-pdf';

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
  const targetRef = useRef();
  return (
    
    <div className="main-content1" ref={targetRef}>
      <h2>Doanh Thu</h2>
      <Line data={data} options={options} />
      <hr />
      <button onClick={() => generatePDF(targetRef, { filename: "page.pdf" })}>
        Download PDF
      </button>
    </div>
  );
};

function DashBoard() {
  
  return (
    <>
    <div className="DashBoard" >
      <Sidebar />
      <MainContent />
      
    </div>
    
      </>
  );
}

export default DashBoard;