export class Topic {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public publicationDate: Date,
        public TopicState: number,
        public complaints: number,
        public responses: Response[]
    ){

    }
}
