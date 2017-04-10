# Lottery
JavaScript原生九宫格抽奖插件，适用于跳转性抽奖效果，具体抽奖数目和样式可自行设置

特点：`向下兼容至IE6`，`原生插件`，`体积小`

* `使用方法`：

```javascript
var lottery=new Lottery({
        prefix:"lottery-unit",//抽奖元素类名前缀 例如：class="lottery-unit lottery-unit-1"
        light:"lottery-light",//抽奖元素高亮样式类名
        loop:5,//循环转圈的次数
        speed:50 //初始滚动速度
});
```
* `抽奖开始`:

```javascript
lottery.Run(
        n,//抽中第几个, 必须为数字
        function(){
                //这里是回调函数的内容
        }
);
```

* [`关于作者`](http://www.douchaoyang.com)
