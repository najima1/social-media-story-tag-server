require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
const { saveUserInDatabase, userPost, getAllPost, getSinglePost, filterUserToGet, updateUserAboutInfo, getAllUsers } = require('./controlar')
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

//all handler will implement here
const run = async () => {
    try {

        //save user with signup
        app.put('/user/:email', saveUserInDatabase)

        //save user post
        app.post('/user/post', userPost)

        //get all post in user
        app.get('/user/post', getAllPost)
        app.get('/users', getAllUsers)

        // get sing user post
        app.get('/user/post/:id', getSinglePost)

        // filter user to get
        app.get("/filterUser/:email", filterUserToGet)

        // update User About Info
        // filter by email
        app.put('/updateUser/:email', updateUserAboutInfo)

    } catch (error) {
        console.log(error.message);
    }
}
run()

app.get('/', (req, res) => {
    return res.send({ message: `server is running successfully` })

})


app.listen(port, function () {
    console.log('web server is listening on port', port)
})

