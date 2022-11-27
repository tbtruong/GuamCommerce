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


    groceryPriceList.map((item) => {
        console.log(typeof(new Date(item.date_purchased)))
        const month = new Date(item.date_purchased).getMonth()
        const day = new Date(item.date_purchased).getDay()
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
            },
        ],
    };



//  style={{height: '1000x', width:'1000px'}
    return (
        <Box sx={{width: '1000px', height:'500px'}}>
            <Line data={data}
                  options={{ maintainAspectRatio: false, plugins: {
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
                      }}}
            />
        </Box>
    );
};

export default LineChart;