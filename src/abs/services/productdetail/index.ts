import { ProductApi } from '../../config/api';
import Request from '../../../common/http/request/index';
import ChartTheme from '../../config/chartTheme';

// 默认图表数据
const defaultChart = {
      title: {
          text: '暂无数据'
      },
      credits: {
          href: '',
          text: 'CNABS'
      }
  };

export {defaultChart};

class ProductDetailService {
    async getDetail(id: string) {
        const api = ProductApi.detail.concat(['', id].join('/'));
        const data = await Request.post(api);
        return data;
    }

    async getNoteConsTable(id: string, width: string, height: string) {
        const api = ProductApi.structure + '/' + id + '/' + width + '/' + height;
        const data = await Request.post(api);
        return data;
    }
    
    async getChart(dealId: string, resultId: string) {
        const api = ProductApi.chart.concat(['', dealId].join('/'));
        const chartData = await Request.post(api);

        if (!chartData) {
            return defaultChart;
        }
        let allSeries: any = [];
        let lineValue;
        let i = 0;
        let colors = ChartTheme.colors;
        if (chartData && chartData.length > 0) {
            // let allSeriesLth = chartData.length;
            let colorSeries = chartData.filter(function (item: any) { return item.Order > 100; }).length > 0 ?
                        Math.ceil(chartData.length / colors.length) : chartData.length;
            for (let j = 0; j < colorSeries; j++) { // get max color series
                        colors = colors.concat(colors);
            }
            let pSeries = chartData.filter(function (item: any) { return item.Order < 100; });
            let lSeries = chartData.filter(function (item: any) { return item.Order > 100 && item.Order !== 1000; });
            var plotLine = chartData.filter(function (item: any) { return item.Order === 1000; });
            let minDate = new Date(1970, 1, 1).valueOf();
            pSeries.forEach(function (item: any, index: any) {
                        let point: any = [];
                        item.Points.forEach(function (e: any) {
                            point.push([new Date(e.X).valueOf() - minDate, e.Y * 1]);
                        });
                        allSeries.push({
                            name: item.SeriesName,
                            data: point,
                            dashStyle: item.Type,
                            step: true,
                            color: colors[i]
                        });
                        i++;
                    });
            if (lSeries.length > 0) {
                        i = 0;
                        lSeries.forEach(function (item: any, index: any) {
                           let point: any = [];
                           item.Points.forEach(function (e: any) {
                              point.push([new Date(e.X).valueOf() - minDate, e.Y * 1]);
                           });
                           allSeries.push({
                               name: item.SeriesName,
                               data: point,
                               dashStyle: item.Type,
                               step: true,
                               color: colors[i]
                           });
                           i++;                           
                        });
                    }
            if (plotLine.length === 1) {
                        lineValue = new Date(plotLine[0].Points).valueOf() - minDate;
                    }
                }
        let option = {
                            title: {
                                text: ''
                            },
                            xAxis: {
                                type: 'datetime',
                                dateTimeLabelFormats: {
                                    second: '%Y-%m-%d %H:%M:%S',
                                    minute: '%Y-%m-%d %H:%M',
                                    hour: '%Y-%m-%d %H:%M',
                                    day: '%Y-%m-%d',
                                    week: '%Y.%m',
                                    month: '%Y.%m',
                                    year: '%Y.%m'
                                },
                                plotLines: [{
                                    color: 'white',
                                    width: .8,
                                    value: lineValue,
                                    dashStyle: 'dash',
                                    label: {
                                        text: plotLine.Points,
                                        verticalAlign: 'middle',
                                        textAlign: 'left',
                                        style: {
                                            color: '#E0E0E3'
                                        }
                                    }
                                }],
                                plotBands: [{
                                    color: '#333',
                                    from: Date.UTC(2e3, 1, 1),
                                    to: lineValue
                                }]
                            },
                            yAxis: {
                                title: {
                                    enabled: !0,
                                    text: ''
                                },
                                labels: {
                                    format: '{value:.0f}%'
                                },
                                max: 100
                            },
                            plotOptions: {
                                series: {
                                    marker: {
                                        enabled: !1
                                    }
                                }
                            },
                            tooltip: {
                                formatter: function () {
                                    var cont = (this as any);
                                    let t,
                                        e = new Date(cont.x);
                                    return t = e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate() + '<br/>' + cont.series.name + '剩余本金:<br/>' + Math.round(100 * cont.y) / 100 + '%';
                                }
                            },
                            legend : {
                                style: {
                                    fontSize: '10px'
                                }
                            },
                            credits: {
                            href: '',
                            text: 'CNABS'
                            },
                            series: allSeries
                        };
               
        return option;
        
    }
}
 
export default new ProductDetailService();