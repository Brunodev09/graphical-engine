import _ from "./tools/Terminal";
import User from "./def/User";
import Central from "./def/Central";
import InputHandler from "./lib/InputHandler";

// @TODO - Don't forget to make script to automatically create NON .ts files on tsc compile.

export default class Main {

    central: Central;
    IOhandler : InputHandler;
    constructor() {
        this.IOhandler = new InputHandler();
    }

    async run() {
        if (await this.IOhandler.init()) {
            if (await this.IOhandler.setupQuestions()) {
                if (await this.IOhandler.HTMLSetup()) {
                    if (await this.IOhandler.commandLoop()) {
                        
                    }
                }
            }
        }
    }
}