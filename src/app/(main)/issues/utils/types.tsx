export interface Issue {
    id : string,
    title : string,
    reasons : {
        description : string,
        detail : string,
        category : string,
        evidence : string,
        priority : string,
        recommendations : string,
    }[],
    status : string,
    createdAt : string,
}
