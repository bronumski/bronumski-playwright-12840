import { FullConfig } from '@playwright/test';
import * as path from "path";

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

async function globalSetup(config: FullConfig) {

    let compiled = false;

    const compiler = webpack(require("../webpack.config")({},{ mode: 'development', e2e: true }));

    compiler.hooks.done.tap("compiled", () => {
        console.log("compiled");
        compiled = true;
    });

    const devServer = new WebpackDevServer(compiler, {
        host: "localhost",
        port: 3000,
        static: {
            directory: path.join(__dirname, "../src"),
        },
    });

    console.log("Starting dev server");

    await devServer.start();

    await new Promise(function (resolve) {
        (function waitUntil(){
            if (compiled) return resolve(compiled);
            console.log("Waiting ...");
            setTimeout(waitUntil, 100, );
        })();
    });

    console.log("Dev server started");

    return async () => {
        await new Promise(done =>
            setTimeout(async () => {
                console.log("Shutting down");
                await devServer.stop(done);
                console.log("Shut down");
            }, 5000));
    };

}

export default globalSetup;


