
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const uri = process.env.MONGO_DB_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const database = client.db('social-media')
const userCollection = database.collection('users')
const allUserPost = database.collection('posts')

//save user in database
const saveUserInDatabase = async (req, res) => {
    try {
        const user = req.body;
        const email = req.params.email;
        const filter = { email: email };
        const options = { upsert: true }

        const userInfo = {
            email: user.email,
            displayName: user.displayName,
            address: user.address,
            university: user.university
        }
        console.log(userInfo);

        const updateDoc = { $set: userInfo }

        const result = await userCollection.updateOne(filter, updateDoc, options)

        return res.send(result)

    } catch (error) {
        res.send({ message: "user not found", })
    }
}

// update user about
// information
const updateUserAboutInfo = async (req, res) => {
    try {
        const userinfo = req.body
        const email = req.params.email
        const filter = { email: email }
        const options = { upsert: true };
        const updatedDoc = {
            $set: userinfo
        }

        const result = await userCollection.updateOne(filter, updatedDoc, options)

        return res.send(result)

    } catch (error) {
        return res.send({
            message: 'user information does not exit',
            status: 404
        })
    }
}

// saver user post like image & text
const userPost = async (req, res) => {
    try {
        const data = req.body;

        const query = database.collection('posts')
        const result = await query.insertOne(data)

        if (!result) {
            return res.send({
                message: 'Data not found',
                status: 404
            })
        }
        return res.send(result)


    } catch (error) {
        return res.send({
            message: error.message,
            status: 404
        })
    }
}

//get all post 
const getAllUsers = async (req, res) => {
    try {
        const query = {}
        const result = await userCollection.find(query).toArray()

        return res.send(result)

    } catch (error) {
        return res.send({
            message: 'User does not exit'
        })
    }
}
//get all post 
const getAllPost = async (req, res) => {
    try {
        const query = {}
        const result = await allUserPost.find(query).toArray()

        return res.send(result)

    } catch (error) {
        return res.send({
            message: 'Post does not exit'
        })
    }
}


//get signle post 
const getSinglePost = async (req, res) => {
    try {
        const id = req.params.id
        const query = { _id: ObjectId(id) }
        const result = await allUserPost.findOne(query)

        return res.send(result)

    } catch (error) {
        return res.send({
            message: 'Post does not exit'
        })
    }
}

// get single user with email
//filter by email to get user
const filterUserToGet = async (req, res) => {
    try {
        const email = req.params.email
        const query = { email: email }

        const result = await userCollection.findOne(query)
        console.log(result);
        return res.send(result)

    } catch (error) {
        return res.send({
            message: "User does not exit"
        })
    }
}

module.exports = {
    saveUserInDatabase,
    userPost,
    getAllPost,
    getSinglePost,
    filterUserToGet,
    updateUserAboutInfo,
    getAllUsers
}