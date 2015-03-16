 //google anlytics
 (function(i, s, o, g, r, a, m) {
 	i['GoogleAnalyticsObject'] = r;
 	i[r] = i[r] || function() {
 		(i[r].q = i[r].q || []).push(arguments)
 	}, i[r].l = 1 * new Date();
 	a = s.createElement(o),
 		m = s.getElementsByTagName(o)[0];
 	a.async = 1;
 	a.src = g;
 	m.parentNode.insertBefore(a, m)
 })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

 ga('create', 'UA-56666524-1', 'auto');
 ga('send', 'pageview');

//redirect domain to www
 var url = new String(window.location.href).toLowerCase();

 if (url.indexOf("http://alidealzone.com") != -1 ) 
 location.href = "http://www.alidealzone.com";

//social share
ShareIt.configure({
    useFB: true,          // boolean (default: true)
                          // Whether to show the Facebook button
    useTwitter: true,     // boolean (default: true)
                          // Whether to show the Twitter button
    useGoogle: true,      // boolean (default: true)
                          // Whether to show the Google+ button
    classes: "Extra small button", // string (default: 'large btn')
                          // The classes that will be placed on the sharing buttons, bootstrap by default.
    iconOnly: false,      // boolean (default: false)
                          // Don't put text on the sharing buttons
    applyColors: true     // boolean (default: true)
                          // apply classes to inherit each social networks background color
  });