import * as React from 'react';
import { Button } from 'antd-mobile'; 
 
interface Props {
    title: string;
  }
  
export default class MyComponent extends React.Component<Props, {}> {
    render() {
      console.log('Market render');
      return (
        <div class="appH5_body">
  <div id="root" class="appH5_content">
    <div class="product-spinner" v-if="isMarketLoading">
      <mt-spinner type="triple-bounce"></mt-spinner>
    </div>
    <div v-else>
       <mt-loadmore :top-method="loadTop"  ref="loadmore">
    <div class="appH5_panel  appH5_panel_mb" >
    <div class="appH5_title"><span>市场概要</span></div>
    <div>
      <table class="appH5_table">
        <tr>
          <th>分类</th>
          <th class="text-right">今年(单)</th>
          <th class="text-right">今年(亿)</th>
          <th class="text-right">累计(亿)</th>
        </tr>
        <tr v-if="marketSummary.length!=null&&marketSummary.length!=0&&index!=4" v-for="(product,index) in marketSummary" :key="index">
          <td > <router-link v-bind:to="'/product/'+product.ProductTypeId"> <a href="javascript:;" style="color:#FEC447">{{product.SimpleProductType}}</a></router-link></td>
          <td class="text-right">{{product.DealCountCurrentYear}}</td>
          <td class="text-right appH5_color_red">{{product.BalanceCurrentYear}}</td>
          <td class="text-right">{{product.BalanceCumulative}}</td>
        </tr>
        <tr v-if="marketSummary.length!=null&&marketSummary.length!=0">
          <td><router-link to="/product/0"> <a href="javascript:;" style="color:#FEC447;font-weight:bold">{{marketSummary[4].SimpleProductType}}</a></router-link></td>
          <td class="text-right" style="font-weight:bold">{{marketSummary[4].DealCountCurrentYear}}</td>
          <td class="text-right appH5_color_red" style="font-weight:bold">{{marketSummary[4].BalanceCurrentYear}}</td>
          <td class="text-right" style="font-weight:bold">{{marketSummary[4].BalanceCumulative}}</td>
        </tr>
        <!-- <tr v-if="marketSummary.length!=0">
          <td > <router-link to="/product/2"> <a href="javascript:;" style="color:#FEC447">{{marketSummary[1].SimpleProductType}}</a></router-link></td>
          <td class="text-right">{{marketSummary[1].DealCountCurrentYear}}</td>
          <td class="text-right appH5_color_red">{{marketSummary[1].BalanceCurrentYear}}</td>
          <td class="text-right">{{marketSummary[1].BalanceCumulative}}</td>
        </tr>
        <tr v-if="marketSummary.length!=0">
          <td > <router-link to="/product/3"> <a href="javascript:;" style="color:#FEC447">{{marketSummary[2].SimpleProductType}}</a></router-link></td>
          <td class="text-right">{{marketSummary[2].DealCountCurrentYear}}</td>
          <td class="text-right appH5_color_red">{{marketSummary[2].BalanceCurrentYear}}</td>
          <td class="text-right">{{marketSummary[2].BalanceCumulative}}</td>
        </tr>
        <tr v-if="marketSummary.length!=0">
          <td > <router-link to="/product/4"> <a href="javascript:;" style="color:#FEC447">{{marketSummary[3].SimpleProductType}}</a></router-link></td>
          <td class="text-right">{{marketSummary[3].DealCountCurrentYear}}</td>
          <td class="text-right appH5_color_red">{{marketSummary[3].BalanceCurrentYear}}</td>
          <td class="text-right">{{marketSummary[3].BalanceCumulative}}</td>
        </tr>
        <tr v-if="marketSummary.length!=0">
          <td><router-link to="/product"> <a href="javascript:;" style="color:#FEC447;font-weight:bold">{{marketSummary[4].SimpleProductType}}</a></router-link></td>
          <td class="text-right" style="font-weight:bold">{{marketSummary[4].DealCountCurrentYear}}</td>
          <td class="text-right appH5_color_red" style="font-weight:bold">{{marketSummary[4].BalanceCurrentYear}}</td>
          <td class="text-right" style="font-weight:bold">{{marketSummary[4].BalanceCumulative}}</td>
        </tr> -->
      </table>
    </div>
  </div>
  <div class="appH5_panel">
    <div class="appH5_title"><span>发行统计</span></div>
    <div>
      <highcharts :options='options'></highcharts>
    </div>
  </div>
   </mt-loadmore>
    </div>
  </div>

</div>
    );
    }
}
