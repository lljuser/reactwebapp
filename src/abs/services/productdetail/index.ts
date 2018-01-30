import { ProductApi } from '../../config/api';
import Request from '../../../common/http/request/index';

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
        const api = ProductApi.chart.concat(['', dealId, resultId].join('/'));
        const chartData = await Request.post(api);

        if (!chartData) {
            return defaultChart;
        }
        var o: any = [];
        var hasLegal = chartData.HasLegalLine;
        var colors = ['#2b908f', '#D8C46C', '#f45b5b', '#7798BF', '#FF1495', '#37FF14', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee', '#00FFFF', '#8B008B'];
        var seriesLength = chartData.ListLineSeries.length / 2;
        for (var j = 0; j < Math.floor((hasLegal ? seriesLength : 2 * seriesLength) / colors.length); j++) {
                colors = colors.concat(colors);
            }

        var i = 0;
        chartData.ListLineSeries.forEach(
                function (e: any) {
                    var a: any = [];
                    e.Data.Data.forEach(
                        function (ef: any) {
                            a.push([ef.X, ef.Y]);
                        });
                    if (hasLegal === true) {
                        if (i < seriesLength) {
                            o.push({
                                name: e.Name,
                                data: a,
                                type: 'line',
                                step: true,
                                color: colors[i]
                            });
                        } else {
                            o.push({
                                name: e.Name,
                                data: a,
                                dashStyle: 'Dot',
                                step: true,
                                color: colors[i - seriesLength]
                            });
                        }
                        i++;
                    } else {
                        o.push({
                            name: e.Name,
                            data: a,
                            type: 'spline',
                        });
                    }

                });

        i = chartData.PlotValue;
        var s = chartData.PlotLabel;
        var l = {
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
                                week: '%Y年%m月',
                                month: '%Y年',
                                year: '%Y年'
                            },
                            plotLines: [{
                                color: 'white',
                                width: .8,
                                value: i,
                                dashStyle: 'dash',
                                label: {
                                    text: s,
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
                                to: i
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
                                var t,
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
                        series: o
                    };

        return l;
        
    }
}
 
export default new ProductDetailService();