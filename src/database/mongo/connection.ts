import mongoose from 'mongoose';
import sanitzedConfig from "../../config/config";

const mongoConnection = async () => await mongoose.connect(sanitzedConfig.MONGODB_SERVER);

// const kittySchema = new mongoose.Schema({
//     name: 'string',
//     size: 'string'
// });
// const kitty = mongoose.model('kittySchema', kittySchema);
// const register = new kitty({name:'Bryan', size: 'Esto es un ejemplo'});
// await register.save();

export default mongoConnection;
