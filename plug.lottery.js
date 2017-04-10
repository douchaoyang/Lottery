/*
**@Author  douchaoyang
**@Relyed  core.lib.js
*/
window.Lottery = window.Lottery || function($) {
    var Lottery = function(o) {
        "use strict";
        this.o = {
            prefix:"lottery-unit",
            light:"lottery-light",
            loop:3,
            speed:90
        };
        extend(this.o, o || {});
        /*所要循环的元素类名前缀*/
        this.prefix = this.o.prefix;
        /*高亮时的样式类名*/
        this.light = this.o.light;
        /*循环的次数*/
        this.loop = this.o.loop;
        /*动画的速度*/
        this.speed = this.o.speed;
        this.step = 0;
        this.flag = true;
        this.unit = $.getElementsByClassName(this.prefix);
        this.long = this.unit.length;
    };
    /*清除元素高亮样式*/
    Lottery.prototype.clears = function() {
        var _unit = $.getElementsByClassName(this.prefix);
        for (var i = 0; i < _unit.length; i++) {
            $.removeClassName(_unit[i], this.light);
        }
    };
    /*开始动画*/
    Lottery.prototype.settle = function(num, callback) {
        if (typeof num === "number") {
            var _t = this, _speed = _t.speed, _total = this.loop * this.long + num;
            _t.flag = false;
            (function() {
                if (_t.step < _total) {
                    _t.clears();
                    $.addClassName($.getElementsByClassName(_t.prefix + "-" + ((_t.step + _t.long) % _t.long + 1))[0], _t.light);
                    _t.step++;
                    setTimeout(arguments.callee, _t.step > (_t.loop - 1) * _t.long + num ? _speed += 177 :_speed);
                } else {
                    _t.flag = true;
                    _t.step = 0;
                    _speed = _t.speed;
                    callback.call(this);
                	_t.clears();
                    return false;
                }
            })();
        } else {
            console.log("Whoops!");
        }
    };
    Lottery.prototype.run = function(num, callback) {
        if (this.flag) {
            this.settle(num, callback);
        } else {
            return false;
        }
    };
    return Lottery;
}(core);