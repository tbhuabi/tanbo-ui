# 安装


## 安装前准备
请确保你本地已安装[nodejs](http://nodejs.org)最新版本。
请确保你项目中的[angular](https://angular.io/)版本不低于4.0。
如果没你还没有创建项目，可通过[quick-start-cli](https://github.com/18616392776/quick-start-cli)来快速生成一个angular的项目。

## 安装tanbo-ui
```
npm install tanbo-ui --save
```
## 在你的项目中引入tanbo-ui

```typescript
// 这里是依赖的样式表，你也可以直接通过link标签引入
// 如果你想自定义样式，你可以通过taobo-ui提供的scss源文件来修改其中的样式
// scss文件目录 node_modules/tanbo-ui/bundles/assets/scss/

import 'tanbo-ui/bundles/tanbo-ui.min.css'; 

import { UiFormsModule, UiDirectivesModule, UiComponentsModule } from 'tanbo-ui';

@NgModule({
    imports: [
        /* ..other modules.. */
        UiFormsModule,
        UiDirectivesModule,
        UiComponentsModule
    ]
})
```