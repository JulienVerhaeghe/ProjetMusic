(function ($) {
	window.Partition = {
		version : 0,
		
		// Propriétés avec valeur par défaut
		HEIGHT : 480,
		WIDTH  : 640,
		
		canvas : "",
		stage : "",
		
		
		// objets crées à partir de classes
		barre : '',
		notes : [],
		
		init : function(){
			
			// this désigne l'objet Partition
			this.canvas = document.getElementById("canvas");
			
            // création du stage
            this.stage = new createjs.Stage(this.canvas)
            this.stage.update();
            
            //créations d'instance de classe
            this.barre = new Barre();
            
			Partition.isReady = true;
			this.startPartition();
			
			this.canvas.width = this.WIDTH;
			
			this.canvas.height = this.HEIGHT;
            
		},
		
       
       	tick : function(){
       		
       		
       		Partition.barre.tick();
       		var nbNote = Partition.notes.length;
       		
       		for(var i=0;i<nbNote;i++){
       			var currentNote = Partition.notes[i];
       			if(currentNote.x >= Partition.barre.x - 1 && currentNote.x <= Partition.barre.x   ){
       				currentNote.play();
       			}
       		}
       		
       		Partition.stage.update();
       		
       	},
       	
       	startPartition : function(){
			console.log('startPartition')
			Partition.stage.removeAllChildren();
			createjs.Ticker.setPaused(false);

			createjs.Ticker.setFPS(60);
			createjs.Ticker.addListener(Partition);
			
			// ajout sur le stage des objets
			
			var g = new createjs.Graphics();
		
			
			g.beginFill(createjs.Graphics.getRGB(255,255,255));
			g.drawRect(0,0,Partition.WIDTH,Partition.HEIGHT);
			var rect = new createjs.Shape(g);
			
       		Partition.stage.addChild(rect);
		
			
			Partition.stage.onPress = function(evt) {
				var note = new Ball();
				note.x = evt.stageX;
				note.y = evt.stageY;
				Partition.notes.push(note);
				Partition.stage.addChild(note);
			}
			Partition.stage.addChild(Partition.barre);
       	},
       	
       	pause : function(){
       		
       	},
       	resume : function(){
       		
       	},
		
		
		
	}
	Partition.init();
} (jQuery));