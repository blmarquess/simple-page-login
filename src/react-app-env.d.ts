/// <reference types="react-scripts" />

export declare type Navigator = Omit<History, "action" | "location" | "back" | "forward" | "listen" | "block">;

declare global {
    namespace WebdriverIO {
        interface Browser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface MultiRemoteBrowser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface Element {
            elementCustomCommand: (arg: any) => Promise<number>
        }
    }
}
