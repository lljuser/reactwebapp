import * as React from 'react';  
import { connect } from 'dva';
import { ABSNavBar } from '../components/abs-navbar';
import './theme_old.less';
import './tradeDetail.less';
import RoutePageList from '../../RouterConfig';
import { ABSContentLoader } from '../components/abs-loader/index';
import ABSPanel from '../components/abs-panel';

function tradeDetailStateToProps(state: any) {
    return { ...state.tradedetail };
}

class TradeDetailComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
       // 进入同一id，只查询一次
        const noteId = this.props.match.params.couponId;
        if ( this.props.noteId !== noteId ) {
            this.fetchData();
        }
    }

    fetchData() {
        var tradeId, noteId;
        if (this.props.match.params != null) {
            var gradeId = this.props.match.params.gradeId;
            if (gradeId != null) {
                tradeId = gradeId;
            }
            var couponId = this.props.match.params.couponId;
            if (couponId != null) {
                noteId = couponId;
            }
        }
        this.props.dispatch({
            type: 'tradedetail/getDetailData',
            tradeId: tradeId,
            noteId: noteId,
        });

        // url = url.concat(['', tradeId, noteId].join('/'));
        // Request.post(url, {}, (response) => {
        //     console.log(response);
        //     this.setState({ detailInfo: response });
        // });
    }

    render() {
        function TdLabel(props: any) {
            return <td className="appH5_white_space">{props.name}</td>;
        }
        function ShortLine(props: any) {
            return <td className="appH5_color_skyblue">-</td>;
        }
        if (this.props.loading === true) {
            return (
                <React.Fragment>
                    <ABSNavBar
                        title="交易详情"
                        linkTo={{
                            pathname: `${RoutePageList.HomePage}`,
                            state: { type: 'trade' }
                        }}
                    />
                    <ABSContentLoader />
                </React.Fragment>
            );
        } else {
            return (
                <div>
                    <ABSNavBar
                        title="交易详情"
                        linkTo={{
                            pathname: `${RoutePageList.HomePage}`,
                            state: { type: 'trade' }
                        }}
                    />
                    <ABSPanel>
                        <div className="appH5_content_fullheight">
                            <table className="appH5_list_four" cellSpacing="0" cellPadding="0">
                                <tbody>
                                    <tr>
                                        <td colSpan={4} className="appH5_color_white appH5_word_break">
                                            <div className="fl txt_justify">{this.props.detailInfo.DealFullName}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="appH5_color_red" colSpan={2} rowSpan={2}>
                                            <span className="appH5_font_largest">
                                                {
                                                    this.props.detailInfo.TotalOffering >= 10 ?
                                                        Math.round(this.props.detailInfo.TotalOffering) : this.props.detailInfo.TotalOffering
                                                }
                                            </span>
                                            <span>亿</span>
                                        </td>
                                        {this.props.detailInfo.Coupon != null ?
                                            (
                                                <td className="appH5_color_skyblue appH5_vertical_bottom appH5_font_larger appH5_white_space">
                                                    {this.props.detailInfo.Coupon}
                                                </td>
                                            )
                                            : (
                                                <ShortLine />
                                            )
                                        }
                                        <td className="appH5_color_skyblue appH5_vertical_bottom appH5_font_larger appH5_white_space">{this.props.detailInfo.WAL}年</td>
                                    </tr>
                                    <tr>
                                        {
                                            this.props.detailInfo.Rating != null && this.props.detailInfo.Rating !== '-' ?
                                                <td className="appH5_color_skyblue appH5_font_larger appH5_white_space appH5_vertical_middle">
                                                    {this.props.detailInfo.Rating}</td> :
                                                <ShortLine />
                                        }
                                        <td className="appH5_color_skyblue appH5_font_larger appH5_white_space">{this.props.detailInfo.AssetType}</td>
                                    </tr>
                                    <tr>
                                        <TdLabel name="证券类型" />
                                        <td className="appH5_vertical_top">{this.props.detailInfo.SecurityType}</td>
                                        <TdLabel name="交易类型" />
                                        <td className="appH5_white_space">
                                            {
                                                this.props.detailInfo.TradeType === '转让' ?
                                                    '二级市场' : this.props.detailInfo.TradeType === '发行' ?
                                                        '一级市场' : this.props.detailInfo.TradeType
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <TdLabel name="分层占比" />
                                        <td>{this.props.detailInfo.NotionalPct}%</td>
                                        <TdLabel name="交易场所" />
                                        <td>{this.props.detailInfo.Exchange}</td>
                                    </tr>
                                    {
                                        this.props.detailInfo.Description !== undefined && this.props.detailInfo.Description !== null && this.props.detailInfo.Description.length > 0 ?
                                            <tr>
                                                <td colSpan={4} className="txt_justify lineHight introductionCont">
                                                    <span className="appH5_white_space">产品简介</span>
                                                    <div className="appH5_margin_top_td_div" style={{ wordBreak: 'break-all', color: '#ccc' }}>
                                                        {this.props.detailInfo.Description}
                                                    </div>
                                                </td>
                                            </tr> : null
                                    }
                                    {
                                        this.props.detailInfo.AbsProjectUsers !== undefined && this.props.detailInfo.AbsProjectUsers !== null && this.props.detailInfo.AbsProjectUsers.length > 0 ?
                                            <tr>
                                                <td colSpan={4} className="padtop1">
                                                    <span className="fl mr5 iphone5">参与专家</span>
                                                    <div className="fl" style={{ maxWidth: '6.9rem' }}>
                                                        {this.props.detailInfo.AbsProjectUsers.map((item) =>
                                                            <a key="item.id" href="`/webapp/expert.html?UserId=${item.UserId}&isShowHeader=true&path=${$route.path}`" style={{ display: 'inline-block' }}>
                                                                <img className="touxiang" src={item.AvatarPath} />
                                                            </a>
                                                        )}
                                                    </div>
                                                    <div className="clearfix" />
                                                </td>
                                            </tr> : null
                                    }
                                    {
                                        (this.props.detailInfo.Contacts !== undefined && this.props.detailInfo.Contacts !== null && this.props.detailInfo.Contacts.length > 0) ?
                                            (
                                                <tr>
                                                    <td colSpan={4}>
                                                        <div className="fl mr5">联&nbsp;系&nbsp;人&nbsp;</div>
                                                        <div className="fl" style={{ paddingTop: '.12rem' }}>
                                                            {this.props.detailInfo.Contacts.map((contactItem) =>
                                                                <div key="contactItem.id" className="mb08 appH5_color_white">{contactItem.Name}&nbsp;&nbsp;{contactItem.Telephone}</div>
                                                            )}
                                                        </div>
                                                        <div className="clearfix" />
                                                    </td>
                                                </tr>

                                            ) : null
                                    }
                                    <tr>
                                        <td colSpan={4} style={{ height: '2rem' }} />
                                    </tr>
                                </tbody>
                            </table>
                        </div> 
                      </ABSPanel>
                      </div>
 
            );
        }
    }
}
export default connect(tradeDetailStateToProps)(TradeDetailComponent);