import { TradeApi } from '../../config/api';
import Request from '../../../common/http/request/index';

interface ReturnItem {
    detailInfo: Detail;
}

interface Detail {
    AbsProjectUsers: any[];
    Contacts: any[];
    DealFullName: string;
    [propName: string]: any;
}

/**
 * 交易业务封装
 */
class TradeService {
    /**
     * 调用获取期限集合接口
     * 
     * @memberof Trade
     */
    async getWalbuckList() {
        let returnWalbuckList: any = {
            walbuckList: [],
            walbuckValues: []
        };
        let res: any = await Request.post(TradeApi.walbuckList, {});
        if (res.length > 0) {
            res.forEach(element => {
                returnWalbuckList.walbuckList.push({ label: element.Value, value: element.Key });
            });
            returnWalbuckList.walbuckValues.push(returnWalbuckList.walbuckList[0].value);
        }
        return returnWalbuckList;
    }

    async getCouponList() {
        let returnCouponList: any = {
            couponList: [],
            couponValues: []
        };
        let res: any = await Request.post(TradeApi.couponList, {});
        if (res.length > 0) {
            res.forEach(element => {
                returnCouponList.couponList.push({ label: element.Value, value: element.Key });
            });
            returnCouponList.couponValues.push(returnCouponList.couponList[0].value);
        }
        return returnCouponList;
    }

    /**
     * 调用获取评级集合接口
     * 
     * @memberof Trade
     */
    async  getRatingList() {
        let returnRatingList: any = {
            ratingList: [],
            ratingValues: []
        };
        let res: any = await Request.post(TradeApi.ratingList, {});
        if (res.length > 0) {
            res.forEach(element => {
                returnRatingList.ratingList.push({ label: element.Value, value: element.Key });
            });
            returnRatingList.ratingValues.push(returnRatingList.ratingList[0].value);
        }
        return returnRatingList;
    }

    async genData(cmd: string, refresh: boolean, direction: number, pageIndex: number, rData: any[], ratingValues: any[], couponValues: any[], walbuckValues: any[], rows: number) {
        let returnGenData: any = {
            rData: [],
            info: '',
            hasMore: true,
        };
        if (refresh) {
            pageIndex = 1;
            rData = [];
        }

        var ratingValue = (ratingValues[0] === undefined ? 0 : ratingValues[0]) as string;
        var couponValue = (couponValues[0] === undefined ? 0 : couponValues[0]) as string;
        var walbuckValue = (walbuckValues[0] === undefined ? 0 : walbuckValues[0]) as string;

        var url = TradeApi.list;
        url = url + '/' + ratingValue + '/' + couponValue + '/' + walbuckValue;
        url = url + '/' + direction + '/' + pageIndex * rows + '/' + rows;

        let res = await Request.post(url, {});
        if (res.length === 0) {
            if (cmd === 'onRefresh') {
                rData = [];
                returnGenData.rData = rData;
                returnGenData.info = '没有更多了';
                returnGenData.hasMore = false;
            } else {
                returnGenData.info = '没有更多了';
                returnGenData.hasMore = false;
            }

        } else {
            rData = [...rData, ...res];
            returnGenData.rData = rData;
            returnGenData.info = '加载完成';
        }
        return returnGenData;
    }

    async getTradeDetail(tradeId: number, noteId: number) {
        let api = TradeApi.detail;
        api = api.concat(['', tradeId, noteId].join('/'));
        const data = await Request.post(api);
        let returnItem: ReturnItem = {
            detailInfo: data,
        };
        return returnItem;
    }
}
export default new TradeService();