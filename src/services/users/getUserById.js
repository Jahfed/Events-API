import userData from "../../data/users.json" assert {type: "json"};

const usersById = (id, name) => {
    let users = userData.users;
    if (!users) {
        console.log("error, no data available");
    }

    if (id) {
        users = users.find((user) => user.id === id);
    }

    if (name) {
        users = users.find((user) => user.name === name);
        users = { "name": users.name, "username": users.username, "image": users.image };
    }

    return users;
}

export default usersById;