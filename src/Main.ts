import _ from "./tools/Terminal";
import {Question} from "./tools/Header";
import InputFormat from "./def/InputFormat";

export default class Main {

    generalInformation : InputFormat[];
    constructor() {
        this.generalInformation = [];
    }

    async run() {
        await _.ask([new Question("input", "q1", "Please insert the title of your project", (value) => {
            if (value && value.length) {
                this.generalInformation.push(new InputFormat("title", value));
                return true;
            }
            else return false;
        }),
        new Question("input", "q2", "Please insert the width of your window (800-1024)", (value) => {
            if (value && value.length && !isNaN(value) && Number(value) >= 800 && Number(value) <= 1024) {
                this.generalInformation.push(new InputFormat("width", value));
                return true;
            }
            else {
                _.say("\nPlease follow the input instructions and enter a valid information to proceed.", "red");
                return false
            };
        }),
        new Question("input", "q3", "Please insert the height of your window (600-768)", (value) => {
            if (value && value.length && !isNaN(value) && Number(value) >= 600 && Number(value) <= 768) {
                this.generalInformation.push(new InputFormat("height", value));
                return true;
            }
            else {
                _.say("\nPlease follow the input instructions and enter a valid information to proceed.", "red");
                return false;
            }
        })]);
        console.log(this.generalInformation)
    }
}