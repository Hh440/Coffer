import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import Flag from 'react-world-flags';
import countryNameToCode from '../hook/CountryCode';

export default function CountryTable() {
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/fetch-country');
        setCountryData(response.data);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    
    <div className="p-4 bg-gray-900 text-white rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Country Data Table</h2>
      <table className="min-w-full bg-gray-800 border border-gray-700">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-700">Flag</th>
            <th className="py-2 px-4 border-b border-gray-700">Country</th>
            <th className="py-2 px-4 border-b border-gray-700">Average Impact</th>
          </tr>
        </thead>
        <tbody>
          {countryData.map((country) => (
            <tr
              key={country.country}
              className="hover:bg-gray-700 cursor-pointer"
            >
              <td className="py-2 px-4 border-b border-gray-700">
                <Flag code={getCountryCode(country.country)} style={{ width: '40px', height: 'auto' }} />
              </td>
              <td className="py-2 px-4 border-b border-gray-700">{country.country}</td>
              <td className="py-2 px-4 border-b border-gray-700">{country.avgImpact.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
}

function getCountryCode(countryName) {
  return countryNameToCode[countryName] || '';
}
