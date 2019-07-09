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
  treeList: TreeNode[] = [];

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
    });
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
