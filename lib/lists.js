/**
 * List functions to be exported from the design doc.
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
	
	exports.edit_all = function (head, req) {
		var newData = "";
		
		start({code: 200, headers: {'Content-Type': 'text/html'}});
		
		/* fetch all the rows */
		var data, editForm = new Object,
				row = [],
				contents = "",
				model = ""
				lastType = "",
				type = "";
		
		while (row = getRow()) {
			/* transform document into form definition */
			data = new docs(row.value);
			
			/* create form and render to template */
			editForm = new Form (data);
			
			type = data.fields.type.default_value.toLowerCase();
			
			/* create models for backbone on client */
			if (type != 'global') {
				if (lastType != type) {
					//model += 'var ' + _.classify(type) + ' = \nBackbone.Model.extend({ \ndefaults: ' + JSON.stringify(data.fields) + ', \ninitialize: function() { \nconsole.log("Modeling is sexy!");\n}\n});\n\r';
					lastType = type;
				}
				//model += 'var ' + type + '' + i + ' = new ' + _.classify(type) + '(' + JSON.stringify(data.fields) + ');';
			}
			
			contents += templates.render('form.html', req, {
				form_title : type,
				method : 'POST',
				action : '../../_update/update',
				form : editForm.toHTML(req),
				button: 'Validate'});
		}

		return {
		  title : 'All the forms',
			model : model,
			collection : 'collection',
		  content: contents
		}
	};
