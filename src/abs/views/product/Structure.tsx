import * as React from 'react';
import { connect } from 'dva';
import '../../components/abs-tabs/index.less'; 
// import '../../../public/css/theme.css';

class Structure extends React.Component<any, {}> {

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
        <div>
            <div style={{textAlign: 'center'}}><div id="test" style={{margin: '0 auto', width: this.props.chartWidthPx + 'px'}}  > <div dangerouslySetInnerHTML={{__html: this.props.noteConsTable}} /> </div></div>
            <div style={{textAlign: 'center', height: '0.4rem'}}>
                <div style={{margin: '0 auto', width: '3rem'}}>
                    <div className="backTablePic" />
                    <div style={{float: 'left', fontSize: '11px', marginTop: '2px'}}>已偿付</div>
                    <div style={{float: 'left', margin: '4px 4px 4px 2px', width: '12px', height: '11px', backgroundColor: '#B7AFA5'}} />
                    <div style={{float: 'left', fontSize: '11px', marginTop: '2px'}}>剩余</div>
                </div>
            </div>
        </div>
        
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

export default connect(mapStateToProps)(Structure);