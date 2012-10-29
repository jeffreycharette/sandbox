/**
 * Update functions to be exported from the design doc.
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
	
exports.update_no_validate = function(doc, req) {
    if (!doc) {
			log('UPDATING');
			log(JSON.stringify(req));
      if (req.form._id) {
				delete req.form._deleted;
        return [req.form, 'New World']
      }
      return [null, 'Empty World'];
    }
    doc.world = 'hello';
    doc.edited_by = req.userCtx;
    return [doc, 'hello doc'];
  };

exports.in_place = function(doc, req) {
    var field = req.form.field;
    var value = req.form.value;
    var message = 'set '+field+' to '+value;
    doc[field] = value;
    return [doc, message];
  };

exports.update = function (doc, req) {

	/* transform document into form definition */
	var data = new docs(req.form);

	/* create form and render to template */
	var form = new Form(data);

	form.validate(req);

	if (form.isValid()) {
		delete form.values._deleted;
		var contents = new Object;
		_.each(form.values, function(value, key) {
			contents += key + " : " + value + "<br />";
		});
		return [form.values, {content: contents , title: 'Result'}];
	}
	else {
		var content = templates.render('form.html', req, {
			form_title: 'My Form',
			method : 'POST',
			action : '../../_update/update',
			form : editForm.toHTML(req),
			button: 'Validate'
		});
		return [null, {content: content, title: 'My First Form'}];
	}
};
