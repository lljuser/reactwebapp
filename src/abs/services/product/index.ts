import { ProductApi } from '../../config/api';
import Request from '../../../common/http/request/index';

interface PickerItem {
    label: string;
    value: string;
}

interface ReturnItem {
    rData: Object[];
    info: string;
    CurrentStatus: PickerItem[][];
    DealType: PickerItem[][];
    ProductType: PickerItem[][];
    CurrentStatusValue: string[];
    DealTypeValue: string[];
    ProductTypeValue: string[];
    hasMore: boolean;
}

class ProductService {
    
    async getData(pageIndex: number, rows: number, rData: Object[], CurrentStatusValue: number,
                  DealTypeValue: number, ProductTypeValue: number, isFormatPickerData: boolean) {
        
        let returnItem: ReturnItem = {
            rData: [],
            info: '',
            CurrentStatus: [],
            DealType: [],
            ProductType: [],
            CurrentStatusValue: [],
            DealTypeValue: [],
            ProductTypeValue: [],
            hasMore: true
        };

        let url = ProductApi.list;
        url = url + '/' + ProductTypeValue + '/' + DealTypeValue + '/' + CurrentStatusValue;
        url = url + '/' + pageIndex + '/' + (pageIndex + 1) * rows + '/' + rows;

        let data: any = await Request.post(url, {});
        rData = [...rData, ...data.Deal];
        returnItem.rData = rData;
        if ( data.Deal.length === 0 ) {
                returnItem.info = '已全部加载';
                returnItem.hasMore = false;
                
        } else {
            rData = [...rData, ...data.Deal];
            if (isFormatPickerData === true) {
                returnItem = this.formatPickerData(data, returnItem);
            }
           
            returnItem.info = '加载完成';
            // isLoading = false;
        }
        return returnItem;

      }

      formatPickerData(data: any, returnItem: ReturnItem) {
        let CurrentStatus: PickerItem[] = [];
        let DealType: PickerItem[] = [];
        let ProductType: PickerItem[] = [];
        data.CurrentStatus.forEach(element => {
          let item = element as any;
          CurrentStatus.push({label: item.Text, value: item.Value });
        });
        data.DealType.forEach(element => {
          let item = element as any;
          DealType.push({label: item.Text, value: item.Value });
        });
        data.ProductType.forEach(element => {
          let item = element as any;
          ProductType.push({label: item.Text, value: item.Value });
        });

        returnItem.CurrentStatus = [CurrentStatus];
        returnItem.DealType = [DealType];
        returnItem.ProductType = [ProductType];
        returnItem.CurrentStatusValue =  [CurrentStatus[0].value],
        returnItem.DealTypeValue = [DealType[0].value],
        returnItem.ProductTypeValue = [ProductType[0].value];
        return returnItem;
      }
}
 
export default new ProductService();