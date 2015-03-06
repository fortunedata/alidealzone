// 测试数据 
if (Posts.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var tomId = Meteor.users.insert({
    profile: {
      name: 'Tony'
    }
  });
  var tom = Meteor.users.findOne(tomId);
  var sachaId = Meteor.users.insert({
    profile: {
      name: 'Jack'
    }
  });
  var sacha = Meteor.users.findOne(sachaId);

  var telescopeId = Posts.insert({
    title: 'Blue G1W w/Novatek NT96650 Processor 1080p Dash Cam - $49.18 CAD',
    userId: sacha._id,
    author: sacha.profile.name,
    url: 'http://www.aliexpress.com/item/New-1080P-HDMI-FHD-vehicle-traveling-data-recorder-wide-Angle-of-140-degrees-Four-times-digital/1815466838.html',
    submitted: new Date(now - 7 * 3600 * 1000),
    commentsCount: 2
  });

  Comments.insert({
    postId: telescopeId,
    userId: tom._id,
    author: tom.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Excellent deal?'
  });

  Comments.insert({
    postId: telescopeId,
    userId: sacha._id,
    author: sacha.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: 'Great service!'
  });

  Posts.insert({
    title: 'Hotter than a ring of fire -> Electric Unicycle $209.99USD+min $125s/h',
    userId: tom._id,
    author: tom.profile.name,
    url: 'http://www.geekbuying.com/item/TG-F3...0221_sku339456',
    submitted: new Date(now - 10 * 3600 * 1000),
    commentsCount: 0
  });

  Posts.insert({
    title: '40$ Hidden camera 1080P 720P',
    userId: tom._id,
    author: tom.profile.name,
    url: 'http://www.aliexpress.com/store/product/New-PC-Best-price-mini-camcorder-hidden-camera-Full-HD-1080p-MINI-DV-CAMERA-1080p-big/1302154_1932807084.html',
    submitted: new Date(now - 12 * 3600 * 1000),
    commentsCount: 0
  });
}