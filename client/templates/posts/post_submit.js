Template.postSubmit.created = function() {
	Session.set('postSubmitErrors', {});
}

Template.postSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('postSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
	}
});

Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var storeurl = $(e.target).find('[name=url]').val();

		if (storeurl.indexOf("www.") === 0) {
			storeurl = "http://" + storeurl
		};
		var a = document.createElement('a');
		a.href = storeurl;
		var domainname = a.hostname.toUpperCase().replace("WWW.", "").replace(".COM", "");

		var vdurl = $(e.target).find('[name=videourl]').val();


		if (vdurl.indexOf("www.") === 0) {
			vdurl = "http://" + vdurl
		};


		var post = {
			url: storeurl,
			title: $(e.target).find('[name=title]').val(),
			detail: $(e.target).find('[name=detail]').val(),
			videourl: vdurl,
			domain: domainname
		};

		var errors = validatePost(post);
		if (errors.title || errors.url||errors.videourl||errors.detail)
			return Session.set('postSubmitErrors', errors);

		Meteor.call('postInsert', post, function(error, result) {
			if (error)
				return throwError(error.reason);

			// show this result but route anyway
			if (result.postExists)
				throwError('This link has already been posted');

			Router.go('postPage', {
				_id: result._id
			});
		});
	}
});