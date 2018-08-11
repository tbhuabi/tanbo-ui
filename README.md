# 简介

@tanbo/ui是一个基于 Angular 的组件库，并基于最小改动，最小学习成本的前提下，拓展了部分表单控件，提供了很多网页上的视觉交互组件、指令、服务、过滤器等等。并提供了一套侵入性很小的底层css样式表。

可以这么说，如果你会使用 Angular，那使用@tanbo/ui基本就无需看文档。


---

## 最小更改原则 + 最低学习成本原则

就拿常见的表单控件来说，原来你可能是这么写的：

```html
<input type="checkbox" name="name" [(ngModel)]="model">
```

现在你可以这样写：

```html
<ui-input type="checkbox" name="name" [(ngModel)]="model"></ui-input>
```

基本无需改动就可以实现功能，且支持`disabled`、`readonly`等等原生属性

## 在线文档及演示

**[live demo](https://www.tanboui.com/ui)**

## 更新日志
[CHANGELOG.md](./CHANGELOG.md)

## 安装
```
npm install tanbo-ui --save
```

## 在你的项目中引入tanbo-ui
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UIModule } from '@tanbo/ui';

// 这里是依赖的样式表，你也可以直接通过 link 标签引入
// 如果你想自定义样式，你可以通过 scss 源文件来修改其中的样式
// scss 文件目录 node_modules/@tanbo/ui/assets/scss/
import '@tanbo/ui/index.min.css'; 


@NgModule({
    imports: [
        /* ..other modules.. */
        UIModule.forRoot(), // 如果是子模块或异步模块，如路由模块，则不要调用
        BrowserModule,
        BrowserAnimationsModule // UiModule 依赖动画模块
    ]
})

export class AppModule {
}
```
## 在根组件志明`<ui-app></ui-app>`组件
```html
<!-- app.component.html -->

<ui-app>
  <!-- your code ... -->
</ui-app>
```
现在你就可以使用@tanbo/ui所提供的所有功能了。
**更详细的文档请点击[https://www.tanboui.com/ui](https://www.tanboui.com/ui)**