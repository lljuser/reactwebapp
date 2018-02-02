import * as React from 'react';
import ReactHighcharts from 'react-highcharts';
import '../index.less'; 
import * as ChartTheme from '../../../config/chartTheme';

console.log(ChartTheme);
ReactHighcharts.Highcharts.setOptions(ChartTheme);

interface Props {
  data: any;
  style?: any;
}

class ABSChartComponent extends React.Component<Props> { 
    render() {
      if (this.props.data == null || this.props.data === undefined) {
        return null;
      }

      return (
          <div className="abs-chart" style={this.props.style}>
              <ReactHighcharts config={this.props.data}/>
          </div>
      );
    }
} 

export default ABSChartComponent;