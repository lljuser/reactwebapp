import { MarketApi } from '../../config/api';
import Request from  '../../../common/http/request';
import ReactHighcharts from 'react-highcharts';

// 默认图表数据
const defaultChart = {
  options: {
    title: {
        text: '暂无数据'
    },
    credits: {
        href: '',
        text: 'CNABS'
    },
  }
};

export {defaultChart};

/**
 * 市场服务业务封装
 */
class MarketService {

  static parseToChartData(chartData: any) {

    if (!chartData || !Array.isArray(chartData)) {
      return defaultChart;
    }

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
        series: seriesList
    };

    return data;
  }

  /**
   * 获取市场列表数据
   * 
   * @returns a list
   */
  async getMarketSummary() {
    const api = MarketApi.list;
    const data = await Request.post(api);

    return data;
  }

  /**
   * 获取市场图表数据
   * 
   * @returns 
   * @memberof MarketService
   */
  async getMarketChartData() {
    const api = MarketApi.chart;
    const data = await Request.post(api);

    return MarketService.parseToChartData(data);
  }
}

export default new MarketService();