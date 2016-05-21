import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Line } from 'react-chartjs';

export default class TemperatureChart extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        let chartData = this._prepareChartData(),
            chartOptions = this._prepareChartOptions();
        return (
            <Line data={chartData} options={chartOptions} width="600" height="250"/>
        );
    }

    _prepareChartData() {
        return {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40],
                }
            ]
        };
    }

    _prepareChartOptions() {
        return {
            xAxes: [{
                display: false
            }]
        };
    }
}
