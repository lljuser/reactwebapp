import { TradeApi } from '../../config/api';
import Request from '../../../common/http/request';

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