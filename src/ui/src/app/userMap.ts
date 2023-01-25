import { User } from "./user";

export let userMap: Map<string, User> = new Map<string, User>();
/*
userMap.set("ab1 AB2", {username: "ab1", password: "Ab4!", email: "abc@gmail.com"});
userMap.set("lister gist", {username: "lister", password:"gist", email: "abd@gmail.com"});
userMap.set('blue boss', {username: 'blue', password: 'boss', email: 'bboss@yahoo.net'})


const userList: User[] = [

    {username: "ab1", password: "Ab4!", email: "ab@gmail.com"},
    {username: "ac1", password: "Ac4", email: "ab2@gmail.com"},
    {username: "ad1", password: "Ad4", email: "abe@gmail.com"},
    {username: "ae1", password: "Aero4", email: "a!@gmail.com"},
    {username: "cf1", password: "Sili5", email: "a@@gmail.com"},
    {username: "dg1", password: "Constan6", email: "a$e@gmail.com"},
]

for (var u_ of userList) {
    let username_string = u_.username;
    let password_string = u_.password;
    userMap.set(username_string + " " + password_string, u_);
}
*/