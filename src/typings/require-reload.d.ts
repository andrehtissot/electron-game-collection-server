declare module 'require-reload' {
    export default function(require: NodeRequire): (module: string) => any
}
