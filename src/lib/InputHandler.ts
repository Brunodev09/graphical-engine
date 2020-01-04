import __Console from "../tools/Terminal";
import { Question } from "../tools/Header";
import InputFormat from "../def/InputFormat";
import Files from "../tools/Files";
import _ext from "../tools/TerminalExtender";
import { Options } from "../def/Options";

const _ = new __Console();


export default class InputHandler {

    __info: Map<string, InputFormat>;
    __profiles: string;
    __targetDir: string;
    __canvas: string;
    __engine: string;
    __foundSaveFile: boolean;

    constructor() {
        this.__info = new Map();
        this.__profiles = __dirname + "/plugins/profile.cfg";
        this.__canvas = __dirname + "/plugins/canvas.cfg";
        this.__engine = __dirname + "/plugins/bdv-engine/bdv.js";
        this.__targetDir = process.env.INIT_CWD || process.cwd();
        this.__foundSaveFile = false;
    }

    outError(): void {
        _ext.printLog(0, []);
    }

    out(index: number, values: string[]): void {
        _ext.printLog(index, values);
    }

    async init(): Promise<boolean> {
        await _ext.readLogsFromFile(__dirname + "/plugins/logs.txt");
        _ext.clear();
        return true;
    }

    async setupQuestions(): Promise<boolean> {
        await _.ask([new Question("input", "q0", "Please insert an existing username or create a new one.", async (value) => {
            if (!value) {
                this.outError();
                return false
            };
            this.__info.set("username", new InputFormat("username", value));

            this.out(1, [this.__profiles]);

            let data = await Files.read(this.__profiles);
            data = data.split(',');

            for (let user of data) {
                if (user.includes(value)) {
                    let aux = user.split("CFG=")[1].split("&");
                    let optionsKeys = Object.values(Options);

                    let it = 0;
                    for (let option of aux) {
                        aux[it] = option.replace(/"/, "");
                        this.__info.set(optionsKeys[it], aux[it]);
                        it++;
                    }
                    this.out(3, [value]);
                    this.__foundSaveFile = true;
                    return true;
                }
            }
            this.out(2, [value]);

            return true;

        })]);

        if (!this.__foundSaveFile) {
            await _.ask([new Question("input", "q1", "Please insert the title of your project", (value) => {
                if (value && value.length) {
                    this.__info.set("title", new InputFormat("title", value));

                    return true;
                }
                else {
                    this.outError();
                    return false;
                }
            }),
            new Question("input", "q2", "Please insert the width of your window (800-1024)", (value) => {
                if (value && value.length && !isNaN(value) && Number(value) >= 800 && Number(value) <= 1024) {
                    this.__info.set("width", new InputFormat("width", value));
                    return true;
                }
                else {
                    this.outError();
                    return false
                };
            }),
            new Question("input", "q3", "Please insert the height of your window (600-768)", (value) => {
                if (value && value.length && !isNaN(value) && Number(value) >= 600 && Number(value) <= 768) {
                    this.__info.set("height", new InputFormat("height", value));
                    return true;
                }
                else {
                    this.outError();
                    return false;
                }
            }),
            new Question("input", "q4", "Please enter a new folder name or type '.' to create the HTML file in the current directory.", (value) => {
                if (value && value.length) {
                    this.__info.set("folder", new InputFormat("folder", value));
                    return true;
                }
                else {
                    this.outError();
                    return false;
                }
            }),
            new Question("input", "q5", "Do you wish to auto execute the project after each 'compilation'? (yes or no)", (value) => {
                if (value && value.length) {
                    value = value.toLowerCase();
                    let bool = false;
                    switch (value) {
                        case "yes":
                            bool = true;
                            break;
                        case "no":
                            break;
                        default:
                            this.outError();
                            return false;
                    }
                    this.__info.set("autoexec", new InputFormat("autoexec", bool));
                    return true;
                }
                else {
                    this.outError();
                    return false;
                }
            })]);
        }

        if (!this.__foundSaveFile && (this.__info.get("autoexec")).value) {
            await _.ask([new Question("input", "q5-b", "What browser service do you want to use? (firefox or chrome)", (value) => {
                if (value && value.length) {
                    value = value.toLowerCase();
                    switch (value) {
                        case "chrome":
                        case "firefox":
                            this.__info.set("browserService", new InputFormat("browserService", value));
                            break;
                        default:
                            this.outError();
                            return false;
                    }
                    return true;
                }
                else {
                    this.outError();
                    return false;
                }
            })]);
        }

        if (!this.__foundSaveFile) {
            let concat = "";
            let username = "";
            let c = 0;
            let size = this.__info.size;
            
            for (let each of this.__info.values()) {
                if (c === 0) {
                    username = each.value;
                    c++;
                    continue;
                }
                if (c === size - 1) {
                    concat += each.value;
                    c++;
                    continue;
                }
                concat += each.value + "&";
                c++;
            }

            await Files.edit(this.__profiles, `USER="${username}"CFG="${concat}",`.split(""));
        }
        
        return true;
    }

    async HTMLSetup(): Promise<boolean> {
        this.out(4, []);

        let data = await Files.read(this.__canvas);
        let engineFileData = await Files.read(this.__engine);

        data = data.replace(/TITLE_HERE/, this.__info.get("title").value || this.__info.get("title"));
        data = data.replace(/WIDTH_HERE/, this.__info.get("width").value || this.__info.get("width"));
        data = data.replace(/HEIGHT_HERE/, this.__info.get("height").value || this.__info.get("height"));
        data = data.replace(/SRC_HERE/, "src='./bdv/bdv.js'");

        let root = false;
        if ((this.__info.get("folder").value || this.__info.get("folder")) === ".") root = true;
        
        if (root) {
            if (await Files.isDir(this.__targetDir + "/bdv")) {
                this.out(5, ["/bdv", this.__targetDir]);
                process.exit(1);
            }
            await Files.createDir(this.__targetDir + "/bdv");
            await Files.touch(this.__targetDir, `${this.__info.get("title").value || this.__info.get("title")}.html`, data);
            await Files.touch(this.__targetDir + "/bdv", "bdv.js", engineFileData);

        } else {
            if (await Files.isDir(this.__targetDir + this.__info.get("folder").value || this.__info.get("folder"))) {
                this.out(5, [`${this.__info.get("folder").value || this.__info.get("folder")}`, this.__targetDir]);
                process.exit(1);
            }
            await Files.createDir(this.__targetDir + `/${this.__info.get("folder").value || this.__info.get("folder")}`);
            await Files.createDir(this.__targetDir + `/${this.__info.get("folder").value || this.__info.get("folder")}/bdv`);
            await Files.touch(this.__targetDir + `/${this.__info.get("folder").value || this.__info.get("folder")}`, `/${this.__info.get("title").value || this.__info.get("title")}.html`, data);
            await Files.touch(this.__targetDir + `/${this.__info.get("folder").value || this.__info.get("folder")}` + "/bdv", "bdv.js", engineFileData);
        }

        return true;
    }

    async commandLoop() : Promise<boolean> {
        return true;
    }


}

