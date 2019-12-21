export interface Api {
    getInfo(url: string, arg?: object, callback?: Function): Promise<object>
}