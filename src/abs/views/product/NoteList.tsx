import * as React from 'react';
import { connect } from 'dva';
import '../../components/abs-tabs/index.less'; 

class NoteList extends React.Component<any, {}> {

  componentDidMount() {

    // 阻止其再次请求数据，如果state中已经有数据了
    // if (this.props.structure && this.props.structure.length > 0) {
    //   return;
    // }
    // this.props.dispatch({type: 'productdetail/getDetail', id: id});
  }

  render() {

    if (this.props.detail !== null && this.props.detail !== undefined) {

      return (
        <table className="appH5_table">
            <thead>
                <tr>
                    <th>证券简称</th>
                    <th className="text-right">初始(亿)<br/>剩余(亿)</th>
                    <th className="text-right">利率<br/>估值</th>
                    <th className="text-right">期限<br/>类型</th>
                    <th className="text-right">公开评级<br/>量化评级</th>
                </tr>
            </thead>
            <tbody>
                {
                this.props.detail.NoteList.map((item) =>
                    <tr key={item.NoteId}>
                    <td><div className="appH5_ellipsis appH5_font_normal" style={{width: '2.1rem'}}>{item.Description}</div></td>
                <td className="text-right"><span className="appH5_color_red">{item.Notional}</span><br/><span className="appH5_color_details appH5_font_smaller">{item.Principal}</span></td>
                <td className="text-right"><span>{item.CurrentCoupon}</span><br/><span className="appH5_color_green appH5_font_smaller">{item.CurrentSuggestYield}</span></td>
                <td className="text-right"><span>{item.CurrentWal}</span><br/><span className="appH5_color_details appH5_font_smaller">{item.RepaymentOfPrincipal}</span></td>
                <td className="text-right"><span>{item.CurrentRatingCombineString == null || item.CurrentRatingCombineString === '' ? '-' : item.CurrentRatingCombineString}</span><br/><span className="appH5_color_green appH5_font_smaller">{item.CurrentSuggestRatingCombineString == null || item.CurrentSuggestRatingCombineString === '' ? '-' : item.CurrentSuggestRatingCombineString}</span></td>
                    </tr>
                )
                }
            </tbody>
           
        </table>
        
      );
    } else {

      return <div className="appH5_color_details appH5_font_smaller" style={{textAlign: 'center'}}> <span>暂无数据</span> </div>;
    }
  }
}

function mapStateToProps(state: any) {

  return {
    ...state.productdetail
  };
}

export default connect(mapStateToProps)(NoteList);