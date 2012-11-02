var Type = require('couchtypes/types').Type,
	fields = require('couchtypes/fields'),
	widgets = require('couchtypes/widgets');
	
exports.subTask = new Type('subtask',{
	fields: {
			title: fields.string(),
			assignedto: fields.creator({
				hidden:true
			}),
			estimate: fields.number(),
			due: fields.number()
	}
})
	
exports.task = new Type('task',{
	fields: {
		title: fields.string(),
		assignedto: fields.creator({
			widget:widgets.hidden()
		}),
		estimate: fields.number(),
		due: fields.number(),
		info: fields.string({
			widget:widgets.textarea({cols:40, rows:10})
		}),
		subtasks: fields.embedList({
			type: exports.subTask,
			required:false
		})
	}
})
