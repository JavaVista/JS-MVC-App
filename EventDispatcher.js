const Event = function(sender) {
	this._sender = sender;
	this.listeners = [];
};

Event.prototype = {
	attach: function(listener) {
		this._listeners.push(listener);
	},

	notify: function(args) {
		for (let i = 0; i < this._listeners.length; i += 1) {
			this._listeners[i](this._sender, args);
		}
	},
};
