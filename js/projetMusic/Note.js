(function(window) {

function Note() {

  this.initialize();

}
//p est un raccourci
var p = Note.prototype = new createjs.Container();

// public properties:

	p.NoteBody;

	p.active = false;
	

// constructor:

	p.Container_initialize = p.initialize;	//unique to avoid overiding base class

	

	p.initialize = function() {

		this.Container_initialize();

		this.NoteBody = new createjs.Shape();

		this.addChild(this.NoteBody);

		this.makeShape();

	}

	

// public methods:

	p.makeShape = function() {

		//Cercle

		var g = this.NoteBody.graphics;

		g.clear();

		g.setStrokeStyle(1);
		g.beginStroke(createjs.Graphics.getRGB(0,255,0));
		g.beginFill(createjs.Graphics.getRGB(255,0,0));
		g.drawCircle(0,0,10);


	}

    
    p.play = function () {
        
       // if(!p.active){
        	p.active = true;
        	var g = this.NoteBody.graphics;

			g.clear();
	
			g.setStrokeStyle(1);
			g.beginStroke(createjs.Graphics.getRGB(255,255,0));
			g.beginFill(createjs.Graphics.getRGB(255,255,0));
			g.drawCircle(0,0,10);
       // }
        
		
	}
	p.stop = function(){
			
			p.active = false;
			var g = this.NoteBody.graphics;

			g.clear();
	
			g.setStrokeStyle(1);
			g.beginStroke(createjs.Graphics.getRGB(0,255,0));
			g.beginFill(createjs.Graphics.getRGB(255,0,0));
			g.drawCircle(0,0,10);
			
		
		//createjs.SoundJS.pause("do");
	}

	

	



window.Note = Note;

}(window));