# 简介

tanbo-ui是一个基于Angular4.0的拓展包，并基于最小改动，最小学习成本的前提下，拓展了部分表单控件，提供了很多网页上的视觉交互组件、指令、服务、过滤器等等。并提供了一套侵入性很小的底层css样式表。

可以这么说，如果你会使用angular，那使用tanbo-ui基本就无需看文档。


---

## 最小更改原则 + 最低学习成本原则

在开发初期就决定，能兼容原生就兼容原生，能一样命名就一样命名，api做得尽量简单，让你能在最小更改和最低学习成本的前提下使用tanbo-ui

就拿常见的表单控件来说，原来你可能是这么写的：

```html
<input type="checkbox" name="name" [(ngModel)]="model">
```

现在你可以这样写：

```html
<ui-input type="checkbox" name="name" [(ngModel)]="model"></ui-input>
```

基本无需改动就可以实现功能，且支持`disabled`、`readonly`等等原生属性。