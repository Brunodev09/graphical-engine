import Main from "./Main";
import _ from "./tools/Terminal";

(async () => {
    try {
        let engine = new Main();
        await engine.run();
    } catch(e) {
        _.say(`Fatal error in Engine loop. Stack: ${e.message}, ${e}`);
        process.exit(1);
    }
})()
