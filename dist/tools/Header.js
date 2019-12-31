"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var COLORS;
(function (COLORS) {
    COLORS[COLORS["RED"] = 1] = "RED";
    COLORS[COLORS["GREEN"] = 2] = "GREEN";
    COLORS[COLORS["BLUE"] = 3] = "BLUE";
})(COLORS = exports.COLORS || (exports.COLORS = {}));
class Question {
    constructor(type, name, message, validate) {
        this.type = type;
        this.name = name;
        this.message = message;
        this.validate = validate;
    }
}
exports.Question = Question;
class Checkbox {
    constructor(type, name, message, choices, defaultOpts) {
        this.type = type;
        this.name = name;
        this.message = message;
        this.choices = choices;
        this.default = defaultOpts;
    }
}
exports.Checkbox = Checkbox;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Rvb2xzL0hlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLElBQVksTUFJWDtBQUpELFdBQVksTUFBTTtJQUNkLGlDQUFPLENBQUE7SUFDUCxxQ0FBSyxDQUFBO0lBQ0wsbUNBQUksQ0FBQTtBQUNSLENBQUMsRUFKVyxNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUFJakI7QUFJRCxNQUFhLFFBQVE7SUFLakIsWUFBWSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRO1FBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7Q0FDSjtBQVhELDRCQVdDO0FBRUQsTUFBYSxRQUFRO0lBTWpCLFlBQVksSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVc7UUFDakQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7SUFDL0IsQ0FBQztDQUNKO0FBYkQsNEJBYUMifQ==