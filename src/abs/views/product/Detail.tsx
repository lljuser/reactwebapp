import * as React from 'react';
import { Link } from 'dva/router';
import '../components/index.less'; 
import moment from 'moment';
import RoutePageList from '../../RouterConfig';
import '../components/theme_old.less';

class Detail extends React.Component<any, {}> {

  render() {
    const detail = this.props.detail;
    if (detail == null || detail === undefined) {
      return null;
    }

    return (
      <table className="appH5_list_two" >
      <tbody>
          <tr>
              <td>产品名称</td>
              <td>{detail.Basic.DealNameChinese}</td>
          </tr>
          <tr>
              <td>产品分类</td>
              <td>
                  <div>
                    <Link 
                      to={{ 
                        pathname: `${RoutePageList.HomePage}`,
                        state: {
                          type: 'product',
                          productQuery: {
                            productTypeValue: [detail.Basic.ProductTypeId]  
                          }
                        } 
                      }}
                    > 
                    {detail.Basic.ProductType}
                    </Link></div>
                  <div>&nbsp;└&nbsp;
                    <Link 
                        to={{ 
                          pathname: `${RoutePageList.HomePage}`,
                          state: {
                            type: 'product',
                            productQuery: {
                              productTypeValue: [detail.Basic.ProductTypeId],
                              dealTypeValue: [detail.Basic.DealTypeId] 
                            }
                          } 
                        }}
                    >  
                    {detail.Basic.DealType}
                    </Link></div>
                  {detail.Basic.AssetSubCategoryId != null ?  <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└&nbsp;{detail.Basic.AssetSubCategory}</div> : ''} 
              </td>
          </tr>
          <tr>
          <td>产品状态</td>
          <td>{detail.Basic.CurrentStatus}</td>
          </tr>
          <tr>
          <td>成立日期</td>
          <td>
          {detail.Basic.ClosingDate != null ? moment(detail.Basic.ClosingDate).format('YYYY年MM月DD日') : '-'}</td>
          </tr>
          <tr>
          <td>发起机构</td>
          <td>
            {
              (!detail.Basic || !Array.isArray(detail.Basic.DealOriginator)) ? null : detail.Basic.DealOriginator.map((item) =>
                <div key={item}>
                    <span>{item}</span><br/>
                </div> 
              )
            }
          </td>
          </tr>
          <tr>
          <td style={{verticalAlign: 'middle'}}>金额(亿)</td>
          <td className="appH5_font_largest appH5_color_red">{detail.Basic.TotalOffering}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Detail;