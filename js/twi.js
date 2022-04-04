function preload() {
		   mask = loadImage('twibbon.png');
		}

		function setup() {
			var uploadBtn = createFileInput(imageUpload);
			uploadBtn.parent('inputbtn');
			  // create canvas
			  var c = createCanvas(500, 500);
			  background('#fff');
			  c.parent('canvas');
			  // Add an event for when a file is dropped onto the canvas
			  c.drop(gotFile);
		}

		function draw() {
		  fill(0);
		  noStroke();
		  textSize(21);
		  textAlign(CENTER);
		  text('Fotomu akan Muncul disini', width/2, height/2);
		  noLoop();
		}

		function remake() {
			background('#fff');
			redraw();
		}

		// function changeColor() {
		// 	image(img, mouseX, mouseY, img.width, img.height);
		// }

		function download() {
			saveCanvas("twibbon-by-ferry-ayunda", 'jpg');
		}

		function gotFile(file) {
		  // If it's an image file
		  if (file.type === 'image') {
		    // Create an image DOM element but don't show it
		    background('#fff');
		    redraw();
		    var img = createImg(file.data).hide();
		    // Draw the image onto the canvas
		   image(img, 0, 0, width , height);

		   
		   image(mask, 0, 0, width, height);
		  } else {
		    println('Not an Photos file!');
		  }
		}

		function imageUpload(file){
		    img = loadImage(file.data,function(){
		    	background('#fff');
		    	redraw();
		    	image(img, 0, 0, width , height);
		        image(mask,0,0,width,height);
		    })        
		}
	
