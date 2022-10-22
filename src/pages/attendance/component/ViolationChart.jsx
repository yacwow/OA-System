import React from 'react'
import ReactECharts from 'echarts-for-react';
export default function ViolationChart({title,renderList}) {
    const xData=renderList.xData.map(item=>
        {
            return item.split('T')[0]
        })
        // console.log(renderList.yData)
    const option = {
        title: { text: title },
        tooltip: { trigger: 'axis' },
        yAxis: [{ type: 'value', minInterval: 2 }], // minInterVal  展示整数
        xAxis: [
          {
            type: 'category',
            data: xData,
          },
        ],
        dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              left: '9%',
              bottom: 0,
              start: 0,
              end: 100,
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
    <div className='block-container'>
    <ReactECharts className="react_for_echarts" option={option} />
  </div>
  )
}
