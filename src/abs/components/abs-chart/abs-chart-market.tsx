import * as React from 'react';
import Request from '../../../core/http/request';
import ReactHighcharts from 'react-highcharts';
// import { Link } from 'react-router-dom';
import './abs-chart.less';
import 'amfe-flexible';
import * as chartTheme from '../../../public/js/chartTheme';

ReactHighcharts.Highcharts.setOptions(chartTheme);
interface Parameter {
    options: Object;
}

export default class ABSChartMarketComponent extends React.Component<{}, Parameter> {
    constructor(props: object) {
        super(props);
        this.state = {
            options: {
                title: {
                    text: '暂无数据'
                },
                credits: {
                    href: '',
                    text: 'CNABS'
                },
            },
        };
    }

    componentDidMount() {
        this.fetchChartData();
    }

    fetchChartData() {
        var chartUrl = 'http://10.1.1.35/momarket/getissuestatchartdata';
        Request.post(chartUrl, {}).then((response) => {
            const json = response;
            if (json !== null) {
                var chartData = json;
                var seriesList: object[] = [];
                var Xcategory = new Set();
                chartData.forEach((content, i) => {
                    content.Points.forEach((cont, j) => {
                        Xcategory.add(cont.X);
                    });
                });
                var category = Array.from(Xcategory).sort();
                chartData.forEach((content) => {
                    var tempAll = Array.from(category);
                    content.Points.forEach((cont) => {
                        if (tempAll.indexOf(cont.X) !== -1) {
                            tempAll.splice(tempAll.indexOf(cont.X), 1, cont.Y);
                        }
                    });
                    var seriesData: any[] = [];
                    tempAll.forEach((value, idx) => {
                        if (Number(value) !== NaN) {
                            seriesData.push(value);
                        } else {
                            seriesData.push(0);
                        }
                    });
                    seriesList.push({ name: content.SeriesName, data: seriesData, type: 'column' });
                });
                const data = {
                    title: {
                        text: '市场发行总览',
                    },
                    xAxis: {
                        categories: category,
                        labels: {
                            rotation: -45
                        }
                    },
                    yAxis: [{
                        title: {
                            enabled: !0,
                            text: ''
                        },
                        labels: {
                            formatter: function () {
                               // console.log(this.value);
                                return ReactHighcharts.Highcharts.numberFormat((this  as any).value, 0, '.', ',') + '';
                            }
                        }
                    }],
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            borderWidth: 0,
                        }
                    },
                    tooltip: {
                        useHTML: true,
                        shared: true,
                        formatter: function () {
                            var cont = (this as any);
                            var idx = cont.x.indexOf('Q');
                            var show = cont.x.substring(0, idx) + '第' + cont.x.substring(idx + 1) + '季度';
                            var s = '<b>' + show + '</b>';
                            cont.points.forEach( (item) => {
                                s += '<br/>' + '<span style="color:' + item.series.color + ';font-size: 14px;">' +
                                    item.series.name + '</span>: <b>' +
                                    ReactHighcharts.Highcharts.numberFormat(item.y, 2, '.', ',') + '</b>亿';
                            });
                            return s;
                        },
                    },
                    credits: {
                        href: '',
                        text: 'CNABS'
                    },
                    series: seriesList,
                    theme: chartTheme
                };
                this.setState({ options: data });

                // this.options = data;
                // callback(data);
            }
        }).catch(error => console.log(error.message));
    }

    render() {
        return (
            <div className="abs-chart">
                <ReactHighcharts config={this.state.options} />
            </div>
        );
    }

}