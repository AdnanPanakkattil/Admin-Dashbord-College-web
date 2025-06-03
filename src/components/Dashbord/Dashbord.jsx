import React from 'react';
import CountUp from 'react-countup';
import Chart from 'react-apexcharts';

const Dashboard = () => {
  const stats = [
    {
      label: 'New Students',
      value: 758,
      change: -8,
      isPositive: false,
      percentageBarWidth: '15%',
    },
    {
      label: 'Total Courses',
      value: 125,
      change: 24,
      isPositive: true,
      percentageBarWidth: '85%',
    },
    {
      label: 'Total Teachers',
      value: 89,
      change: 15,
      isPositive: true,
      percentageBarWidth: '95%',
    },
    {
      label: 'Fees Collection',
      value: 48697,
      prefix: '$',
      change: -18,
      isPositive: false,
      percentageBarWidth: '25%',
    },
  ];

  const barLineOptions = {
    chart: { type: 'line', height: 350 },
    stroke: { width: [0, 4, 4] },
    dataLabels: { enabled: false },
    xaxis: {
      categories: [
        'Aug 24', '03 Aug', '04 Aug', '05 Aug', '06 Aug', '07 Aug', '08 Aug', '09 Aug', '10 Aug',
      ],
    },
    yaxis: [{
      title: { text: 'Amount' },
    }],
  };

  const barLineSeries = [
    {
      name: 'Fees',
      type: 'column',
      data: [30, 25, 20, 27, 42, 70, 35, 40, 25],
    },
    {
      name: 'Donation',
      type: 'line',
      data: [40, 55, 42, 60, 50, 75, 48, 58, 49],
    },
    {
      name: 'Income',
      type: 'line',
      data: [28, 26, 30, 35, 38, 62, 44, 50, 36],
    },
  ];

  const radarOptions = {
    chart: { type: 'radar' },
    xaxis: {
      categories: ['Jan', 'Feb', 'March', 'April', 'May', 'June'],
    },
  };

  const radarSeries = [
    {
      name: 'Sales',
      data: [80, 50, 30, 40, 90, 70],
    },
    {
      name: 'Income',
      data: [20, 30, 40, 80, 20, 60],
    },
    {
      name: 'Expense',
      data: [60, 70, 50, 30, 100, 50],
    },
  ];

  return (
    <>
    <div className="p-6 space-y-8">
      <div className="text-blue-600 font-bold text-xl">Dashboard</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-gray-600 text-lg font-medium">{stat.label}</h2>

            <div className="flex items-baseline space-x-2 mt-2">
              <div className="text-3xl font-bold text-gray-800">
                <CountUp
                  start={0}
                  end={stat.value}
                  duration={1.5}
                  separator="," 
                  prefix={stat.prefix || ''}
                />
              </div>
              {stat.change !== undefined && (
                <div className={`text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-500'} flex items-center`}>
                  <i className={`fa-solid ${stat.isPositive ? 'fa-arrow-up' : 'fa-arrow-down'} mr-1`} />
                  {Math.abs(stat.change)}%
                </div>
              )}
            </div>

            <p className="text-gray-500 text-sm mt-1">Analytics for last week</p>

            <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className={`h-full ${stat.isPositive ? 'bg-green-600' : 'bg-red-600'}`} style={{ width: stat.percentageBarWidth }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-blue-500 font-semibold text-lg mb-2">University Report</h2>
          <p className="text-sm text-gray-600 mb-4">
            Measure How Fast You’re Growing Monthly Recurring Revenue. <a href="#" className="text-blue-500 underline">Learn More</a>
          </p>
          <Chart options={barLineOptions} series={barLineSeries} type="line" height={350} />
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-blue-500 font-semibold text-lg mb-4">Performance</h2>
          <Chart options={radarOptions} series={radarSeries} type="radar" height={350} />
        </div>
      </div>
    </div>


    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
  {[
    { title: 'Fees', percent: 35, color: 'bg-purple-600' },
    { title: 'Donation', percent: 61, color: 'bg-yellow-500' },
    { title: 'Income', percent: 87, color: 'bg-green-600' },
    { title: 'Expense', percent: 42, color: 'bg-pink-500' },
  ].map((item, idx) => (
    <div key={idx} className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-gray-700 text-lg font-semibold">{item.title}</h2>
        <span className="text-gray-600 font-medium">{item.percent}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${item.color}`}
          style={{ width: `${item.percent}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500 mt-2">Compared to last year</p>
    </div>
  ))}
</div>
<div className="h-[100px] w-full"></div>
</>
  );
};

export default Dashboard;

