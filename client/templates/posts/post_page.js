Template.postPage.helpers({
	comments: function() {
		return Comments.find({
			postId: this._id
		});
	},

	checkVideourl: function() {
		return this.videourl.trim() !== "";
	},

	getVideourl: function() {
		return this.videourl.replace("watch?v=", "v/");
	},

	domain: function() {
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname.replace("www.","").replace(".com","").toUpperCase();
	},
});