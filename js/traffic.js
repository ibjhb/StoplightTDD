window.Light = Backbone.View.extend({
	initialize			: function(model, options){
		this.color = this.$el.data('color');
		return this;
	}
	,turnOn				: function(){
		this.$el.addClass(this.color);
	}
	,turnOff			: function(){
		this.$el.removeClass();
	}
	,isOn				: function(){
		return !!(this.$el.hasClass(this.color));
	}
	,isOff				: function(){
		return !!!(this.$el.hasClass(this.color));
	}
});

window.Traffic_light = Backbone.View.extend({
	initialize			: function(){
		var that = this;

		this.lights = [];
		this.order = [
			'red'
			,'green'
			,'yellow'
		];

		// Create Backbone views for each item in the array
		var $lights = this.$el.find('span');
		_($lights).each(function(light){
			that.lights.push( new window.Light({ el : light }) );
		});

		this.setInitial();
		this.run();

		return this;
	}
	,run					: function(){
		var that = this;
		setInterval(function(){
			that.nextColor();
		}, 2000);
	}
	,setInitial			: function() {
		this.changeColor('red');
	}
	,changeColor		: function(requestedColor){
		_(this.lights).each(function(light){
			(light.color === requestedColor) ? light.turnOn() : light.turnOff();
		});
	}
	,getCurrentColor			: function(){
		return _(this.lights).find(function(light){
			return light.isOn();
		}).color;

	}
	,nextColor					: function(){
		var currentColor = this.getCurrentColor();
		var i = this.order.indexOf(currentColor) + 1;
		var x = (i === this.order.length) ? 0 : i;
		var nextColor = this.order[x];

		this.changeColor(nextColor);
	}
});

window.traffic_light = new window.Traffic_light({
	el : $('.traffic-light')
})