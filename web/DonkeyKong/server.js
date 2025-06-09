// JavaScript Document

function server(){
	this.xml=new XMLHttpRequest();
}

server.prototype.promiseToGet=function(method,query){
	var myserver=this;
	return new Promise(function(resolve,reject){
		myserver.get(method,query,function(error,result){
			if(error)
				reject(error);
			else{
				resolve(result);
			}
		});
	});
}
		
server.prototype.get=function(method,query,f){
	this.xml.onreadystatechange=function(){
		if(this.xml.readyState==4&&this.xml.status==200){
			if(this.xml.response.includes("error"))
				return(f(new Error(this.xml.response)),null);
			else
				return(f(null,this.xml.response));
		}else if(this.xml.status>400)
			return(f(new Error("could not connect with server")),null);	
	}.bind(this);
	var q="server.php?method="+method;
	for(var key in query)
		if(query.hasOwnProperty(key))
			q=q+"&"+key+"="+query[key];
	this.xml.open("GET",q,true);
	this.xml.send();		
}

server.prototype.readJSON=function(table,field,data){
	let q={query:"JSON",table:table,field:field,data};
	return(this.promiseToGet("GET",q));
};



