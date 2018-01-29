import * as React from 'react';
import { connect } from 'dva'; 
import ReactHighcharts from 'react-highcharts';
import './abs-chart.less';
import 'amfe-flexible';
import * as chartTheme from '../../../public/js/chartTheme';

ReactHighcharts.Highcharts.setOptions(chartTheme);

class ABSChartMarketComponent extends React.Component<any> {

    componentDidMount() {
      if (this.props.loaded) {
        return;
      }

      this.props.dispatch({type: 'marketChart/fetch'});
    }

    render() {
      return (
          <div className="abs-chart">
              <ReactHighcharts config={this.props.chart} />
          </div>
      );
    }

}

function mapStateToProps(state: any) {
  return {
    ...state.marketChart
  };
}

export default connect(mapStateToProps)(ABSChartMarketComponent);