var Type = require('couchtype/types').Type,
	fields = require('couchtype/fields'),
	widgets = require('couchtypes/widgets');

exports.views = {
	makes: {
		map:function(doc) {
			emit(doc.make,null);
		}
	}
};

exports.blogpost = new Type('blogpost', {
	fields: {
		created: fields.createdTime(),
		title: fields.string(),
		text: fields.string({
			widget: widgets.textarea({cols: 40,rows: 10})
		})
	}
});

