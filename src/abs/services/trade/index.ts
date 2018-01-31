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

    /**
     * 调用获取利率集合接口
     * 
     * @returns 
     * @memberof TradeService
     */
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

    /**
     * 请求交易数据
     * 
     * @param {boolean} refresh 
     * @param {number} direction 方向 1--向下翻页
     * @param {number} pageIndex 页数
     * @param {any[]} rData 数据源
     * @param {number} rows 每页行数
     * @param {number} [ratingValue=0] 评级
     * @param {number} [couponValue=0] 利率
     * @param {number} [walbuckValue=0] 期限
     * @returns 
     * @memberof TradeService
     */
    async genData(refresh: boolean, direction: number, pageIndex: number, rData: any[], rows: number, ratingValue: number = 0, couponValue: number = 0, walbuckValue: number = 0) {
        let returnGenData: any = {
            rData: [],
            info: '',
            hasMore: true,
        };
        if (refresh) {
            pageIndex = 1;
            rData = [];
        }

        var url = TradeApi.list;
        url = url + '/' + ratingValue + '/' + couponValue + '/' + walbuckValue;
        url = url + '/' + direction + '/' + pageIndex * rows + '/' + rows;

        let res = await Request.post(url, {});
        rData = [...rData, ...res];
        returnGenData.rData = rData;
        if (res.length === 0) {
            returnGenData.info = '没有更多了';
            returnGenData.hasMore = false;
        } else {
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