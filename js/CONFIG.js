
	// Image per second
var FRAME_RATE = 40,
	
	// Canvas to be drawn
	CANVAS = $("#map"),

	// Context
	CONTEXT = CANVAS[0].getContext('2d'),

	// Tile size
	TILE_SIZE = 70,

	// Should we display the FPS monitor ?
	// Set to false in Production
	DISPLAY_FPS_MONITOR = true,


	//-------------------------------------------------------//
	//--------------- CHARACTER CONFIGURATION ---------------//
	//-------------------------------------------------------//

	SPEED_X = 20,
	JUMP = 50,
	MAX_SPEED = 60,

	// Gravity
	GRAVITY_UP = 0.70,
	GRAVITY_DOWN = 1.2,

	MAX_HEALTH_POINTS = 6;