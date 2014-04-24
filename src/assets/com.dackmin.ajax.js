function Ajax(){
	this._client = Titanium.Network.createHTTPClient();
}

Ajax.prototype.send = function(options){
	var _type = options.type || "POST";
	var _url = options.url || "";
	var _data = options.data || "";
	var _returnType = options.returnType || "text";
	var _debug = options.debug || false;
	var _timeout = options.timeout || 20000;
	var _success = options.success || function(){};
	var _error = options.error || function(){};
		
	this._client.timeout = _timeout;
	
	this._client.onload = function(){
		if(_debug) Ti.API.debug(this.responseText);
		if(_returnType == "text") _success(this.responseText);
		if(_returnType == "json") _success(JSON.parse(this.responseText));
	};
	
	this._client.onerror = _error;
	
	this._client.open(_type,_url+((_data && _data != "") ? "?"+_data : ""));
	this._client.send();
};

exports.Ajax = Ajax;