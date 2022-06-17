export class User {
    constructor(
        public id: number,
        public nickname: string,
        public email: string,
        public birthDate: Date,
        public password: string,
    ){

    }
}
