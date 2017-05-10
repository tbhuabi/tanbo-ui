import { Component } from '@angular/core';

@Component({
    selector: 'ui-app',
    templateUrl: 'app.html',
    styleUrls: ['./app.scss']
})
export class AppComponent {
    disabled: boolean = false;
    open: boolean = false;
    data: any = {a: 20};
    list: Array<string> = ['1', '2', '3'];
    dataList: Array<any> = [{
        key: 'name133333333333333333333333333333333333333333333333333333333333333333333333333333333333',
        value: '000'
    }, {
        key: 'name2',
        value: '11111'
    }, {
        key: 'name3',
        value: '333'
    }, {
        key: 'name4',
        value: '444'
    }, {
        key: 'name5',
        value: '666'
    }];

    options: any = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {value: 335, name: '直接访问'},
                    {value: 310, name: '邮件营销'},
                    {value: 234, name: '联盟广告'},
                    {value: 135, name: '视频广告'},
                    {value: 1548, name: '搜索引擎'}
                ]
            }
        ]
    };

    submit() {
        console.log(this.data);
    }
}
