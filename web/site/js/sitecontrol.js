// JavaScript Document
var _TYPE="";
var _DH={};
var _NODE={};
var _SCALE = window.innerWidth / 480;
var _R = 70 * _SCALE;

/*####################################################### NEW CODE FOR MAME #######################
var joystickPollingInterval = null;
var _GAMEHEIGHTMAME = window.innerWidth * 1.25;
var _GAMEWIDTHMAME = window.innerWidth * 1.25;
var _GAMEWIDTH=448;
var _GAMEHEIGHT=576;

var _ROOT = "/DMP/MAME";
var _PLATFORM = null;
var _LEFTPADDNGS = null;
var _WAIT = null;
var once = null;
var _DOMELEMENTS = [];
var loadedMame = null;
var gamesList=[];
var config = null;
var containerUsed = null;
var waitRoms = document.getElementById("waitForRoms");
var multiplier = 1;
runCreateMame()
			
// Function to get query parameters
function getQueryParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
}
// Get the DATA value
var _ROMSLOADED = false;//getQueryParam("ROMSLOADED") || false;
// Display the value in console or use it

function runCreateMame(){
    s1 = new createScripts("gs1",_ROOT+"/globalvariables/helperfunctions.js");
	s2 = new createScripts("gs2",_ROOT+"/mamejs/mamejs.js");
	var interval = setInterval(function(){
		var check=["gs1","gs2"]//,"gs3"];
		if (checkLoaded(check)){
			clearInterval(interval);
			s4 = new createScripts("gs4",_ROOT+"/joystick/joystick.js");
			s5 = new createScripts("gs5",_ROOT+"/joystick/gamepads.js");
			s6 = new createScripts("gs6",_ROOT+"/joystick/keyboard.js");
			s7 = new createScripts("gs7",_ROOT+"/joystick/virtualJoystick.js");
			s8 = new createScripts("gs8",_ROOT+"/joystick/joystickintegrationMAME.js");
			s9 = new createScripts("gs9",_ROOT+"/globalvariables/dom.js");
			var interval_2 = setInterval(function(){
				var check=["gs4","gs5","gs6","gs7","gs8","gs9"];
				if(checkLoaded(check)){
					clearInterval(interval_2);
					//var params = new URLSearchParams(window.location.search);
					//var rom = params.get('rom');
					_PLATFORM = setPlatform();
					document.body.style.margin="0px";
					document.body.style.padding="0px";
					var container=document.getElementById("container");
					container.style.overflow="auto";
					_LEFTPADDNGS=setWindow(_PLATFORM,1,1);
					if(_GAMEWIDTHMAME < 390){
						multiplier = 2.2;
					}
					var ret = createConfigMame("/DMP/site/img/tnailsmame/thumbnailsmame.txt")
					clearInterval(interval);
				}
			},37);
		}
	},37);
}

function createScripts(id,src){
	this.id = id;
	this.script = document.createElement("script");
	this.script.src = src;
	document.body.appendChild(this.script);
	this.script.addEventListener("load",function(){
		_LOADEDELEMENTS.push(this.id);
	}.bind(this));
}

function checkLoaded(arrIDs){
	for(var i=0;i<arrIDs.length;i++){
		if(_LOADEDELEMENTS.indexOf(arrIDs[i])==-1){
			return false;
		}
	}
	return true;
}

function getConfigForGame(originalConfig, gameName) {
    if (!originalConfig.games.driver[gameName] || !originalConfig.games.files[gameName]) {
        return null; // Return null if the game is not found
    }

    return {
        emulator: originalConfig.emulator,
        games: {
            driver: { [gameName]: originalConfig.games.driver[gameName] },
            files: { [gameName]: originalConfig.games.files[gameName] }
        },
        resolution: originalConfig.resolution
    };
}


function preloadMAME(config, container, rom) {
	//if(_ROMSLOADED){
	//	loadedMame = loadedMame;
	//	return(config.games);
	//}
	//_localConfig = getConfigForGame(config,rom)
	//console.log("CONFIG = ", _localConfig);
	return mamejs.load(config.emulator, container).then((mame) => {
		loadedMame = mame; // Store instance
		console.log("LOADED MAME", loadedMame);
		return loadedMame.loadRoms(config.games.files) // Load all ROMs
			.then(() => {
				//console.log(loadedMame.controllers);
				console.log("All Roms preloaded");
				_ROMSLOADED = true;				
				waitRoms.style.display = "none";
				//localStorage.setItem("loadedMame", Flatted.stringify(loadedMame));
				//return(config.games);
				if (!loadedMame) {
					console.error("MAMEJS is not loaded yet!");
					return;
				}

	});	
	});
}

function setConfigMame(gamesList){
	var path = '/DMP/MAME/roms/'
	var files = {};
	var driver = {};
	gamesList.forEach((game)=>{
		if (!(game.includes("dmp"))){
			files[game] = path + game;
			driver[game] = game;
		}
	});
	var container = document.getElementById("mame-container");
	var cont = document.getElementById("container");
	if(_PLATFORM.touchScreen){
		var mame_wrapper = document.getElementById("mameWrapper");
		container.style.position = "absolute";
		container.style.left = "-10%";
		//container.style.overflow = "hidden";
		//mame_wrapper.style.overflow= "hidden";
		//document.body.style.overflow = "hidden";
		//cont.style.overflow = "hidden";
		container.style.width = _GAMEWIDTHMAME + "px";
		container.style.height = _GAMEHEIGHTMAME + "px";
		mame_wrapper.style.width = _GAMEWIDTHMAME + "px";
		mame_wrapper.style.height = _GAMEHEIGHTMAME + "px";
		console.log("MAME WRAPPER", mame_wrapper, mame_wrapper.style.width, mame_wrapper.style.height);
		
	}
	var games = {files,driver}	

	var config = {
		emulator: '/DMP/MAME/mamejs/mame.js', // Path to MAMEJS compiled file
		games: games,
		resolution: {
			width: _GAMEWIDTHMAME,
			height: _GAMEHEIGHTMAME
		}
	};

	console.log("CONFIG = ", config);

	if (typeof mamejs === "undefined") {
		console.error("mamejs is not loaded. Make sure the script path is correct.");
		return;
	}

	var ret =[config,container]
	return(ret);
}

function createConfigMame(list){
	if(1==2){//_ROMSLOADED){ // NEED TO FIX ON A RAINY DAY
		//var loadedMame = Flatted.parse(localStorage.getItem("loadedMame")) || "ERROR";
		//console.log("Loaded MAME:", loadedMame);
		return;
	}
	gamesList=[];
	getText("text",list);
	let check = ["text"];
	var interval = setInterval(function(){
		if(checkLoaded(check)){
			var spriteListTxt = _RETURNTEXT["text"];
			clearInterval(interval)
			check=[];
			for(var i=0;i<spriteListTxt.length;i++){
				var file = spriteListTxt[i];
				var url=file.slice(file.indexOf(",")+11,file.length);
				if(!url.includes("dmp")&&url!="")
				   gamesList.push(url)
			}
			var interval_2 = setInterval(function(){
				if(checkLoaded(check)){
					clearInterval(interval_2);
					clearInterval(interval);
					console.log("ROMS LOADED YET ?",_ROMSLOADED);
					 // OFFLINE TREATMENT TO BE FIXED ONE OF THESE DAYS
					var ret = setConfigMame(gamesList);
					config = ret[0];
					var container = ret[1];
					var dummy1 = preloadMAME(config, container);
					//testing deleting all elements but mame container
					//var dummy2 = removeAllElementsButMameDiv();
					//el.dispatchEvent(new Event("loaded"));
				}		
			}.bind(this),47);				
		}
	}.bind(this),47)
}

function getText(id,src){
    var req = new XMLHttpRequest();
    req.open("GET",src,true);
    req.send(null);
	var ret = [];
	req.onload=function(){
        _LOADEDELEMENTS.push(id);
        _RETURNTEXT[id] = req.responseText.split("\n")	
	};
}

function addBackAllELements(){
	stopSelectedROM()
	//console.log("ADDING ALL ELS BACK, MAMEJS = ", loadedMame);
	// code is done so that order of elements is kept as the original
	let container = document.getElementById("container");
	container.remove()
	let containerChildren = document.body.children;
	let docBody = document.body;
	var l = containerChildren.length;
	// finishes storing and deleting
	let count = 0; 
	for (var i = 0; i < l ; i++) {
		//console.log("ADDING A ", containerChildren[count].tagName)
		if(containerChildren[count].tagName!='SCRIPT'){
			_DOMELEMENTS.push(containerChildren[count]);
			containerChildren[count].remove()
		}else{
			count ++;
		}
		//if(!containerChildren[0].tagName=='SCRIPT'&&containerChildren[0].id!='mameWrapper'){
		//	_DOMELEMENTS.push(containerChildren[0]);
		//	containerChildren[0].remove()
		//}	
	}
	//console.log(containerChildren);
	//inverts order
	let _AUXELEMENTS = [];
	l = _DOMELEMENTS.length
	for (var i = 0; i < l; i++) {
		var el = _DOMELEMENTS.pop()
		_AUXELEMENTS.push(el);	
	}
	// adds back to body
	l = _AUXELEMENTS.length
	for (var i = 1; i < l; i++) {
		var el = _AUXELEMENTS.pop()
		//console.log("ADDING ", el.tagName);
		docBody.appendChild(el);	
	}
	// add the mame-wrapper back
	var mameWrapper = document.getElementById("mameWrapper");
	if (!mameWrapper) {
		mameWrapper = document.createElement("div");
		mameWrapper.id = "mameWrapper";
		document.body.appendChild(mameWrapper);
	}
	var logoContainer = document.getElementById("logo-container");
	if (!logoContainer) {
		logoContainer = document.createElement("div");
		logoContainer.id = "logo-container";
		mameWrapper.appendChild(logoContainer);
	}
	var mameContainer = document.getElementById("mame-container");
	if (!mameContainer) {
		mameContainer = document.createElement("div");
		mameContainer.id = "mame-container";
		mameWrapper.appendChild(mameContainer);
	}
	container = document.getElementById("container");
	if (!container) {
		container = document.createElement("div");
		container.id = "container";
		document.body.appendChild(container);
	}
	// hides the logo
	var el_logo = document.getElementById("logo-container");
	el_logo.style.visibility = "hidden";
	docBody.style.backgroundColor = "#EEEEEE"
	console.log("ADDED ALL ELS BACK, MAMEJS = ", loadedMame);
	createConfigMame("/DMP/site/img/tnailsmame/thumbnailsmame.txt");
	return;
}

function removeAllElementsButMameDiv(){
	//console.log("TRYING TO REMOVE ELEMENTS");
	let containerChildren = document.body.children;
	let l = containerChildren.length
	let count = 0;
	for (var i = 0; i < l; i++) {
			//console.log(containerChildren[count].tagName)
			if(containerChildren[count].tagName!='SCRIPT'&&containerChildren[count].id!='mameWrapper'){
				_DOMELEMENTS.push(containerChildren[count]);
    			containerChildren[count].remove()
			}else{
				count ++;
			}
	}
	if(!_PLATFORM.touchScreen){
		var el_logo = document.getElementById("logo-container");
		el_logo.style.visibility = "visible";
	}
	//console.log("MAMEJS = ", loadedMame)
}


function reloadMameScript() {
    if (s2) {
        //console.log("Removing old MAMEJS script...");
        s2.script.remove();  // Remove the script from the DOM
        s2 = null;  // Clear the global variable
    }
    //console.log("Reloading MAMEJS script...");
    s2 = new createScripts("gs2", _ROOT + "/mamejs/mamejs.js");
    // Wait for the script to load before proceeding
    let checkInterval = setInterval(() => {
        if (checkLoaded(["gs2"])) {
            clearInterval(checkInterval);
            console.log("MAMEJS script reloaded successfully.");
			//console.log(mamejs);
			addBackAllELements();
        }
    }, 50);
}

// Run the selected ROM
function runSelectedROM(rom) {
	document.body.style.backgroundColor="#1e1e2f";	
	//console.log("AT RUNNING ROMAMAMAMA");
	//var mameContainer = document.getElementById('mame-container')
	//mameContainer.setAttribute("style","width:"+ _GAMEWIDTHMAME.toString()+"px");
	//mameContainer.setAttribute("style","height:"+_GAMEHEIGHTMAME.toString()+"px");
	console.log("TRYING TO RUN ", rom);
	var selectedROM = rom;
	//preloadMAME(config,mameContainer,rom)
	console.log("MAMEJS = ", loadedMame);
	if (!loadedMame) {
		console.error("MAMEJS is not loaded yet!");
		return;
	}
	// Remove all elements from page
	dummy1 = removeAllElementsButMameDiv();
	// Run the selected game
	loadedMame.runGame(selectedROM)
		.then(() => {
			console.log("Now playing:", selectedROM);
			initializeJoystick(mamejs); // Ensure joystick integration after game loads
		})
		.catch((err) => console.error("Error starting game:", err));
	/*document.body.style.backgroundColor = "#1e1e2f";
	console.log("RUNNING ROM: ", rom);
	if (loadedMame) {
		console.log("Stopping previous instance...");
		stopSelectedROM();
		loadedMame = null;
	}
	// Reload MAMEJS to ensure a fresh start
	reloadMameScript();
	var mameContainer = document.getElementById("mame-container");
	if (!mameContainer) {
		mameContainer = document.createElement("div");
		mameContainer.id = "mame-container";
		document.body.appendChild(mameContainer);
	}
	// Delay execution slightly to ensure MAMEJS is reloaded
	setTimeout(() => {
		var ret = setConfigMame(gamesList);
		var config = ret[0];
		var container = ret[1];
		mamejs.load(config.emulator, container).then((mame) => {
			loadedMame = mame;
			console.log("LOADED MAME JS", loadedMame);
			return mame.loadRoms(config.games.files);
		}).then(() => {
			console.log("Now playing:", rom);
			loadedMame.runGame(rom);
			setTimeout(() => {
                if (loadedMame) {
					console.log("LOAD MAME CONT" ,loadedMame.controllers)
                    initializeJoystick(loadedMame);
                } else {
                    console.error("MAMEJS not initialized properly before joystick setup.");
                }
            }, 100); // Small delay to let MAMEJS fully initialize
		}).catch((err) => console.error("Error starting game:", err));
	}, 500); // Short delay to allow MAMEJS to reload
}

//Stop playing game
function stopSelectedROM(){
	try {
	  loadedMame.loader.module.ccall('exit', 'void', ['number'], [0]);
	  console.log("QUIT MAME");
	} catch (err) {
		console.log("MAME exited, ignoring error:", err.message);
		//console.log(loadedMame)
	}
}

// Initialize joystick integration
function initializeJoystick(mamejs) {
	if (joystickPollingInterval) clearInterval(joystickPollingInterval);
	myJoystick = new joystick(_PLATFORM,mamejs);
	dh = new domHelpers(myJoystick.js);
	// AVOID CREATING SETINTERVAL
	/*
	joystickPollingInterval = setInterval(() => {
		var dummy1 = myJoystick.js.readJoystick();
		// a joystick exit will cause the game to pause via joystickintegratiomMAME
		if(myJoystick.js.exit){
		if(!once){
			var dummy1 = confirmExit("RESUME");
		}
		}
		var dummy2 = myJoystick.checkPress();
	}, 16); // Poll joystick state every 16ms (~60 FPS)
	

}

// Stop joystick polling
function stopJoystick() {
	if (joystickPollingInterval) {
		clearInterval(joystickPollingInterval);
		joystickPollingInterval = null;
		myJoystick.js = null;
		myJoystick = null;
	}
}

var callBackChoice = function(){
if(!dh.chosing){
	if(dh.choice==0){
	//dh.removeChose("container");
	var container = document.getElementById("container");
	let child = container.lastElementChild;
	while (child) {
		container.removeChild(child);
		child = container.lastElementChild;
	}
	//myJoystick.gamepads=null;
	//myJoystick.keyboard=null;
	//stopJoystick();
	once = false;
	//window.location.href="/DMP/site/dmp.html?ROMSLOADED=true";
	//reloads the original DMP page
	//window.location.reload(true);
	waitRoms.style.display="block";
	reloadMameScript();
}else{
	var container = document.getElementById("container");
	let child = container.lastElementChild;
	count = 0;
	while (child && count < 2) {
		console.log(child.tagName);
		if(child.tagName=='P'){
			count ++;
			container.removeChild(child);
			child = container.lastElementChild;
		}
	}
	myJoystick.exit = true;
	once = true;
	myJoystick.integrationMAME.checkPress(myJoystick);
	setTimeout(()=>{
		myJoystick.exit = false;
		once = false;
	},750);
}
}
}
// ask if finish game
function confirmExit(str2,js){
	//console.log("CAME TO CONFIRM EXIT")
	_CHOSE = false;
	dh.chose({wrapper:document.getElementById("container"),scale:_SCALE,choices:[" E X I T",str2],boxshadow:"0px 0px 1px 4px black",halfscreen:"none",callback:callBackChoice,joystick:js});
	dh.jsHandler();
	once = true;
}


*///####################################################### END OF NEW CODE FOR MAME #######################

function sitecontrol(){
	this.user="";
	this.currentUser="";
	this.mail="";
	this.cookieObj={"user":"","mail":"","currentUser":""};
	this.password="";
	this.password1="";
	this.formValidations={"form1":{"user":false,"password":false},
						  "form2":{"user":false,"mail":false,"password":false}
						 };
	this.profileFormsState="none";
	this.dh=new domHelpers();
	this.sv=new server();
	this.mamejs = new IntegrationMAMEjs();
	this.mamejs.mame = false;
	this.cr=new carousel(this.dh,this.sv,this.mamejs);
	this.su=new sessionForUser();
	this.captcha=document.getElementById("captcha");
	this.arcadeActive=false;
	this.fnOfClickables=[];
	this.gameTopscores=[]
}

sitecontrol.prototype.setEventListeners=function(){
	this.resize([380,1980],this.dh);
	this.mover(this.dh);
	this.setFnsOfClickables(this.dh);
	this.clickables(this.dh);
	this.exit(this.dh);
	this.formValidation(this.dh);
	this.capsWarning(this.dh);
	this.userOkedCookie(this.dh);
	this.checkCookie(this.dh);
	window.dispatchEvent(new Event("resize"));
}

sitecontrol.prototype.resize=function(rangeWidth,dh){
	dh.events(window,
		{"resize":function(){
					let	currWidth=document.documentElement.clientWidth;
					let percWidth=0;
					let nodes=document.getElementsByClassName("resize");
					for(let node of nodes){
						let minw=parseInt(node.getAttribute("data-minw"),10);
						let maxw=parseInt(node.getAttribute("data-maxw"),10);
						switch(node.nodeName){
							case("IMG"):
								percWidth=maxw-(maxw-minw)*(currWidth-rangeWidth[0])/(rangeWidth[1]-rangeWidth[0]);
								percWidth=Math.floor(Math.min(Math.max(percWidth,minw),maxw))+"%";
								dh.styles(node,{maxWidth:percWidth});
								break;
							case("A"):
								percWidth=Math.round(minw+(maxw-minw)*(currWidth-rangeWidth[0])/(rangeWidth[1]-rangeWidth[0]));
								percWidth=Math.floor(Math.min(Math.max(percWidth,minw),maxw))+"px";
								dh.styles(node,{fontSize:percWidth});
								break;
							case("P"): //have to repeat, case does not work with OR
								percWidth=Math.round(minw+(maxw-minw)*(currWidth-rangeWidth[0])/(rangeWidth[1]-rangeWidth[0]));
								percWidth=Math.floor(Math.min(Math.max(percWidth,minw),maxw))+"px";
								dh.styles(node,{fontSize:percWidth});
								break;
							case("FIXED"):
								percWidth=maxw-(maxw-minw)*(currWidth-rangeWidth[0])/(rangeWidth[1]-rangeWidth[0]);
								percWidth-=50*(100-percWidth)/100;
								percWidth=Math.floor(Math.min(Math.max(percWidth,minw),maxw));
								let percleft=Math.floor((100-percWidth)/2)+"%";
								let mintop=parseInt(node.getAttribute("data-mintop"),10);
								let maxtop=parseInt(node.getAttribute("data-maxtop"),10);
								let perctop=Math.floor(mintop+(maxtop-mintop)*(currWidth-rangeWidth[0])/(rangeWidth[1]-rangeWidth[0]));
								perctop=Math.floor(Math.min(Math.max(perctop,mintop),maxtop));
								let percheight=(currWidth<400)?"100%":"85%";
								percWidth+="%";								
								dh.styles(node,{width:percWidth,left:percleft,top:perctop,height:percheight});
						}
					}
				}
		});
}	  
	
sitecontrol.prototype.mover=function(dh){
	let imover=document.getElementsByClassName("imover");
	dh.events(imover,
		{"mouseover":function(e){let src=e.target.getAttribute("data-moverin");
								dh.attributes(e.target,{"src":src})},
		 "mouseout":function(e){let src=e.target.getAttribute("data-moverout");
								dh.attributes(e.target,{"src":src})}  
	});
}

sitecontrol.prototype.exit=function(dh){
	let nodes=document.getElementsByClassName("exitjs")
	for(let node of nodes){
		let parentEl=document.getElementById(node.getAttribute("data-exit"));
		dh.events(node,
			{"mousedown":function(){parentEl.dispatchEvent(new MouseEvent("mousedown"))}
		});
	}
}

sitecontrol.prototype.setFnsOfClickables=function(dh){
	//fns for forms
	this.fnOfClickables.push(function(e){
		switch(this.profileFormsState){
			case("none"):
				this.profileFormsState="signingIn";
				this.resetInputs("form1",this.profileFormsState);
				this.showForm("form1",dh);
				break;
			case("signedIn"):
				this.profileFormsState="signingOut";
				this.showForm("form3",dh);
				break;
			default:
				if(e.target.nodeName=="BUTTON")
					this.checkButtons(dh,e.target);
				else{
					this.clearForms(dh);
					switch(this.profileFormsState){
						case("signingIn"):
							this.profileFormsState="none";
							break;
						case("signingOut"):
							this.profileFormsState="signedIn";
							break;
						case("creatingAccount"):
							this.profileFormsState="none";
							break;
						case("updatingAccount"):
							this.profileFormsState="signedIn";
							break;
					}
				}
				break;
		}
	}.bind(this));	
	//fns for arcade
	this.fnOfClickables.push(function(){
		if(!this.arcadeActive){
			//dh.styles(document.getElementById("header1"),{visibility:"visible"});
			this.cr.create(document.getElementById("carouselArcade"),"img/tnails/thumbnails.txt","img/tnails/",{elm:"a",txt:"PLAY",fs:"18px",cl:"red"});
			this.mamejs.mame = false;
		}else{
			this.cr.destroy(document.getElementById("carouselArcade"));
			dh.styles(document.getElementById("header1"),{visibility:"hidden"});
			this.mamejs.mame = false;
		}
		this.arcadeActive=!this.arcadeActive;
	}.bind(this));
	//fns for MAME ARCADE
	this.fnOfClickables.push(function(){
		if(!this.arcadeActive&&this.mamejs.ROMSLOADED){
			this.mamejs.mame = true;
			this.cr.create(document.getElementById("carouselArcade"),"img/tnailsmame/thumbnailsmame.txt","img/tnailsmame/",{elm:"p",txt:"PLAY",fs:"18px",cl:"red"});
		}else{
			this.cr.destroy(document.getElementById("carouselArcade"));
			dh.styles(document.getElementById("header1"),{visibility:"hidden"});
			this.mamejs.mame = false;
		}
		this.arcadeActive=!this.arcadeActive;
	}.bind(this));
}

sitecontrol.prototype.clickables=function(dh){
	let nodes=document.getElementsByClassName("clickable");
	let fn=0;
	for(let node of nodes){
		fn=parseInt(node.getAttribute("data-func"),10);		
		dh.events(node,{"mousedown":this.fnOfClickables[fn]});
	}
}

sitecontrol.prototype.checkButtons=function(dh,node){
	let type=node.getAttribute("data-button");
	_TYPE=node.getAttribute("data-button");
	_DH=dh;
	_NODE=node;
	let form=node.getAttribute("data-form");
	let nextform=(type=="next")?node.getAttribute("data-nextform"):"";
	this.profileFormsState=(type=="next")?node.getAttribute("data-state"):this.profileFormsState;
	switch(type){
		case("next"):
			this.resetInputs(form,this.profileFormsState);
			this.clearForms(dh);
			this.showForm(nextform,dh);
			break;
		case("signin"):
			if(this.alltrue(form)){
				grecaptcha.execute();
			}
			break;
		case("signout"):
			this.profileFormsState="none";
			this.setfalse();
			this.resetInputs(form,this.profileFormSate);
			this.clearForms(dh);
			this.currentUser="";
			document.getElementById("user").innerHTML="";
			this.toggleInnerHTML(document.getElementById("form2Title"),dh);
			dh.attributes(document.getElementById("newOrUpdate"),{"data-button":"newaccount"});
			this.deleteCookie();
			break;
		case("newaccount"):
			if(this.alltrue(form)){
				grecaptcha.execute();
			}
			break;
		case("updateaccount"):
			if(this.alltrue(form)){
				let q={query:"UPDATE",userName:this.user,email:this.mail,password:this.password,currentUser:this.currentUser};
				this.sv.promiseToGet("POST",q).then(function(result){
					if(result instanceof Error)
						alert("Error, could not update account");
					else{
						this.clearForms(dh);
						alert("Account Updated");
						document.getElementById("user").innerHTML="Hello,<br>"+this.user;
						this.currentUser=this.user;
						this.profileFormsState="signedIn";
						if(document.getElementById("check2").checked)
							this.updateCookie(this.user,1);
						this.setSession();
					}
				}.bind(this));
			}
			break;
		default:
			this.resetInputs(form,this.profileFormsState);
			this.clearForms(dh);
			break;
	}
}

sitecontrol.prototype.resetInputs=function(form,state){
	let nodes=document.getElementsByTagName("input");
	for(let node of nodes){
		if(node.type=="text"||node.type=="password")
			node.value="";
	}
	if(form=="form3"&&state=="updatingAccount"){
		document.getElementById("newUser").value=this.user;
		this.formValidations.form2.user=true;
		document.getElementById("newEmail").value=this.mail;
		this.formValidations.form2.mail=true;
	}
}

sitecontrol.prototype.setfalse=function(){
	let obj=this.formValidations;
	for (let form in obj){
		for(let key in obj[form]){
			obj[form][key]=false;
		}
	}
}

sitecontrol.prototype.alltrue=function(form){
	let obj=this.formValidations[form];
	for(let key in obj){
		if(!obj[key])
			return false;
	}
	return true;
}

sitecontrol.prototype.showForm=function(form,dh){
	dh.styles(document.getElementById("wrapform"),{display:"block"});
	dh.styles(document.getElementById(form),{display:"block"});
}

sitecontrol.prototype.clearForms=function(dh){
	dh.styles(document.getElementsByClassName("forms"),{display:"none"});
	dh.styles(document.getElementById("wrapform"),{display:"none"});
}

sitecontrol.prototype.formValidation=function(dh){
	let nodes=document.getElementsByClassName("_focusout");
	dh.events(nodes,{"focusout":function(e){
		let node=e.target;
		let query=e.target.getAttribute("data-query");
		let val=e.target.value;
		switch(query){
			case("nameormail"):
				let field=(val.includes("@"))?"email":"userName";
				let q={query:"exist",table:"users",field:field,data:val,password:""};
				this.sv.promiseToGet("GET",q).then(function(result){
					if(result==""){
						dh.styles(node,{borderColor:"red"});
						this.setValidation(node,false);
					}else{
						dh.styles(e.target,{borderColor:"#A3ABAC"});
						this.user=result.split("&")[0];
						this.password=result.split("&")[1];
						this.mail=result.split("&")[2];
						this.setValidation(node,true);
					}
				}.bind(this));
				break;
			case("notempty"):
				if(node.getAttribute("data-validate")=="user"){
					let userformat=/^[a-z0-9" *"]+$/i;
					this.standardValidation(node,val!=""&&val.match(userformat),dh);	
				}else
					this.standardValidation(node,val!="",dh);
				break;
			case("mail"):
				let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
				this.standardValidation(node,val.match(mailformat),dh);
				break;
			case("password1"):
				this.password1=val;
				this.standardValidation(node,val!="",dh);
				break;
		}
		if(this.profileFormsState=="creatingAccount"){
			let fld=node.getAttribute("data-nexist");
			let val=node.value;
			if(fld){
				let q={query:"exist",table:"users",field:fld,data:val,password:""};
				this.sv.promiseToGet("GET",q).then(function(result){
					if(result!=""){
						this.standardValidation(node,false,dh);
					}
				}.bind(this));
			}
		}
	}.bind(this)});
	
	nodes=document.getElementsByClassName("_input");
	dh.events(nodes,{"input":function(e){
		let node=e.target;
		let query=e.target.getAttribute("data-query");
		let val=e.target.value;
		switch(query){
			case("password"):
				this.standardValidation(node,this.formValidations.form1.user&&this.password===val,dh);
				break;
			case("password2"):
				this.standardValidation(node,this.password1===val&&val!="",dh);
				break;
		}		
	}.bind(this)});
	
}
				   
sitecontrol.prototype.setValidation=function(node,bol){
	this.formValidations[node.getAttribute("data-form")][node.getAttribute("data-validate")]=bol
}

sitecontrol.prototype.standardValidation=function(node,cond,dh){
	if(cond){
		dh.styles(node,{borderColor:"#A3ABAC"});
		this.setValidation(node,true);
		if(node.name&&node.name!="")
			this[node.name]=node.value;
	}else{
		dh.styles(node,{borderColor:"red"});
		this.setValidation(node,false);
	}
}

sitecontrol.prototype.capsWarning=function(dh){
	let nodes=document.getElementsByTagName("input");
	for (let node of nodes){
		if(node.type=="password"){
			dh.events(node,{"keyup":function(e){
				if(e.getModifierState("CapsLock"))
					dh.styles(document.getElementById("caps"),{display:"block"});
				else
					dh.styles(document.getElementById("caps"),{display:"none"})
			}});
		}
	}
}

sitecontrol.prototype.toggleInnerHTML=function(node,dh){
	let temp=node.innerHTML;
	let alt=node.getAttribute("data-alt");
	dh.attributes(node,{"data-alt":temp});
	node.innerHTML=alt;
}


sitecontrol.prototype.updateCookie=function(userName,years){
	var expiration_date = new Date();
	expiration_date.setFullYear(expiration_date.getFullYear() + years);
	var cookie_string = "userName="+userName+"; expires="+expiration_date.toUTCString()+"; path=/";
	document.cookie = cookie_string;
}	

sitecontrol.prototype.setSession=function(){
	this.su.setORget("set",this.user).then(function(result){
		//console.log("updating cookie",result);
	});
}

sitecontrol.prototype.checkCookie=function(dh){
	let stringCookie=document.cookie;
	let p=stringCookie.indexOf("userName");
	let un="";
	if(p>-1){
		if(p==0){
			if(stringCookie.indexOf(";")==-1)
				un=stringCookie.substr(stringCookie.indexOf("=")+1,stringCookie.length-stringCookie.indexOf("=")-1);
			else
				un=stringCookie.substr(stringCookie.indexOf("=")+1,stringCookie.indexOf(";")-stringCookie.indexOf("=")-1);
		}else
			un=stringCookie.split("userName=")[1];
		dh.styles(document.getElementById("cookiewrapper"),{display:"none"});
		let q={query:"exist",table:"users",field:"userName",data:un,password:""};
		this.sv.promiseToGet("GET",q).then(function(result){
			if(result==""){
				this.user=""; this.mail=""; this.currentUser="";
			}else{	
				this.user=result.split("&")[0];
				this.mail=result.split("&")[2];
				this.currentUser=result.split("&")[0];	
				this.profileFormsState="signedIn";
				dh.attributes(document.getElementById("newOrUpdate"),{"data-button":"updateaccount"});
				this.toggleInnerHTML(document.getElementById("form2Title"),dh);
				document.getElementById("user").innerHTML="Hello,<br>"+this.user;
				this.setSession();
			}
		}.bind(this));
	}else{
		this.user=""; this.mail=""; this.currentUser="";
		dh.styles(document.getElementById("cookiewrapper"),{display:"flex"});
		this.updateCookie(this.user,1);
	}
}

sitecontrol.prototype.deleteCookie=function(){
	this.updateCookie("",-1);
}

sitecontrol.prototype.userOkedCookie=function(dh){
	document.getElementById("cookieOk").addEventListener("mousedown",function(e){
		document.getElementById("cookiewrapper").style.display="none";
	});
}

let sc=new sitecontrol();
sc.setEventListeners();


function captchaButtons(){
	let q={};
	switch(_TYPE){
		case("signin"):		
			sc.profileFormsState="signedIn";
			sc.clearForms(_DH);
			document.getElementById("user").innerHTML="Hello,<br>"+sc.user;
			sc.currentUser=sc.user;
			_DH.attributes(document.getElementById("newOrUpdate"),{"data-button":"updateaccount"});
			sc.toggleInnerHTML(document.getElementById("form2Title"),_DH);
			if(document.getElementById("check1").checked)
				sc.updateCookie(sc.user,1);
			sc.setSession();
			break;
		case("newaccount"):
			 q={query:"INSERT",userName:sc.user,email:sc.mail,password:sc.password}
			sc.sv.promiseToGet("POST",q).then(function(result){
				if(result instanceof Error){
					alert("Error, could not create account");
				}else{
					sc.clearForms(_DH);
					sc.profileFormsState="signedIn";
					document.getElementById("user").innerHTML="Hello,<br>"+sc.user;
					sc.currentUser=sc.user;
					alert("New Account Created");
					_DH.attributes(_NODE,{"data-button":"updateaccount"})
					if(document.getElementById("check2").checked)
						sc.updateCookie(sc.user,1);
					sc.setSession();
				}
			});
			break;

	}
}
