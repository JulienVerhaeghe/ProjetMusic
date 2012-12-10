(function(window) {

function Barre() {

  this.initialize();

}
//p est un raccourci
var p = Barre.prototype = new createjs.Container();

// public properties:

	p.BarreBody;
	
	p.vX;

	p.bounds;

	p.hit;
	
	p.largeurDeplacement = 700;


// constructor:

	p.Container_initialize = p.initialize;	//unique to avoid overiding base class

	

	p.initialize = function() {

		this.Container_initialize();

		this.BarreBody = new createjs.Shape();

		this.addChild(this.BarreBody);

		this.makeShape();
		
		this.vX = 2;

	}

	

// public methods:

	p.makeShape = function() {

		var g = this.BarreBody.graphics;

		g.clear();

		g.setStrokeStyle(1);
		g.beginStroke(createjs.Graphics.getRGB(0,255,0));
		g.beginFill(createjs.Graphics.getRGB(255,0,0));
		g.drawRoundRect (10, 10 , 15 , 100 , 3 )

		this.bounds = 10; 

		this.hit = this.bounds;
		console.log('makeShape');

	}

	
    p.hitRadius = function(tX, tY, tHit) {

		// savoir si il est en dehors de la zone hauteur largeur

		if(tX - tHit > this.x + this.hit) { return  'not'; }

		if(tX + tHit < this.x - this.hit) { return  'not'; }

	},
	
	p.tick = function() {
		
		// deplacer
		this.x += this.vX;

        // si la Barre touche le mur vertical
      	if( this.x >= this.largeurDeplacement) {
        	
        	this.x = 0;
            
        }

	}

	

	



window.Barre = Barre;

}(window));