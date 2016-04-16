var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('emptyGauge','assets/img/emptyGauge.png');
	game.load.image('fillGauge','assets/img/fillGauge.png');
}

function create() {
	cursors = this.game.input.keyboard.createCursorKeys();

	// a gauge that will go up to 100%, starting at 0%, at 2% speed per frame
	gauge = new Gauge(game);
	gauge.create(153, 53, 150, 50, 'fillGauge', 'emptyGauge', 0, 2);

	// a gauge that will go down to 0%, starting at 100%, at 1% speed per frame
	revertedGauge = new Gauge(game);
	revertedGauge.create(153, 103, 150, 100, 'fillGauge', 'emptyGauge', 100, -1);

	// a gauge that will start at 50% and stay still (0% speed per frame)
	staticGauge = new Gauge(game);
	staticGauge.create(153, 153, 150, 150, 'fillGauge', 'emptyGauge', 50, 0);

	// a gauge that will go up to 100% starting at 10% at 3% speed per frame
	fastGauge = new Gauge(game);
	fastGauge.create(153, 203, 150, 200, 'fillGauge', 'emptyGauge', 10, 3);

	// a gauge that will go back and forward from 0% to 100% at 1% speed per frame
	backAndForwardGauge = new Gauge(game);
	backAndForwardGauge.create(153, 253, 150, 250, 'fillGauge', 'emptyGauge', 0, 1);

	// a gauge that will stay empty since it starts a 0% and goes down at 1% speed (can't go under 0% fill)
	stayEmptyGauge = new Gauge(game);
	stayEmptyGauge.create(153, 303, 150, 300, 'fillGauge', 'emptyGauge', 0, -1);

	// a gauge that can be filled and emptied by a player action (here right and left arrows)
	// this feature is enabled by putting start speed at 0% per frame and setting gauge fill speed at either +1% or -1% on press in the update function
	playerGauge = new Gauge(game);
	playerGauge.create(153, 353, 150, 350, 'fillGauge', 'emptyGauge', 0, 0);

	// a gauge using default speed and start values
	defaultGauge = new Gauge(game);
	defaultGauge.create(153, 403, 150, 400, 'fillGauge', 'emptyGauge');
}

function update() {
	// after initializing the gauge, just call it's update method
	gauge.update();
	revertedGauge.update();
	staticGauge.update();
	fastGauge.update();
	stayEmptyGauge.update();
	defaultGauge.update();

	// or manage it's update values by yourself
	updateBackAndForwardGauge();
	updatePlayerGauge();

}

function updateBackAndForwardGauge() {
	if (backAndForwardGauge.getCurrentWidth() >= backAndForwardGauge.getGaugeSize()) {
		// set the fill speed for auto fill (percent value)
		backAndForwardGauge.setFillSpeed(-1);
	} else if (backAndForwardGauge.getCurrentWidth() <= 0) {
		backAndForwardGauge.setFillSpeed(1);
	}

	backAndForwardGauge.update();
}

function updatePlayerGauge() {
	if (cursors.left.isDown) {
		// give a value to fill the gauge (still percent value)
		playerGauge.fill(-1);
	}
	if (cursors.right.isDown) {
		playerGauge.fill(1)
	}

	playerGauge.update();
}
