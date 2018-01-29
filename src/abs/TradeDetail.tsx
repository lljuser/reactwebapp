import * as React from 'react';
import Request from '../components/http/request/index';
import { NavBar, Icon } from 'antd-mobile';
import { Link } from 'dva/router';
import './tradeDetail.css';

interface Props {
    title: string;
    lastPath: string;
    detailInfo: Detail;
    match: any;
}

interface Detail {
    AbsProjectUsers: any[];
    Contacts: any[];
    [propName: string]: any;
}

export default class MyComponent extends React.Component<{}, Props> {
    constructor(props: Props) {
        super(props);
        this.state = {
            title: props.title,
            lastPath: props.title,
            match: props.match,
            detailInfo: {
                AbsProjectUsers: [],
                Contacts: []
            }
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        var url = 'http://10.1.1.35/motrade/gettradedata';
        console.log(this.props);
        var tradeId = 86;
        var noteId = 6714;
        if (this.state.match.params != null) {
            var gradeId = this.state.match.params.gradeId;
            if (gradeId != null) {
                tradeId = gradeId;
            }
            var couponId = this.state.match.params.couponId;
            if (couponId != null) {
                noteId = couponId;
            }
        }

        url = url.concat(['', tradeId, noteId].join('/'));
        Request.post(url, {}, (response) => {
            console.log(response);
            this.setState({ detailInfo: response });
        });
    }

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Link to="/Trade"><Icon type="left" /></Link>}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >
                    NavBar
                </NavBar>
                <div className="appH5_content">
                    <div className="appH5_panel">
                        <table className="appH5_list_four" cellSpacing="0" cellPadding="0">
                            <tr>
                                <td colSpan={4} className="appH5_color_white appH5_word_break">
                                    <div className="fl txt_justify">{this.state.detailInfo.DealFullName}</div>
                                </td>
                            </tr>
                            <tr>
                                <td className="appH5_color_red" colSpan={2} rowSpan={2}>
                                    <span className="appH5_font_largest">
                                        {
                                            this.state.detailInfo.TotalOffering >= 10 ?
                                                Math.round(this.state.detailInfo.TotalOffering) : this.state.detailInfo.TotalOffering
                                        }
                                    </span>
                                    <span>亿</span>
                                </td>
                                {this.state.detailInfo.Coupon != null ?
                                    (
                                        <td className="appH5_color_skyblue appH5_vertical_bottom appH5_font_larger appH5_white_space">
                                            {this.state.detailInfo.Coupon}
                                        </td>
                                    )
                                    : (
                                        <td className="appH5_color_skyblue">-</td>
                                    )
                                }
                                <td className="appH5_color_skyblue appH5_vertical_bottom appH5_font_larger appH5_white_spac">{this.state.detailInfo.WAL}年</td>
                            </tr>
                            <tr>
                                {
                                    this.state.detailInfo.Rating != null && this.state.detailInfo.Rating !== '-' ?
                                        <td className="appH5_color_skyblue appH5_font_larger appH5_white_space appH5_vertical_middle">
                                            {this.state.detailInfo.Rating}</td> :
                                        <td className="appH5_color_skyblue">-</td>
                                }
                                <td className="appH5_color_skyblue appH5_font_larger appH5_white_space">{this.state.detailInfo.AssetType}</td>
                            </tr>
                            <tr>
                                <td className="appH5_white_space">证券类型</td>
                                <td className="appH5_vertical_top">{this.state.detailInfo.SecurityType}</td>
                                <td className="appH5_white_space">交易类型</td>
                                <td className="appH5_white_space">
                                    {
                                        this.state.detailInfo.TradeType === '转让' ?
                                            '二级市场' : this.state.detailInfo.TradeType === '发行' ?
                                                '一级市场' : this.state.detailInfo.TradeType
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className="appH5_white_space">分层占比</td>
                                <td>{this.state.detailInfo.NotionalPct}%</td>
                                <td className="appH5_white_space">交易场所</td>
                                <td>{this.state.detailInfo.Exchange}</td>
                            </tr>
                            {
                                this.state.detailInfo.Description !== undefined && this.state.detailInfo.Description !== null && this.state.detailInfo.Description.length > 0 ?
                                    <tr v-if="this.state.detailInfo.Description !== undefined &&this.state.detailInfo.Description !== null && this.state.detailInfo.Description.length > 0">
                                        <td colSpan={4} className="txt_justify lineHight introductionCont">
                                            <span className="appH5_white_space">产品简介</span>
                                            <div className="appH5_margin_top_td_div" style={{ wordBreak: 'break-all', color: '#ccc' }}>
                                                {this.state.detailInfo.Description}
                                            </div>
                                        </td>
                                    </tr> : ''
                            }
                            {
                                this.state.detailInfo.AbsProjectUsers !== undefined && this.state.detailInfo.AbsProjectUsers !== null && this.state.detailInfo.AbsProjectUsers.length > 0 ?
                                    <tr v-if="this.state.detailInfo.AbsProjectUsers !== undefined &&this.state.detailInfo.AbsProjectUsers !== null && this.state.detailInfo.AbsProjectUsers.length > 0">
                                        <td colSpan={4} className="padtop1">
                                            <span className="fl mr5 iphone5">参与专家</span>
                                            <div className="fl" style={{ maxWidth: '6.9rem' }}>
                                                {this.state.detailInfo.AbsProjectUsers.map((item) =>
                                                    <a key="item.id" href="`/webapp/expert.html?UserId=${item.UserId}&isShowHeader=true&path=${$route.path}`" style={{ display: 'inline-block' }}>
                                                        <img className="touxiang" src={item.AvatarPath} />
                                                    </a>
                                                )}
                                            </div>
                                            <div className="clearfix" />
                                        </td>
                                    </tr> : ''
                            }
                            {(this.state.detailInfo.Contacts !== undefined && this.state.detailInfo.Contacts !== null && this.state.detailInfo.Contacts.length > 0) ?
                                (
                                    <td colSpan={4}>
                                        <div className="fl mr5">联&nbsp;系&nbsp;人&nbsp;</div>
                                        <div className="fl" style={{ paddingTop: '.12rem' }}>
                                            {this.state.detailInfo.Contacts.map((contactItem) =>
                                                <div key="contactItem.id" className="mb08 appH5_color_white">{contactItem.Name}&nbsp;&nbsp;{contactItem.Telephone}</div>
                                            )}
                                            {/* <div className="mb08 appH5_color_white" v-for="contactItem in this.state.detailInfo.Contacts">{contactItem.Name}&nbsp;&nbsp;{contactItem.Telephone}</div> */}
                                        </div>
                                        <div className="clearfix" />
                                    </td>
                                ) : ''
                            }
                            <tr>
                                <td colSpan={4} style={{ height: '2rem' }} />
                            </tr>
                        </table>
                    </div>
                </div>
            </div >
        );
    }
}
