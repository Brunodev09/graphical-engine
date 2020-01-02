
import Terminal from "./Terminal";
import { Log } from "./Log";
import Files from "./Files";

class TerminalExtender extends Terminal {

    logs : Log[];
    constructor() {
        super();
        this.logs = [];
    }

    async readLogsFromFile(path : string) {

        const data = await Files.read(path);
        let convertedData = data.split(',');
        for (let log of convertedData) {
            
            let type = 'info';
            const s = log.includes(`RESERVED_WARNING`);
            const s2 = log.includes("RESERVED_ERROR");
            if (s) {
                type = 'warning';
                log = log.replace(/RESERVED_WARNING/, "");
            }
            else if (s2) {
                type = 'error';
                log = log.replace(/RESERVED_ERROR/, "");
            }

            this.pushLog(new Log(log, type));
        }
    }

    pushLog(log : Log) {
        this.logs.push(log);
    }

    pushLogs(arr : Log[]) {
        for (let log of arr) {
            this.logs.push(log);
        }
    }

    printLog(index : number, values : string[]) {
        let counter = 1;
        for (let value of values) {
            let str = `RESERVED_VALUE_${counter}`;
            this.logs[index].text = this.logs[index].text.replace(str, value);
            counter++;
        }
        this.say("\n" + this.logs[index].text, this.logs[index].type);
    }
}

export default new TerminalExtender();