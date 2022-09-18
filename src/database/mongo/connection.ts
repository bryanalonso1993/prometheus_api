import mongoose from 'mongoose';
import sanitzedConfig from "../../config/config";

const mongoConnection = async () => await mongoose.connect(sanitzedConfig.MONGODB_SERVER);

export default mongoConnection;
