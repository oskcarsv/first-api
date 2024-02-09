const mongoose = require('mongoose');

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_CNN, {});
        console.log('Database connected successfully');
    }catch(e){
        throw new Error('Database error ', e);
    }
};

module.exports = {
    dbConnection
}