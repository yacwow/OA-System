import React from 'react'
import ReactECharts from 'echarts-for-react';
export default function AgeColumn(props) {
    const{renderList,styleData}=props[1];
    const option = {
        title: { text: 'Average Age' },
        xAxis: { max: Math.ceil(Math.max(...renderList.map((item) => item.age))) },
        yAxis: {
          type: 'category',
          data: renderList.map((item) => item.name),
          inverse: false,
          max: 1,
        },
        series: [
          {
            realtimeSort: true,
            type: 'bar',
            data: renderList.map((item) => item.age),
            label: {
              show: true,
              position: 'top',
            },
          },
        ],
      };
    
      return renderList? <ReactECharts
        option={option}
        style={{ ...styleData}}
      />:<></>;
}
