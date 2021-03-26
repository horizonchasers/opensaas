import React from 'react';
import Widget from '../Widget';
import LineChart from '../../../Components/Charts/LineChart';
import PieChart from '../../../Components/Charts/PieChart';
import BarChart from '../../../Components/Charts/BarChart';
import { columns, rows } from '../TablePage';
import { ProjectStatusProps, ProjectStatus } from '../../../Components/ProjectStatus';
import Activities from '../../../Components/Activities';
import { Row } from 'reactstrap';
import { Table } from '../../../Components/Table';

import moment from 'moment';
import { detect } from 'detect-browser';
import { Icon } from '../../../Components/Icon';
import * as FlexmonsterReact from 'react-flexmonster';
import 'flexmonster/lib/flexmonster.highcharts.js';
import Highcharts from 'highcharts';


const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const widgets = [
  {
    label: 'USERS',
    value: '588',
    icon: <Icon type='users' />,
    className: 'flex-row justify-content-between',
  },
  {
    label: 'SESSIONS',
    value: '435',
    icon: <Icon type='pulse' />,
    className: 'flex-row justify-content-between',
  },
  {
    label: 'BOUNCE RATE',
    value: '40.5%',
    icon: <Icon type='bounce' />,
    className: 'flex-row justify-content-between',
  },
  {
    label: 'SESSION DURATION',
    value: '1m 24s',
    icon: <Icon type='clock' />,
    className: 'flex-row justify-content-between',
  },
];

const lineChartData = [
  {
    name: 'sales',
    data: [
      { category: 'Jan', value: 4000 },
      { category: 'Feb', value: 3000 },
      { category: 'Mar', value: 2000 },
      { category: 'Apr', value: 2780 },
      { category: 'May', value: 1890 },
      { category: 'Jun', value: 2390 },
      { category: 'Jul', value: 3490 },
      { category: 'Aug', value: 1890 },
      { category: 'Sep', value: 2390 },
      { category: 'Oct', value: 2490 },
      { category: 'Nov', value: 2300 },
      { category: 'Dec', value: 1999 },
    ],
  },
  {
    name: 'conversions',
    data: [
      { category: 'Jan', value: 2400 },
      { category: 'Feb', value: 1398 },
      { category: 'Mar', value: 9800 },
      { category: 'Apr', value: 3908 },
      { category: 'May', value: 4800 },
      { category: 'Jun', value: 3800 },
      { category: 'Jul', value: 3490 },
      { category: 'Aug', value: 1290 },
      { category: 'Sep', value: 2290 },
      { category: 'Oct', value: 2420 },
      { category: 'Nov', value: 1300 },
      { category: 'Dec', value: 2099 },
    ],
  },
];

const lineChartSettings = {
  width: 400,
  height: 300,
  showGrid: false,
  xAxis: {
    type: 'category',
  },
  line: {
    strokeWidth: 2,
    type: 'monotone',
    activeDot: {
      r: 6,
    },
  },
  colors: ['#90caf9', '#4ca5f5'],
};

const pieChartSettings = {
  width: 300,
  height: 300,
  pie: {
    cx: 140,
    cy: 100,
    startAngle: 0,
    endAngle: 0,
    innerRadius: 60,
    outerRadius: 80,
    paddingAngle: 1,
  },
  colors: ['#90caf9', '#4ca5f5', '#3d88e5'],
};

const barChartSettings = {
  width: 500,
  height: 300,
  showGrid: false,
  showLegend: false,
  barSize: 10,
  colors: ['#90caf9', '#3d88e5'],
};

const projectStatusData: ProjectStatusProps[] = [
  {
    title: 'Harum quia vel vero id.',
    description: 'Et odio facere in quis.',
    img:
      'https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1',
    value: 35,
  },
  {
    title: 'Qui itaque omnis distinctio commodi.',
    description: 'Tempore quis omnis tempore et.',
    img:
      'https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1',
    value: 63,
  },
  {
    title: 'Nemo dolor reiciendis ut et.',
    description: 'Nisi aut iure et modi.',
    img:
      'https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1',
    value: 100,
  },
  {
    title: 'Provident dignissimos sed non quia.',
    description: 'Odit omnis enim sapiente labore.',
    img:
      'https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1',
    value: 26,
  },
];

const activitiesData = [
  {
    title: 'Perferendis dignissimos provident saepe in.',
    description: 'Corporis in est quae exercitationem.',
    status: 'a few seconds ago',
    value: 1,
  },
  {
    title: 'Eos et aut perspiciatis et.',
    description: 'Hic praesentium veritatis sapiente voluptatem.',
    status: 'a day ago',
    value: 2,
  },
  {
    title: 'Vero voluptatibus est voluptas quas.',
    description: 'Ut iusto praesentium harum molestias.',
    status: '2 days ago',
    value: 3,
  },
  {
    title: 'Non maxime fuga nemo officiis.',
    description: 'Dolore nam laudantium vel voluptatem.',
    status: '3 days ago',
    value: 4,
  },
];

function getBarChartData(requests: any) {
  const data: { [key: string]: { success: number; failed: number } } = {};
  requests.forEach(({ createdAt, statusCode }: any) => {
    const month = moment(createdAt).format('MMM');
    const success = statusCode < 400 ? 'success' : 'failed';
    if (data[month]) {
      data[month][success]++;
    } else {
      data[month] = { success: 0, failed: 0 };
      data[month][success]++;
    }
  });
  const barChartData = [];
  for (const month of MONTHS) {
    if (data[month]) {
      const { success, failed } = data[month];
      barChartData.push({ name: month, success, failed });
    }
  }
  return barChartData;
}

function getPieChartData(requests: any) {
  let chromeCount = 0,
    edgeCount = 0,
    firefoxCount = 0,
    undetectedCount = 0;
  requests.forEach(({ userAgent }: any) => {
    const browser = detect(userAgent);
    switch (browser && browser.name) {
      case 'chrome':
        chromeCount++;
        break;
      case 'firefox':
        firefoxCount++;
        break;
      case 'edge-chromium':
      case 'edge':
        edgeCount++;
        break;
      default:
        undetectedCount++;
    }
  });
  return [
    { name: 'Chrome', value: chromeCount },
    { name: 'Edge', value: edgeCount },
    { name: 'Firefox', value: firefoxCount },
    { name: 'Not Detected', value: undetectedCount },
  ];
}

class Dashboard extends React.Component<any> {
  render() {
    const { requests } = this.props;
    return (
      <div className='dashboard d-flex flex-row flex-wrap justify-content-start'>
        {widgets.map((item, index: number) => {
          return <Widget key={index} {...item} />;
        })}
        <Row className='mx-0 w-100'>
          <Widget col className='w-2/3 flex-shrink-0' style={{ minHeight: '320px' }}>
            <div className='w-100 text-sm font-light text-grey-500'>Requests</div>
            <div className='w-100 text-sm font-bold'>
              <span>This year</span>
            </div>
            <BarChart data={getBarChartData(requests)} {...barChartSettings} />
          </Widget>
          <Widget col className='w-1/4 flex-shrink-0 justify-content-center'>
            <div className='text-sm font-light text-grey-500'>Requests</div>
            <div className='text-sm font-bold'>
              <span>By browser</span>
            </div>
            <div className='w-100 d-flex justify-content-center'>
              <PieChart data={getPieChartData(requests)} {...pieChartSettings} />
            </div>
          </Widget>
        </Row>
        <Widget className='w-100'>
          <Table
            data={rows}
            totalData={rows.length}
            selection='multi'
            onRowSelected={(selected) => {
              console.log(selected);
            }}
            columns={columns}
            rowKey='country'
            pagination='pages'
            pageSize={5}
          />
        </Widget>
        <Widget className='flex-grow-1 flex-shrink-0 w-2/3' style={{ minHeight: '320px' }}>
          <LineChart data={lineChartData} {...lineChartSettings} />
        </Widget>
        <Widget className='flex-column' label='Project status' value='This week'>
          {projectStatusData.map((item: ProjectStatusProps, index: number) => (
            <ProjectStatus {...item} key={index} />
          ))}
        </Widget>
        <Widget className='flex-column' label='Activities' value='Today'>
          {activitiesData.map((item, index: number) => (
            <Activities {...item} key={index} />
          ))}
        </Widget>
        <FlexmonsterReact.Pivot 
         toolbar={false}
         componentFolder="https://cdn.flexmonster.com/"
         width="100%"
         report="https://cdn.flexmonster.com/reports/report.json"
        />
      </div>
      
    );
  }
}

export default Dashboard;
