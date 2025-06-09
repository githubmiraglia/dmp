// JavaScript Document

var _GAMEWIDTH=448;
var _GAMEHEIGHT=576;
var _WIDTH = _GAMEWIDTH;
var _HEIGHT = _GAMEHEIGHT;
var _R = 70;  // radius for virtual joystick
var _TICK = 35;
var _LOADEDELEMENTS = [];
var _ROOT = "/DMP/Lander";
var _EXIT = false;
var _PLATFORM = {};
var _RETURNTEXT = {};
var _P = {};
var _TOPSCORES=[];
var _USER={name:"",score:0};
var _OFFLINE={};
var _REPLAY=false;
var _LEFTPADDNGS=[0,0];
var _K=[480,360,480,360]; //adjustments for compatibility with Scratch coding positioning [0] scratch width, [1] scratch height, scratch [0,0]=center
var _TEST=0;
var _MOBTXT = document.getElementById("mobtext");
var _WAIT=true;
var _CHOSE=false;
var _FREEZEIMAGELOADED=false;
var _COUNT=0;
var _CHOSEJS=false;
var _SOUNDS=true;
let _F=function(){
			_FREEZEIMAGELOADED=true;
		};

_MOBTXT.style.margin="0px";
_MOBTXT.style.padding="0px";

document.body.addEventListener("mousedown",function(e){
	e.preventDefault();
});

runCreateScripts();

function runCreateScripts(){
    s1 = new createScripts("s1",_ROOT+"/globalvariables/helperfunctions.js");
	s2 = new createScripts("s2",_ROOT+"/actors/actor.js");
	var interval = setInterval(function(){
		var check=["s1","s2"];
		if (checkLoaded(check)){
			clearInterval(interval);
			_PLATFORM = setPlatform();
			_LEFTPADDNGS=setWindow(_PLATFORM,1,1);
			s3 = new createScripts("s3",_ROOT+"/players/players.js");
			s4 = new createScripts("s4",_ROOT+"/joystick/joystick.js");
			s5 = new createScripts("s5",_ROOT+"/audiomachine/audiomachine.js");
			s6 = new createScripts("s6",_ROOT+"/canvas/canvas.js");
			s7 = new createScripts("s7",_ROOT+"/game/game.js");
			s8 = new createScripts("s8",_ROOT+"/actors/landerHigh.js");
			s9 = new createScripts("s9",_ROOT+"/actors/landerLow.js");
			s15 = new createScripts("s15",_ROOT+"/chaselight/chaselight.js");
			s16 = new createScripts("s16",_ROOT+"/canvas/dom.js");
			s17 = new createScripts("s17",_ROOT+"/server/server.js");
			s18 = new createScripts("s18",_ROOT+"/session/session.js")
			console.log("LOADING SCRIPTS");
			var interval_3 = setInterval(function(){
				var check=["s3","s4","s5","s6","s7","s8","s9","s15","s16","s17","s18"];
				if(checkLoaded(check)){
					clearInterval(interval_3);
					console.log("LOADED SCRIPTS");
					runPlayers();
				}	
			},37);
		}
	},37);
}

function runPlayers(){
	_P=new players(_PLATFORM,_LEFTPADDNGS);
	//_P.checkReady();
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
