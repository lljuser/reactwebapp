import * as React from 'react';
import '../../components/abs-tabs/index.less'; 

class NoteList extends React.Component<any, {}> {

  render() {
    const detail = this.props.detail;
    if (detail == null || detail === undefined) {
      return <div className="appH5_color_details appH5_font_smaller" style={{textAlign: 'center'}}> <span>暂无数据</span> </div>;
    }

    return (
      <table className="appH5_table">
          <thead>
              <tr>
                  <th>简称</th>
                  <th className="text-right">初始(亿)</th>
                  <th className="text-right">利率</th>
                  <th className="text-right">期限(年)</th>
                  <th className="text-right">量化评级</th>
                  <th className="text-right">类型</th>
              </tr>
          </thead>
          <tbody>
              {
                detail.NoteList.map((item) =>
                    <tr key={item.NoteId}>
                      <td><div className="appH5_white_space appH5_font_normal" style={{width: '0.8rem'}}>{item.Name}</div></td>
                      <td className="text-right"><span className="appH5_color_red">{item.Notional}</span></td>
                      <td className="text-right"><span className="appH5_color_skyblue">{item.CurrentCoupon}</span></td>
                      <td className="text-right"><span className="appH5_color_skyblue">{item.CurrentWal}</span></td>
                      <td className="text-center"><span className="appH5_color_skyblue">{item.CurrentSuggestRatingCombineString == null || item.CurrentSuggestRatingCombineString === '' ? '-' : item.CurrentSuggestRatingCombineString}</span></td>
                      <td className="text-right"><span>{item.RepaymentOfPrincipal.replace('型', '')}</span></td>
                    </tr>
                )
              }
          </tbody> 
      </table>
    );
  }
}

export default NoteList;