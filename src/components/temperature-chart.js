import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Line } from 'react-chartjs';
import moment from 'moment';

const MAX_LABELS_X = 10;

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
        let data = this.props.history.temperature,
            chartData = this._generateData(data),
            labels = this._generateLabels(data);
        return {
            labels: labels,
            datasets: [
                {
                    label: "Temperature",
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
                    data: chartData,
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

    _generateLabels(data) {
        let ticksPerLabel = Math.max(Math.floor(data.length / MAX_LABELS_X), 1);
        return data.map((entry, idx) => {
            return idx % ticksPerLabel === 0 ? moment(entry.timestamp).format('DD.MM.YYYY H:mm:ss') : '';
        });
    }
    _generateData(data) { return data.map((entry) => entry.value.toFixed(2)); }
}
