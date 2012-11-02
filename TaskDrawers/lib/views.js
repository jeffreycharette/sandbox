exports.viewtasks = {
	map : function(doc){
			emit(doc._id,doc);
	}
}