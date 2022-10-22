import React from 'react'
import ReactECharts from 'echarts-for-react';
export default function Column( {title, renderList, styleData, br = false}) {
    const option = {
        title: { text: title },
        tooltip: { trigger: 'axis' },
        yAxis: [{ type: 'value', minInterval: 1 }], // minInterVal  展示整数
        xAxis: [
          {
            type: 'category',
            data: renderList.xData,
            axisLabel: {
              interval: 0,
              formatter: (value) => (br ? value.split('').join('\n') : value),
            },
          },
        ],
        series: [
          {
            name: 'number',
            type: 'bar',
            data: renderList.yData,
            label: {
              show: true,
              precision: 1,
              position: 'top',
              valueAnimation: true,
            },
          },
        ],
      };
    
      return (
        <div className="staff-amount-container" style={{ ...styleData }}>
          <ReactECharts className="react_for_echarts" option={option} style={{height:styleData.height,width:'100%'}}/>
        </div>
      );
}
