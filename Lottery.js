var _$_Lottery={
	flag:true,
	extend:function(destination, source) {
		for (var property in source) {
			destination[property] = source[property]
		}
		return destination
	},
	getElementsByClassName:function(className){  
	    var elems = [];  
	    if(!document.getElementsByClassName){  
	        var dom = document.getElementsByTagName("*");  
	        for(var i =0 ;i<dom.length;i++){  
	            if(dom[i].className){  
	                var classs = dom[i].className.split(" ");  
	                for(var c = 0;c<classs.length;c++){  
	                    if(classs[c]==className){  
	                        elems.push(dom[i]);              
	                    }  
	                }  
	            }  
	        }  
	    }else{  
	        var dom = document.getElementsByClassName(className);  
	        for(var i =0 ;i<dom.length;i++){  
	            elems.push(dom[i]);      
	        }  
	    }  
	    return elems;  
	},
	addClass:function(obj, cls) {
        if (!obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))) obj.className += " " + cls;
    },
	removeClass:function(obj, cls) {
        if (obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    },
    setStyle:function(e, a) {
    	var i;
    	for (i in a) 
    		{
    			e.style[i] = a[i]
    		}
    }
};
var Lottery=function(o){
	"use strict";
	this.o={
		prefix:"lottery-unit",
		light:"lottery-light",
		loop:5,
		speed:50
	};
	_$_Lottery.extend(this.o,o||{});
	this.prefix=this.o.prefix;
	this.light=this.o.light;
	this.loop=this.o.loop;
	this.speed=this.o.speed;
	this.step=0;
	this.unit=_$_Lottery.getElementsByClassName(this.prefix);
	this.long=this.unit.length;
};
Lottery.prototype.Clears=function(){
	var _unit=_$_Lottery.getElementsByClassName(this.prefix);
	for(var i=0;i<_unit.length;i++){
		_$_Lottery.removeClass(_unit[i],this.light);
	}
};
Lottery.prototype.Settle=function(num,callback){
	if(typeof num==="number"){
		_$_Lottery.flag=false;
		var _t=this,_speed=_t.speed, _total=this.loop*this.long+num;
		(function(){
			if(_t.step<_total)
			{
				_t.Clears();_$_Lottery.addClass(_$_Lottery.getElementsByClassName(_t.prefix+"-"+(_t.step+_t.long)%_t.long)[0],_t.light);
				_t.step++;
				setTimeout(arguments.callee,_t.step>(_t.loop-1)*_t.long+num?_speed+=177:_speed);
			}
			else
			{
				_$_Lottery.flag=true;
				_t.step=0;
				_speed=_t.speed;
				callback();
				return false;
			}
		})();
	}else{
		console.log("LOTTERY TYPE ERROR!");
	}
};
Lottery.prototype.Run=function(num,callback){
	if(_$_Lottery.flag){
		this.Settle(num,callback)
	}else{
		return false
	}
};