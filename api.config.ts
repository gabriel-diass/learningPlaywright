import { PlaywrightTestConfig} from '@playwright/test'

const config: PlaywrightTestConfig ={
    timeout: 60000, //60s
    retries: 0,
    testDir: 'test/api',
    use:{
        headless: true,
        viewport: { width:1280, height: 720},
        actionTimeout: 10000,
        ignoreHTTPSErrors: true,
        video: "off",
        screenshot: "off",
    },
    projects: [
        {
            name: "Chromium",
            use: { browserName: "chromium"},
        },
        {
            name: "Firefox",
            use: { browserName: "firefox"},
        },
        {
            name: "Webkit",
            use: { browserName: "webkit"},
        },
    ],
}

export default config