/**
 * Views to be exported from the design doc.
 */

exports.by_type = {
	map: function (doc) {
		emit(doc.type, doc);
	}
};