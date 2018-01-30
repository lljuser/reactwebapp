import * as React from 'react';
import { connect } from 'dva';
import '../components/abs-tabs/index.less'; 

class ABSTableMarketComponent extends React.Component<any> {

  render() {
    return (
      <div className="abs-table abs-table-market" >
        <table>
          <thead>
            <tr>
                <th className="text-left">分类</th>
                <th className="text-right">今年(单)</th>
                <th className="text-right">今年(亿)</th>
                <th className="text-right">累计(亿)</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.marketSummary.map((item) =>

                  <tr key={item.ProductTypeId}>
                    <td className="text-left"><a href="javascript:"> {item.SimpleProductType}</a></td>
                    <td className="text-right">{item.DealCountCurrentYear}</td>
                    <td className="text-right highLight-red">{item.BalanceCurrentYear}</td>
                    <td className="text-right">{item.BalanceCumulative}</td>
                  </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  
  return {
    ...state.market
  };
}

export default connect(mapStateToProps)(ABSTableMarketComponent);