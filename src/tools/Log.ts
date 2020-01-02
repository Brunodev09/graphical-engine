export type LogTypes = "info" | "green" | "warning" | "yellow" | "error" | "red"; 

export class Log {
    text : string;
    
    type : LogTypes;
    constructor(text, type) {
        this.text = text;
        switch (type) {
            case "info":
            case null:
            case undefined:         
                this.type = "green";
                break;
            case "warning":
                this.type = "yellow";
                break;
            case "error":
                this.type = "red";
                break;        
        }
    }
}
