import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, TimeScale, PointElement } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { useParams } from 'react-router-dom';
import '../../CSS/PriceHistoryChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  PointElement
);

const PriceHistoryChart = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    let isSubscribed = true;

    fetch(`http://13.213.1.218:8080/api/history/${id}`)
      .then(response => response.json())
      .then(data => {
        if (!isSubscribed) return;

        const platforms = ['JD', 'TB', 'Amazon'];
        const datasets = platforms.map(platform => {
          const platformData = data.find(item => item.platform === platform);
          if (!platformData) return null;

          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
          
          const filteredData = platformData.history.filter(entry => new Date(entry.date) >= threeMonthsAgo);

          return {
            label: platform,
            data: filteredData.map(entry => ({
              x: new Date(entry.date),
              y: entry.price
            })),
            borderColor: getColor(platform),
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 2,
            tension: 0.1
          };
        }).filter(Boolean);

        setData({
          labels: datasets[0]?.data.map(d => d.x) || [],
          datasets
        });
      })
      .catch(error => console.error('Error fetching data:', error));

    return () => {
      isSubscribed = false;
    };
  }, [id]);

  const getColor = (platform) => {
    switch (platform) {
      case 'JD': return 'rgb(255, 99, 132)';
      case 'TB': return 'rgb(255, 165, 0)';
      case 'Amazon': return 'rgb(75, 192, 192)';
      default: return 'rgba(0, 0, 0, 0.1)';
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw.y} CNY`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month'
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price (CNY)'
        }
      }
    }
  };

  return (
    <div className="price-history-chart">
      <h2>Price History (Last 3 Months)</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default PriceHistoryChart;