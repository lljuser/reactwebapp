import { ProductApi } from '../../config/api';
import Request from '../../components/http/request/index';

interface PickerItem {
    label: string;
    value: string;
}

interface ReturnItem {
    rData: Object[];
    isLoading: boolean;
    info: string;
    CurrentStatus: PickerItem[][];
    DealType: PickerItem[][];
    ProductType: PickerItem[][];
    CurrentStatusValue: string[];
    DealTypeValue: string[];
    ProductTypeValue: string[];
    hasMore: boolean;
}

class Product {
    
    async getData(pageIndex: number, rows: number, rData: Object[], CurrentStatusValue: number,
                  DealTypeValue: number, ProductTypeValue: number, isFirstLoad: boolean) {
        
        let returnItem: ReturnItem = {
            rData: [],
            isLoading: false,
            info: '',
            CurrentStatus: [],
            DealType: [],
            ProductType: [],
            CurrentStatusValue: [],
            DealTypeValue: [],
            ProductTypeValue: [],
            hasMore: true
        };

        let formatData: any;
        let url = ProductApi.list;
        url = url + '/' + CurrentStatusValue + '/' + DealTypeValue + '/' + ProductTypeValue;
        url = url + '/' + pageIndex + '/' + (pageIndex + 1) * rows + '/' + rows;
        console.log('1');
        console.log(isFirstLoad);
        let data: any = await Request.post(url, {});
       
        console.log('2');
        console.log(data);
        if ( data.Deal.length === 0 ) {
                returnItem.info = '已全部加载';
                returnItem.hasMore = false;
        } else {
            rData = [...rData, ...data.Deal];
            if (isFirstLoad === true) {
                formatData = this.formatPickerData(data);
                console.log('3');
                console.log(formatData);
                returnItem.CurrentStatus = formatData.CurrentStatus;
                returnItem.DealType = formatData.DealType;
                returnItem.ProductType = formatData.ProductType;
                returnItem.CurrentStatusValue = formatData.CurrentStatusValue;
                returnItem.DealTypeValue = formatData.DealTypeValue;
                returnItem.ProductTypeValue = formatData.ProductTypeValue;
                    
            }
            returnItem.rData = rData;
            returnItem.info = '加载完成';
            // isLoading = false;
        }
        return returnItem;

      }

      formatPickerData(data: any) {
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

        return {
            CurrentStatus: [CurrentStatus], 
            DealType: [DealType], 
            ProductType: [ProductType],
            CurrentStatusValue: [CurrentStatus[0].value],
            DealTypeValue: [DealType[0].value],
            ProductTypeValue: [ProductType[0].value]
        };
      }
}

export default new Product();