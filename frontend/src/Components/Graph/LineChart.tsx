import React from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {searchItemResults} from "../../Routes/Groceries";
import {CategoryScale} from "chart.js";
import {Box} from "@mui/material";

interface lineChartProps {
    groceryPriceList: searchItemResults[]
}



const LineChart = ({groceryPriceList}: lineChartProps) => {
    Chart.register(CategoryScale);
    const xAxis: string[] = []
    const yAxis: number[] = []


    groceryPriceList.forEach((item) => {
        const month = new Date(item.date_purchased).getMonth() + 1
        const day = new Date(item.date_purchased).getDate()
        xAxis.push(`${month}/${day}`)
        yAxis.push(item.price)
    })



    const data = {
        labels: xAxis,
        datasets: [
            {
                backgroundColor: "rgb(0,0,0)",
                borderColor: "rgb(15, 82, 186)",
                data: yAxis,
                pointRadius: 10,
                pointBackgroundColor: function(context: { dataIndex: any; }) {
                    const index = context?.dataIndex;
                    return groceryPriceList[index].sale ? 'red' :  'black'
                }
            },
        ],
    };



//  style={{height: '1000x', width:'1000px'}
    return (
        <Box sx={{width: '1000px', height:'500px'}}>
            <Line data={data}
                  options={{ maintainAspectRatio: false,
                      plugins: {
                      legend: {
                          display: false
                      }},
                      scales: {
                          x: {
                              grid: {
                                  display: false
                              },
                              ticks: {
                                  font: {
                                      size: 14
                                  }
                              }
                          },
                          y: {
                              title: {
                                  display: true,
                                  text: 'Per Pound',
                                  font: {
                                      size: 16,
                                      weight: 'bold'
                                  }
                              },
                              ticks: {
                                  font: {
                                      size: 14
                                  }
                              }
                          }
                      }
            }}
            />
        </Box>
    );
};

export default LineChart;