const connection = require('../connect');
const {Schema} = require('mongoose');
//const { config } = require('../../../testengine_view/src/utils/config');
const UserTestMappingSchema = new Schema({
    userid: {type: Schema.Types.ObjectId, ref:'users'},
    test_ids:[{type: Schema.Types.ObjectId, ref:'tests'}]


},{timestamps:true});
const UserTestMappingModel = connection.model('usertest',UserTestMappingSchema);
module.exports = UserTestMappingModel;
 