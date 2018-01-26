import { MarketApi } from '../../config/api';
import Request from '../../components/http/request';

class MarketService {

  /**
   * 获取市场列表数据
   * 
   * @returns a list
   */
  async getMarketSummary() {
    const api = MarketApi.list;
    const data = await Request.post(api);

    return data;
  }

}

export default new MarketService();