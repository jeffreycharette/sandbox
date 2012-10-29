/**
 * Kanso document types to export
 */

var Type = require('couchtypes/types').Type,
	fields = require('couchtypes/fields'),
	Form = require('couchtypes/forms').Form,
	widgets = require('couchtypes/widgets'),
	_ = require('underscore')._,
	_s = require('underscore-string');

	exports.docs = function (doc) {
		var data = new Object;
				
				if (typeof doc.type === 'undefined') {
					doc.type = 'global';
				}
		
		_.each(doc, function(val, key){
			//if (!_(key).startsWith("_rev")) {
				data[key] = fields.string({default_value: val});
				if (_(key).startsWith("_")) {
					data[key].required = false;
				}
			//}
		});
		
		return new Type(data.type.default_value, {fields: data});
	};