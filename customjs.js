// window.setInterval(()=>{
// 	let dividewise = document.querySelector('#dividewise')
// 	let typingfantasy = document.querySelector('#typingfantasy')
// 	let bonethrow = document.querySelector('#bonethrow')
// 	let dividewiseparent = dividewise.parentElement
// 	let typingfantasyparent = typingfantasy.parentElement
// 	let bonethrowparent = bonethrow.parentElement
// 	dividewiseparent.visibility="hidden;"
// 	dividewiseparent.opacity= "0;"
//   	dividewiseparent.transition="visibility 0s 2s, opacity 2s linear;"
// 	setTimeout(()=>{
// 		if ( dividewiseparent.style.backgroundImage.includes('dividewise2') ) {
// 			dividewiseparent.style.backgroundImage = "url(dividewise.png)"
// 			typingfantasyparent.style.backgroundImage = "url(typingfantasy.png)"
// 			bonethrowparent.style.backgroundImage = "url(bonethrow.png"
// 		} else {
// 			dividewiseparent.style.backgroundImage = "url(dividewise2.png)"
// 			typingfantasyparent.style.backgroundImage = "url(typingfantasy2.png)"
// 			bonethrowparent.style.backgroundImage = "url(bonethrow2.png)"
// 		}
// 	},500)

// },2500)


var particleAlphabet = {
	Particle: function(x, y) {
		this.x = x;
		this.y = y;
		this.radius = 3; // size of dot
		this.draw = function(ctx) {
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, this.radius, this.radius);
			ctx.restore();
		};
	},
	init: function() {
		document.querySelector('canvas').style.transform="rotate(-0deg)"
		document.querySelector('canvas').style.borderRadius="20px"
		particleAlphabet.canvas = document.querySelector('#canvas1');
		particleAlphabet.ctx = particleAlphabet.canvas.getContext('2d');
		particleAlphabet.W = window.innerWidth - 18*parseFloat(getComputedStyle(document.querySelector('.inner')).fontSize) - 
		3*parseFloat( getComputedStyle(document.querySelector('.inner').parentElement).paddingLeft)
		particleAlphabet.H = 1.5 * particleAlphabet.W/6 
		particleAlphabet.particlePositions = [];
		particleAlphabet.particles = [];
		particleAlphabet.tmpCanvas = document.createElement('canvas');
		particleAlphabet.tmpCtx = particleAlphabet.tmpCanvas.getContext('2d');
		particleAlphabet.canvas.width = particleAlphabet.W;
		particleAlphabet.canvas.height = particleAlphabet.H;

		window.DELETEME = setInterval(function(){
			particleAlphabet.changeLetter();
			particleAlphabet.getPixels(particleAlphabet.tmpCanvas, particleAlphabet.tmpCtx);
		}, 2400);

		if (particleAlphabet.canvas.width > 2000) {
			particleAlphabet.makeParticles(4500)
		}
		else {
			particleAlphabet.makeParticles(4000);
		}
		particleAlphabet.animate();
	}, 
	currentPos: 0,
	changeLetter: function() {
		var letters = 'ABC',
			letters = letters.split('');

		// my edit
		letters = ["/web/dev","edw/ard/"]

		particleAlphabet.time = letters[particleAlphabet.currentPos];
		particleAlphabet.currentPos++;
		if (particleAlphabet.currentPos >= letters.length) {
			particleAlphabet.currentPos = 0; 
		}
	},
	makeParticles: function(num) {
		for (var i = 0; i <= num; i++) {
			// particleAlphabet.particles.push(new particleAlphabet.Particle(particleAlphabet.W / 2 + Math.random() * 400 - 200, particleAlphabet.H / 2 + Math.random() * 400 -200));
			particleAlphabet.particles.push(new particleAlphabet.Particle(particleAlphabet.W / 2 + Math.random() * 400 - 200, particleAlphabet.H / 2 + Math.random() * 400 -200));

		}
	},
	getPixels: function(canvas, ctx) {
		var keyword = particleAlphabet.time,
			gridX = 6, // spacing between dots on x axis
			gridY = 6;
		canvas.width = window.innerWidth - 18*parseFloat(getComputedStyle(document.querySelector('.inner')).fontSize) - 
		3*parseFloat( getComputedStyle(document.querySelector('.inner').parentElement).paddingLeft)
		canvas.height = 1.5 * canvas.width/6  // 240//window.innerHeight;
		ctx.fillStyle = 'red';
		ctx.font = `bold ${canvas.width/6}px Arial`;
		ctx.fillText(keyword, canvas.width / 2 - ctx.measureText(keyword).width / 2, canvas.height / 2 + canvas.height/4); // bigger # at end  the lower the text
		var idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
		var buffer32 = new Uint32Array(idata.data.buffer);
		if (particleAlphabet.particlePositions.length > 0) particleAlphabet.particlePositions = [];
		for (var y = 0; y < canvas.height; y += gridY) {
			for (var x = 0; x < canvas.width; x += gridX) {
				if (buffer32[y * canvas.width + x]) {
					particleAlphabet.particlePositions.push({x: x, y: y});
				}
			}
		}
	},
	
	//for each dot make the dot shake
	animateParticles: function() {
		var p, pPos;
		for (var i = 0, num = particleAlphabet.particles.length; i < num; i++) {
			p = particleAlphabet.particles[i];
			pPos = particleAlphabet.particlePositions[i];
			if (particleAlphabet.particles.indexOf(p) === particleAlphabet.particlePositions.indexOf(pPos)) {
				// p.x is like the dispersion; breaks at 2
				p.x += (pPos.x - p.x) * .3;
				p.y += (pPos.y - p.y) * .3;
				p.draw(particleAlphabet.ctx);
			}
		}
	},
	animate: function() {
		requestAnimationFrame(particleAlphabet.animate);
		particleAlphabet.ctx.fillStyle = '#312450' //'rgba(23, 41, 58, .8)'; // bgcolor
		particleAlphabet.ctx.fillRect(0, 0, particleAlphabet.W, particleAlphabet.H);
		particleAlphabet.animateParticles();
	}
};

window.onload = particleAlphabet.init;
window.onresize = function(){
	return;
	clearInterval(window.DELETEME)
	delete particleAlphabet
	particleAlphabet = {}
	document.querySelector('canvas').remove()
	let thing = document.createElement('canvas')
	thing.id = 'canvas1'
	let h1 = document.querySelector('h1')
	let parent = document.querySelector('#parent')
	parent.insertBefore(thing,h1)
	//lazy

	var particleAlphabet = {

	Particle: function(x, y) {
		this.x = x;
		this.y = y;
		this.radius = 3; // size of dot
		this.draw = function(ctx) {
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, this.radius, this.radius);
			ctx.restore();
		};
	},
	init: function() {
		document.querySelector('canvas').style.transform="rotate(-0deg)"
		document.querySelector('canvas').style.borderRadius="20px"
		particleAlphabet.canvas = document.querySelector('#canvas1');
		particleAlphabet.ctx = particleAlphabet.canvas.getContext('2d');
		particleAlphabet.W = window.innerWidth - 18*parseFloat(getComputedStyle(document.querySelector('.inner')).fontSize) - 
		3*parseFloat( getComputedStyle(document.querySelector('.inner').parentElement).paddingLeft)
		particleAlphabet.H = 1.5 * particleAlphabet.W/6 
		particleAlphabet.particlePositions = [];
		particleAlphabet.particles = [];
		particleAlphabet.tmpCanvas = document.createElement('canvas');
		particleAlphabet.tmpCtx = particleAlphabet.tmpCanvas.getContext('2d');
		particleAlphabet.canvas.width = particleAlphabet.W;
		particleAlphabet.canvas.height = particleAlphabet.H;

		window.DELETEME = setInterval(function(){
			particleAlphabet.changeLetter();
			particleAlphabet.getPixels(particleAlphabet.tmpCanvas, particleAlphabet.tmpCtx);
		}, 2400);

		if (particleAlphabet.canvas.width > 2000) {
			particleAlphabet.makeParticles(5000)
		}
		else {
			particleAlphabet.makeParticles(4000);
		}
		particleAlphabet.animate();
	}, 
	currentPos: 0,
	changeLetter: function() {
		var letters = 'ABC',
			letters = letters.split('');

		// my edit
		letters = ["/web/dev","edw/ard/"]

		particleAlphabet.time = letters[particleAlphabet.currentPos];
		particleAlphabet.currentPos++;
		if (particleAlphabet.currentPos >= letters.length) {
			particleAlphabet.currentPos = 0; 
		}
	},
	makeParticles: function(num) {
		for (var i = 0; i <= num; i++) {
			// particleAlphabet.particles.push(new particleAlphabet.Particle(particleAlphabet.W / 2 + Math.random() * 400 - 200, particleAlphabet.H / 2 + Math.random() * 400 -200));
			particleAlphabet.particles.push(new particleAlphabet.Particle(particleAlphabet.W / 2 + Math.random() * 400 - 200, particleAlphabet.H / 2 + Math.random() * 400 -200));

		}
	},
	getPixels: function(canvas, ctx) {
		var keyword = particleAlphabet.time,
			gridX = 6, // spacing between dots on x axis
			gridY = 6;
		canvas.width = window.innerWidth - 18*parseFloat(getComputedStyle(document.querySelector('.inner')).fontSize) - 
		3*parseFloat( getComputedStyle(document.querySelector('.inner').parentElement).paddingLeft)
		canvas.height = 1.5 * canvas.width/6  // 240//window.innerHeight;
		ctx.fillStyle = 'red';
		ctx.font = `bold ${canvas.width/6}px Arial`;
		ctx.fillText(keyword, canvas.width / 2 - ctx.measureText(keyword).width / 2, canvas.height / 2 + canvas.height/4); // bigger # at end  the lower the text
		var idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
		var buffer32 = new Uint32Array(idata.data.buffer);
		if (particleAlphabet.particlePositions.length > 0) particleAlphabet.particlePositions = [];
		for (var y = 0; y < canvas.height; y += gridY) {
			for (var x = 0; x < canvas.width; x += gridX) {
				if (buffer32[y * canvas.width + x]) {
					particleAlphabet.particlePositions.push({x: x, y: y});
				}
			}
		}
	},
	
	//for each dot make the dot shake
	animateParticles: function() {
		var p, pPos;
		for (var i = 0, num = particleAlphabet.particles.length; i < num; i++) {
			p = particleAlphabet.particles[i];
			pPos = particleAlphabet.particlePositions[i];
			if (particleAlphabet.particles.indexOf(p) === particleAlphabet.particlePositions.indexOf(pPos)) {
				// p.x is like the dispersion; breaks at 2
				p.x += (pPos.x - p.x) * .3;
				p.y += (pPos.y - p.y) * .3;
				p.draw(particleAlphabet.ctx);
			}
		}
	},
	animate: function() {
		requestAnimationFrame(particleAlphabet.animate);
		particleAlphabet.ctx.fillStyle = '#312450' //'rgba(23, 41, 58, .8)'; // bgcolor
		particleAlphabet.ctx.fillRect(0, 0, particleAlphabet.W, particleAlphabet.H);
		particleAlphabet.animateParticles();
	}
};
	particleAlphabet.init();
}