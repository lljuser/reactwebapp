import * as React from 'react';

class Structure extends React.Component<any, {}> {

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    /**
     * 修改获得的数据样式
     */
    let paidList: any = document.getElementsByClassName('divHasPaid');
    for (let i = 0; i < paidList.length; i++) {
                paidList[i].style.backgroundImage = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABPSURBVChTY1y3esV/BiDYtX09iGJw8wwE0zAAE/f39QPTTGCSBMCYkRQOtgFmMifLXzC9cfMmMI1uI+k2wPwAA+hu/v6HGUzDxEm0gYEBALKKGjTje4yiAAAAAElFTkSuQmCC)';
            }
    let bgList: any = document.getElementsByClassName('structure_bg');
    for (let i = 0; i < bgList.length; i++) {
                bgList[i].style.backgroundColor = '#B7AFA5';
                let aList = bgList[i].getElementsByTagName('a');
                for (let j = 0; j < aList.length; j++) {
                    aList[j].href = 'javascript:;';
                    aList[j].title = '';
                }
            }
    let nameList: any = document.getElementsByClassName('str_n');
    for (let k  = 0; k < nameList.length; k++ ) {
                nameList[k].style.color = 'black';
            }
    let pctList: any = document.getElementsByClassName('str_npct');
    for (let x  = 0; x  < pctList.length; x++) {
                pctList[x].style.color   = '#06c';
            }
  }

  render() {
    if (this.props.noteConsTable == null || this.props.noteConsTable === undefined) {
      return <div className="appH5_color_details appH5_font_smaller" style={{textAlign: 'center'}}> <span>暂无数据</span> </div>;
    }

    return (
      <div>
          <div style={{textAlign: '-webkit-center'}}><div id="test" style={{margin: '0 auto', width: this.props.chartWidthPx + 'px'}}  > <div dangerouslySetInnerHTML={{__html: this.props.noteConsTable}} /> </div></div>
          <div style={{textAlign: 'center', height: '0.4rem'}}>
              <div style={{margin: '0 auto', width: '3rem'}}>
                  <div className="backTablePic" />
                  <div style={{float: 'left', fontSize: '11px', marginTop: '2px'}}>已偿付</div>
                  <div style={{float: 'left', margin: '4px 4px 4px 2px', width: '12px', height: '11px', backgroundColor: '#B7AFA5'}} />
                  <div style={{float: 'left', fontSize: '11px', marginTop: '2px'}}>剩余</div>
              </div>
          </div>
      </div>
    );
  }
}

export default Structure;