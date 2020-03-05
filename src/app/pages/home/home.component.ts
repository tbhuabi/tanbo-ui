import { Component, OnInit } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TreeNode {
  label: string;
  hasChildren: boolean;
  children?: TreeNode[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  dataList: any[] = [{
    name: '张三',
    age: 34,
    job: '程序员',
    checked: true
  }, {
    name: '李四',
    age: 12,
    job: '银行家',
    checked: true
  }, {
    name: '王五',
    age: 65,
    job: '产业工人',
    checked: true
  }, {
    name: '赵六',
    age: 22,
    job: '艺术家',
    checked: true
  }];
  treeList: TreeNode[] = [];

  data: any = ['aaa', 'ccc'];

  ngOnInit(): void {
    // 模拟从服务端获取数据
    new Observable<TreeNode[]>(subscriber => {
      setTimeout(() => {
        subscriber.next([{
          label: 'A',
          hasChildren: true
        }, {
          label: 'B',
          hasChildren: true
        }, {
          label: 'C',
          hasChildren: true
        }, {
          label: 'D',
          hasChildren: true
        }]);
      }, 2000);
    }).subscribe(response => {
      this.treeList = response;
      this.dataList.push({
        name: '赵六',
        age: 22,
        job: '艺术家',
        checked: false
      }, {
        name: '赵六',
        age: 22,
        job: '艺术家',
        checked: false
      })
    });
  }



  saveSelectedData(items: any[]) {
    console.log(items);
  }

  getChildren(node: TreeNode) {
    // 模拟从服务端获取数据
    if (node.children) {
      return;
    }
    setTimeout(() => {
      node.children = 'ABCD'.split('').map(item => {
        return {
          label: node.label + item,
          hasChildren: Math.random() > 0.5
        };
      });
    }, 200);
  }

}
