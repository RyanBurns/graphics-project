// Create the canvas
var canvas = document.createElement("canvas");      //  create canvas element
var ctx = canvas.getContext("2d");      //  reference to context
canvas.width = 512;     //  set canvas height and width
canvas.height = 480;
document.body.appendChild(canvas);      //  attach canvas and document


        //      Load All Images used in-game.
        //  Underwater background image
var backgroundReady = false;
var backgroundImage = new Image();
backgroundImage.onload = function ()        //  trying to draw an image before it's loaded will throw-up an error
{
    backgroundReady = true;
};
backgroundImage.src = "images/underwaters.png";


        // Octopus image
var octopusReady = false;
var octopusImage = new Image();
octopusImage.onload = function ()
{
	octopusReady = true;
};
octopusImage.src = "images/octopus1.png";


        // Crab image
var crabReady = false;
var crabImage = new Image();
crabImage.onload = function ()
{
	crabReady = true;
};
crabImage.src = "images/crab.png";


        // Game objects
var octopus = 
{
	swimSpeed: 300 // Speed of Octopus, Pixels per second
};
var crab = {};
var crabsEaten = 0;


        // Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e)        //  e being the event object being passsed
{
	keysDown[e.keyCode] = true;
},false);

addEventListener("keyup", function (e)
{
	delete keysDown[e.keyCode];
}, false);



        // Reset the game when the player catches a crab
var reset = function () 
{
	octopus.x = canvas.width / 2;
	octopus.y = canvas.height / 2;
    octopus.w = 64;
    octopus.h = 64;

	// Render crab somewhere on screen
	crab.x = 32 + (Math.random() * (canvas.width - 64));
	crab.y = 32 + (Math.random() * (canvas.height - 420));
};//end reset()


        // Update game objects
var update = function (modifier)        //  called every interval execution
{                                       // it evaluates if W,A,S or D have been pressed                 
	if (87 in keysDown)    // Player holding W
    {   
		octopus.y -= octopus.swimSpeed * modifier;        //  modifier uses the time difference between 'then' and 'now'',
	}                                                     //   to modify movement
	if (83 in keysDown)    // Player holding S
    { 
		octopus.y += octopus.swimSpeed * modifier;
	}
	if (65 in keysDown)    // Player holding A
    {
		octopus.x -= octopus.swimSpeed * modifier;
	}
	if (68 in keysDown)    // Player holding D
    {
		octopus.x += octopus.swimSpeed * modifier;
	}

	    // Are they touching?
	if
    (
		octopus.x <= (crab.x + 32)        //  Calculates both positions of octopus and crab       
		&& crab.x <= (octopus.x + 32)     //  and if they evaluate yo be in the same position then
		&& octopus.y <= (crab.y + 32)     //  crabsEaten is incremented, and the reset() function is called to start the game again
		&& crab.y <= (octopus.y + 32)
	) 
    {
		++crabsEaten;     //adds 1 to number of crabs eaten i.e collission counter
		reset();          // Draws the octopus centre screen, and randomizes position of crab. Thta's all
	}
    
    if (octopus.x >= canvas.width - octopus.w -1)       // The following code is border checking,
    {                                                   // not allowing the octopus to stray outside the game

        octopus.x = canvas.width - octopus.w -1;

    }

    if (octopus.x <= 1)
    {

        octopus.x = 1;

    }

    if (octopus.y >= canvas.height - octopus.h -1)
    {

    octopus.y = canvas.height - octopus.h -1;

    }

    if (octopus.y <= 1)
    {

    octopus.y = 1;

    }

};// end update()


        // Render all game objects
var render = function ()
{
	if (backgroundReady)       // if image is loaded, then it's ready to be drawn 
    {
		ctx.drawImage(backgroundImage, 0, 0);
	}

	if (octopusReady)
    {
		ctx.drawImage(octopusImage, octopus.x, octopus.y);
	}

	if (crabReady)
    {
		ctx.drawImage(crabImage, crab.x, crab.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";    //  keeps track of users score
	ctx.font = "20px Tahoma";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Crabs eaten: " + crabsEaten, 16, 16);
};//end render()


        // The main game loop
var main = function () 
{
	var now = Date.now();      // Get curretn timestamp so delta can be calculated
	var delta = now - then;    //  calculate milliseconds since laast interval
	update(delta / 1000);      //  get modifier to send to update
	render();

	then = now;        //  record timestamp

	requestAnimationFrame(main);
};//end main()

    // Suitable for all browsers requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//  Play
var then = Date.now();
reset();        //Start new Game
main();