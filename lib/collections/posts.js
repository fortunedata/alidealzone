Posts = new Mongo.Collection('posts');

function isUrl(s) {
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	return regexp.test(s);
}

function isYouTube(s)
{
	 
	return  (s.toUpperCase().indexOf("WWW.YOUTUBE.COM/") > 0 );
}

validatePost = function(post) {
	var errors = {};

	if (!post.title)
		errors.title = "Please Enter Title";

	if ((!post.url) || (!isUrl(post.url)))
		errors.url = "Please Enter a Validate URL";

	//if ( )
		if ((!isUrl(post.videourl)) || (!isYouTube(post.videourl)) )
		errors.videourl = "Please Enter a Validate Yourube URL";

	if (!post.detail)
		errors.detail = "Please Enter Reason for Recommendation";

	return errors;
}

Posts.allow({
	update: function(userId, post) {
		return ownsDocument(userId, post);
	},
	remove: function(userId, post) {
		return ownsDocument(userId, post);
	},
});

Posts.deny({
	update: function(userId, post, fieldNames, modifier) {
		var errors = validatePost(modifier.$set);
		return errors.title || errors.url;
	}
});

Meteor.methods({
	postInsert: function(postAttributes) {
		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String,
			detail: String,
			videourl: String,
			domain: String
		});

		var errors = validatePost(postAttributes);
		if (errors.title || errors.url || errors.detail || errors.videourl)
			throw new Meteor.Error('invalid-post', "You Must Enter Validate Information");

		var postWithSameLink = Posts.findOne({
			url: postAttributes.url
		});
		if (postWithSameLink) {
			return {
				postExists: true,
				_id: postWithSameLink._id
			}
		}

		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date(),
			commentsCount: 0
		});

		var postId = Posts.insert(post);

		return {
			_id: postId
		};
	}
});