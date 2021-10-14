//Functions to perform Data Base CRUD operations
async function getUserbyquery(client, id, response, color, age) {
    const users = await client.db("users")
        .collection("people").find({}).toArray();

    if (id) {
        return response.send(users.filter((user) => user.id == id));
    }

    else if (color && age) {
        return response.send(users.filter((user) => user.color == color && user.age > +age));
    }

    else if (color) {
        return response.send(users.filter((user) => user.color == color));
    }

    else if (age) {
        return response.send(users.filter((user) => user.age > +age));
    }

    else {
        return response.send(users);
    }
}

async function createUser(client, addUsers) {
    return await client.db("users").collection("people").insertOne(addUsers);
}

async function deleteUser(client, id) {
    return await client.db("users").collection("people").deleteOne({ id: id });
}

async function updateUserbyid(client, id, newData) {
    return await client.db("users").collection("people").updateOne({ id: id }, { $set: newData });
}
async function createManager(client, username, hashPassword) {
    return await client.db("users").collection("managers").insertOne({ username: username, password: hashPassword });
}

async function getManagers(client) {
    return await client.db("users").collection("managers").find({}).toArray();
}

async function verifyManager(client, username) {
    return await client.db("users").collection("managers").findOne({ username: username });
}


export {
    getUserbyquery,
    createUser,
    deleteUser,
    updateUserbyid,
    createManager,
    getManagers,
    verifyManager
}