import * as React from 'react';
import ReactHighcharts from 'react-highcharts';
import './index.less'; 
import * as chartTheme from '../../../public/js/chartTheme';

ReactHighcharts.Highcharts.setOptions(chartTheme);

interface Props {
  data: any;
}

class ABSChartComponent extends React.Component<Props> { 
    render() {
      return (
          <div className="abs-chart">
              <ReactHighcharts config={this.props.data}/>
          </div>
      );
    }

} 

export default ABSChartComponent;