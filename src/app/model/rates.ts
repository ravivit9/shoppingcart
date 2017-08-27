export class Rates {
    constructor(
        public success: boolean,
        public terms: string,
        public privacy: string,
        public timestamp: string,
        public quotes: object
    ) {}
}
