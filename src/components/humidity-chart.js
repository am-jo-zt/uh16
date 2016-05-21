import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Line } from 'react-chartjs';
import moment from 'moment';

const MAX_LABELS_X = 10;

export default class HumidityChart extends React.Component {
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
        let data = this.props.history.humidity,
            chartData = this._generateData(data),
            labels = this._generateLabels(data);
        return {
            labels: labels,
            datasets: [
                {
                    fillColor: "rgba(180, 204, 237,0.4)",
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
