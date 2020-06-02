Parse.Cloud.beforeSave('Application', (request, response) => {
    const appACL = new Parse.ACL();
    appACL.setPublicReadAccess(true);
    appACL.setPublicWriteAccess(false);
    request.object.setACL(appACL);
});