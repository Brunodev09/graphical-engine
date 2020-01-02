#!/usr/bin/env node

import Main from "./Main";
import __Console from "./tools/Terminal";
const _ = new __Console();

const DEV_MODE = true;


(async () => {
    try {
        let engine = new Main();
        await engine.run();
    } catch(e) {
        _.say(`Fatal error in Engine loop. Stack: ${e.message}, ${e}`, "red");
        if (DEV_MODE) console.error(e);
        process.exit(1);
    }
})();

