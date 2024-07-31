import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
  
  import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bubble } from 'react-chartjs-2';
  
  ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    PointElement
  );
  
  const generateGradientColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const hue = Math.floor((240 * i) / (numColors - 1)); // Transition from red to violet
      const color = `hsl(${hue}, 100%, 50%)`;
      colors.push(color);
    }
    return colors;
  };
  
  export default function BubbleChart() {
    const [chartData, setChartData] = useState({
      datasets: []
    });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/fetch-relevance-likelihood');
          const data = response.data;
  
          const colors = generateGradientColors(data.length);
  
          const formattedData = {
            datasets: data.map((item, index) => ({
              label: item.topic,
              data: [{
                x: item.avgRelevance,
                y: item.avgLikelihood,
                r: 10 // you can set the radius based on a specific logic or keep it static
              }],
              backgroundColor: colors[index],
              borderColor: colors[index],
              borderWidth: 1
            }))
          };
  
          setChartData(formattedData);
        } catch (error) {
          console.error("Error fetching relevance-likelihood data:", error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className="container mx-auto p-4 bg-gray-800 text-white rounded-xl shadow-lg">
        <h2 className=" mb-4"></h2>
        {chartData.datasets.length > 0 ? (
          <Bubble
            data={chartData}
            options={{
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Average Relevance',
                    color: 'white'
                  },
                  ticks: {
                    color: 'white'
                  },
                  grid: {
                    color: 'gray'
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Average Likelihood',
                    color: 'white'
                  },
                  ticks: {
                    color: 'white'
                  },
                  grid: {
                    color: 'gray'
                  }
                }
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const label = context.dataset.label || '';
                      return `${label}: (Relevance: ${context.raw.x}, Likelihood: ${context.raw.y})`;
                    }
                  }
                },
                legend: {
                  display: false // Hide default legend
                }
              },
              layout: {
                padding: {
                  top: 10,
                  left: 10,
                  right: 10,
                  bottom: 10
                }
              }
            }}
          />
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    );
  }
  