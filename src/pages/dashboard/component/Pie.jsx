import React, {useState}from 'react'

import ReactECharts from 'echarts-for-react';
export default function Pie({ title, renderList, styleData,isEmpty=false,isArea=false }) {
    // console.log(title, renderList,styleData)
    const legendData=renderList?.map(item=>item.name);
    // console.log(legendData)
    const option = { 
        title : {
        text: `${title}`,
        x:'center'
      },
      tooltip : {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: legendData
      },
      series : [
        {
        name: `${title}`,
        type: 'pie',
        radius :isEmpty?['50%','65%']: '50%',
        center: ['60%', '60%'],
        data:renderList,
        roseType:isArea&&"area",
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(120, 36, 50, 0.5)',
            shadowOffsetY: 10,
        }
        }
      ]}
      const [count, setCount] = useState(0);
    const onChartClick = (param, echarts) => {
        // console.log(param, echarts);
        setCount(count + 1);
    };
    return (
        <div className='staff-amount-container' style={{ ...styleData }}>
            <ReactECharts
                option={option}
                style={{ height:styleData.height,width:'100%' }}
                onEvents={{
                    'click': onChartClick,
                }}
            />
            <div>Click Count: {count}</div>
        </div>
    )
}
