import React from 'react';
import ReactApexChart from 'react-apexcharts';

type ChartProps = {
  data: number[];
  categories: string[];
  text: string;
};

const BarChart: React.FC<ChartProps> = ({ data, categories, text }) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: categories,
    },
    title: {
      text: text,
      align: 'center',
    },
  };

  const series = [
    {
      name: 'Sales',
      data: data,
    },
  ];

  return (
    <ReactApexChart options={options} series={series} type="bar" height={350} />
  );
};

export default BarChart;
