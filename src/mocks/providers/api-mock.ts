export class ApiMock {
    response: any;
    url: string;
    params: any;
    reqOpts: any;

    get(url: string, params?: any, reqOpts?: any) {
        if (
            url == this.url &&
            params == this.params &&
            reqOpts == this.reqOpts
        ) {
            return this.response;
        }

        return fail;
    }
}
