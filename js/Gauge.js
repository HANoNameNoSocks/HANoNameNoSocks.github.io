function Gauge(game) {
	this.game = game;

	this.startValue = 0;
	this.gaugeSize = 0;
	this.fillSpeed = 1;

	this.emptyGauge = null;
	this.fillGauge = null;
};


// the gauge create function takes these arguments : 

// fillPosX -> the fill asset X position, 
// fillPosY -> the fill asset Y position, 
// borderPosX -> the border asset X position, 
// borderPosY -> the border asset Y position, 
// fillSpriteName -> the reference to the fill sprite, 
// borderSriteName -> the reference to the boredr sprite, 
// startValue -> optional, the start value for the gauge (default 0),
// fillSpeed -> optional, the speed for filling the gauge (default 1)

// all values in percent so you don't have to specify a size for the gauge
Gauge.prototype.create = function create(fillPosX, fillPosY, borderPosX, borderPosY, fillSpriteName, borderSriteName, startValue, fillSpeed) {
	this.emptyGauge = this.game.add.sprite(borderPosX, borderPosY, borderSriteName);
	this.fillGauge = this.game.add.sprite(fillPosX, fillPosY, fillSpriteName);

	if (startValue != null && startValue != undefined) {
		this.startValue = startValue;
	}

	if (fillSpeed != null && fillSpeed != undefined) {
		this.fillSpeed = fillSpeed;
	}

	this.gaugeSize = this.fillGauge.width;
	this.fillGauge.width = this.gaugeSize / 100 * this.startValue;
}; 

Gauge.prototype.update = function update() {
	this.fill(this.fillSpeed);
};

Gauge.prototype.fill = function fill(fillSpeed) {
	var ratio = (this.gaugeSize / 100) * fillSpeed;
	this.fillGauge.width = this.fillGauge.width + ratio;

	// deal with the floating precision loss
	if (this.fillGauge.width > this.gaugeSize) {
		this.fillGauge.width = this.gaugeSize;
	} else if (this.fillGauge.width < 0) {
		this.fillGauge.width = 0;
	}

};

Gauge.prototype.setFillSpeed = function setFillSpeed(fillSpeed) {
	this.fillSpeed = fillSpeed;
};

Gauge.prototype.getCurrentWidth = function getCurrentWidth() {
	return this.fillGauge.width;
};

Gauge.prototype.getGaugeSize = function getGaugeSize() {
	return this.gaugeSize;
};

Gauge.prototype.setValue = function setValue(percent) {
	return this.fillGauge.width = this.fill(percent);
};