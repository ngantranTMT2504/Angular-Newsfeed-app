export interface posts {
post: {
    "content": string,
    "image": string,
    "creatorName": string,
    "creatorAvatar": string,
    "time": number,
},
comment: [{
    "comment": string,
    "creatorName": string,
    "avatarCmt": string,
    "isDelete" : true,
}]
}