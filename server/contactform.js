// Email to send to
contactFormConfig.settings.emailTo = 'tony@alidealzone.com';
// Name (optional)
contactFormConfig.settings.fullName = 'Tony Zhang';
/* Custom Subject
*  params contains the following:
*  name - Name of the person wanting to send a message
*  email - Email of the person
*  message - Message they want to send
*/
contactFormConfig.settings.customSubject = function(params) {
  return 'Message from ' + params.name + 'via contact form';
}