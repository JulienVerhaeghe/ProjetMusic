(function ($) {
	window.Main = {
		version : 0,
		statue  : 'dev',
		
		//permet de precharger les fichiers audios
		preload : new createjs.PreloadJS(),
		
		//stage qui va etre utiliser pour afficher les instances
		stage : "",
		
		// objets crées à partir de classes
		barre : '',
		arrayNote : [],
		background : '',
		
		// Champs textes
		messageField :'' ,
		
		
		loadingInterval : "",
	    preload : '', 
	    
		//fonction lancé quand les scripts et l'html est chargé
		init : function(){
			
			//on va chercher la balise canvas et on crée la scéne
			this.stage = new createjs.Stage(document.getElementById("canvas"));
			
			//création d'un champ texte pour indiquer le temps de chargement restant'
			this.messageField = new createjs.Text("Loading", "bold 24px Arial", "#000");
			this.messageField.maxWidth = 500;
			
			//centrer le message
			this.messageField.textAlign = "center";			
            this.messageField.x = this.stage.canvas.width  >> 1;
            this.messageField.y = this.stage.canvas.height >> 1;
            
            //ajout du message sur la scene
            this.stage.addChild(this.messageField);
            
            // preloader
            this.preload = new createjs.PreloadJS();
            this.preload.onComplete = this.onDownloadComplete;
            this.preload.installPlugin(createjs.SoundJS);
            
            //variable temporaire car utilisé qu'au début'
            //tout les fichiers à telecharger avec preload.js
            var manifest = [{id:"do", src:"mp3/Game-Shot.mp3"},{id:"re", src:"mp3/Asharp3-233.08.mp3"},]; 
            this.preload.loadManifest(manifest);
           
            // demander à afficher une animation lors du chargement
            this.loadingInterval = setInterval(this.updateLoading, 200);
			
		},
		updateLoading : function() {

            Main.messageField.text = "Loading " + (Main.preload.progress*100|0) + "%"
            Main.stage.update();
       	},
		onDownloadComplete : function(){
			Main.stage.removeAllChildren();
       		
			
			//avertir que tout est charger et inviter a lancer l'appli
			var button = new createjs.Bitmap('img/btnPlay.png');
			button.x = Main.stage.canvas.width  >> 1;
			button.y = Main.stage.canvas.height >> 1;
			Main.stage.addChild(button);
			// Standard display object mouse events
			button.onPress = Main.start;
			
			Main.stage.update();
			
       	},
       	 
       	start :function(event){
       		Main.stage.removeAllChildren();
       		Main.background = new Background();
			Main.stage.addChild(Main.background);
       		Main.barre = new Barre();
       		Main.stage.addChild(Main.barre);
       		createjs.Ticker.setPaused(false);

			createjs.Ticker.setFPS(60);
			createjs.Ticker.addListener(Main);
			//ecouter un evenement click
			Main.stage.onPress = Main.ajoutNote; 
       	},
       	ajoutNote : function(evt){
			var note = new Note();
			note.x = evt.stageX;
			note.y = evt.stageY;
			Main.arrayNote.push(note);
			Main.stage.addChild(note);
	   },
       	
       	tick : function(){
       		Main.barre.tick();
       		
       		var nbNote = Main.arrayNote.length;
       		for(var i=0;i<nbNote;i++){
       			var currentNote = Main.arrayNote[i];
       			if(currentNote.x >= Main.barre.x - 1 && currentNote.x <= Main.barre.x   ){
       				currentNote.play();
       			}else{
       				currentNote.stop();
       			}
       		}
       		
			Main.stage.update();
       	},
	}
	Main.init();
} (jQuery));