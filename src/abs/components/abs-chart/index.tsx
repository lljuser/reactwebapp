import * as React from 'react';
import ReactHighcharts from 'react-highcharts';
import './index.less'; 
import * as chartTheme from '../../../public/js/chartTheme';

ReactHighcharts.Highcharts.setOptions(chartTheme);

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