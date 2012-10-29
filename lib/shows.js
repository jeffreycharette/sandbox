/**
 * Show functions to be exported from the design doc.
 */

var templates = require('duality/templates'),
	fields = require('couchtypes/fields'),
	Form = require('couchtypes/forms').Form,
	widgets = require('couchtypes/widgets'),
	_ = require('underscore')._,
	_s = require('underscore-string'),
	docs = require('./types').docs;
	
	// Mix in non-conflict functions to Underscore namespace if you want
	_.mixin(_s.exports());

exports.welcome = function (doc, req) {
    return {
        title: 'It worked!',
        content: templates.render('welcome.html', req, {})
    };
};

exports.not_found = function (doc, req) {
    return {
        title: '404 - Not Found',
        content: templates.render('404.html', req, {})
    };
};

/*events.once('afterResponse', function(err) {
    db.getView('view_name', {}, function(err, data) {
        if (err) { return alert(err); }
        for (var i in data.rows) {
            var row = data.rows[i];
            // do stuff with view data
        }
    });
});*/


exports.my_form = function (doc, req) {
	
	/* transform document into form definition */
	var data = new docs(doc);
	
	/* create form and render to template */
	var editForm = new Form (data);
	
	return {
	  title : 'My First Form',
		data : JSON.stringify(req),
	  content: templates.render('form.html', req, {
			form_title : 'My Form',
			method : 'POST',
			action : '_update/update_my_form',
			form : editForm.toHTML(req),
			button: 'Validate'})
	}
};

exports.my_form_content = function(doc, req) {
	return {
		title: 'Content of my Form',
		content: templates.render('base.html', req, {content : '<b>First Name</b> : ' +  doc.first_name + '<br/><b>Last Name</b> : ' + doc.last_name}) 
	};
};
