"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import FormInput from "./FormInput";
import Card from "./Card";
import Button from "./Button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface SensusData {
  Year: string;
  Population: number;
}

const SensusData = () => {
  const [data, setData] = useState<SensusData[]>([]);
  const [filteredData, setFilteredData] = useState<SensusData[]>([]);
  const [startYear, setStartYear] = useState<string>("");
  const [endYear, setEndYear] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingReset, setLoadingReset] = useState<boolean>(false);

  const getData = async () => {
    const url = "https://datausa.io/api/data?drilldowns=Nation&measures=Population";
    try {
      const response = await axios.get(url);
      const sortedData = response.data.data.sort(
        (a: SensusData, b: SensusData) => parseInt(a.Year) - parseInt(b.Year)
      );
      setData(sortedData);
      setFilteredData(sortedData);
    } catch (error) {
      console.error("Error fetch data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFilter = () => {
    setLoading(true);
    const filtered = data.filter(
      (item) =>
        (!startYear || parseInt(item.Year) >= parseInt(startYear)) &&
        (!endYear || parseInt(item.Year) <= parseInt(endYear))
    );
    setFilteredData(filtered);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setLoadingReset(true);
    setStartYear("");
    setEndYear("");
    setFilteredData(data); 
    setTimeout(() => {
      setLoadingReset(false);
    }, 1000);
  };

  const lineChartData = {
    labels: filteredData.map((item) => item.Year),
    datasets: [
      {
        label: "Population",
        data: filteredData.map((item) => item.Population),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  const pieChartData = {
    labels: filteredData.map((item) => item.Year),
    datasets: [
      {
        label: "Population",
        data: filteredData.map((item) => item.Population),
        backgroundColor: [
          "orange",
          "darkcyan",
          "cyan",
          "violet",
          "pink",
          "rgba(255,99,132,0.6)",
          "rgba(54,162,235,0.6)",
          "rgba(255,206,86,0.6)",
          "rgba(75,192,192,0.6)",
          "rgba(153,102,255,0.6)",
          
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    plugins: {
      legend: {
        position: "left" as const,
        labels: {
          boxWidth: 20,
          padding: 10,
        },
      },
    },
    layout: {
      padding: {
        top: 20,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <section>
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold">Sensus Data</h1>
        <p className="text-gray-600">The American Community Survey (ACS)</p>
      </div>

      <div className="my-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <FormInput
            type="number"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            placeholder="From Year (Ex: 2015)"
          />

          <FormInput
            type="number"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            placeholder="To Year (Ex: 2025)"
          />

          <div className="flex gap-4">
          <Button title="Filter" onClick={handleFilter} loading={loading} />
          <Button title="Reset" onClick={handleReset} loading={loadingReset} bg ="bg-[#175f5f]" bgHover="bg-[#184b50]"/>
          </div>
        </div>
      </div>

      <div className="md:flex gap-6">
        <Card className="my-8  md:w-1/2 p-4 h-[400px]">
          <h2 className="text-xl font-semibold">Populasi Pertahun</h2>
          <div className="md:w-full max-w-2xl mx-auto p-4">
            <Line data={lineChartData} />
          </div>
        </Card>

        <Card className="my-8  md:w-1/2 p-4 h-[400px] ">
          <h2 className="text-xl font-semibold">Populasi Pertahun</h2>
          <div className="md:w-full max-w-2xl mx-auto p-4 h-[350px] flex items-center justify-center">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SensusData;
