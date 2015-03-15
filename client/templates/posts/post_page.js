Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  }
});

Template.postPage.rendered = function() {
    try {
        FB.XFBML.parse();
    }catch(e) {}   
};