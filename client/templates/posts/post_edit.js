Template.postEdit.created = function() {
  Session.set('postEditErrors', {});
}

Template.postEdit.helpers({
  errorMessage: function(field) {
    return Session.get('postEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
  }
});

Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var storeurl = $(e.target).find('[name=url]').val();

    if (storeurl.toUpperCase().indexOf("WWW.") === 0) {
      storeurl = "http://" + storeurl
    };

    var a = document.createElement('a');
    a.href = storeurl;
    var domainname = a.hostname.toUpperCase().replace("WWW.", "").replace(".COM", "");

    var vdurl = $(e.target).find('[name=videourl]').val();


    if (vdurl.toUpperCase().indexOf("WWW.") === 0) {
      vdurl = "http://" + vdurl
    };

    var postProperties = {
      url: storeurl,
      title: $(e.target).find('[name=title]').val(),
      detail: $(e.target).find('[name=detail]').val(),
      videourl: vdurl,
      domain: domainname
    };
 
    var errors = validatePost(postProperties);

 
    if (errors.title || errors.url||errors.videourl||errors.detail)
      return Session.set('postEditErrors', errors);
 
    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        throwError(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});