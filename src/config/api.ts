 
const ApiAddress = process.env.REACT_APP_API_ADDRESS;
export default ApiAddress;

export const MarketApi = {
  list: `${ApiAddress}/momarket/productsummary`,
  chart: `${ApiAddress}/momarket/getissuestatchartdata`,
}; 

export const ProductApi = {
  // {productTypeId?}/{dealTypeId?}/{currentStatusId?}/{direction?}/{lastId?}/{pageSize?}
  list: `${ApiAddress}/modeal/getdeallist`,
  // /{dealId?}
  detail: `${ApiAddress}/modeal/getdealfactory`,
  // /{dealId}/{resultId}
  chart: `${ApiAddress}/modeal/getnotecashflowchartdata`,
  // 
  structure: `${ApiAddress}/modeal/getnotestructure`,
}; 
 
export const TradeApi = {
  // /{ratingId?}/{couponId?}/{walId?}/{lastId?}/{pageSize?}/{direction?}
  list: `${ApiAddress}/motrade/gettradelist`,
  // /{tradeId}/{noteId}/{tradeType}
  detail: `${ApiAddress}//motrade/gettradedata`,
  typeList: `${ApiAddress}/motrade/getsecuritytypelist`, 
  walbuckList: `${ApiAddress}/moTrade/getwalbucketlist`, 
  ratingList: `${ApiAddress}/motrade/getratinglist`,
  couponList: `${ApiAddress}/motrade/getcouponlist`,
}; 

export const Demo = {
  list: 'http://10.1.1.35/Demo/DemoProduct/getlist',
  detail: 'http://10.1.1.35/Demo/DemoProduct/getitem',
};
