```js
function SuperType(name){
	this.name = name;
	this.colors = ["red","blue","green"]
}

SuperType.prototype.sayName = function(){
	console.log("super	" + this.name)
}

function SubType(name,age){
	SubType.call(this,name)
	this.age = age;
}

inheritPrototype(SubType,SuperType);

SubType.prototype.sayAge = function(){
	console.log("sub" + this.age)
}

//继承方法
function inheritPrototype(subType,superType){
	var prototype = object(superType.prototype);//创建对象
	prototype.constructor = subType; //增强对象
	subType.prototype = prototype; //指定对象
}
```