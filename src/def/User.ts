import InputFormat from "./InputFormat";

export default class User {
    username: string;
    configurations: InputFormat[];
    constructor(username, configurations) {
        this.username = username;
        this.configurations = configurations;
    }
}