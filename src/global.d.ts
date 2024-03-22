
// src/global.d.ts
export {}

declare global {
    interface Window {
        _AMapSecurityConfig: any;
    }
}

declare const window: any;
