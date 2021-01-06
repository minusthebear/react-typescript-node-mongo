export type Profile = {
    name: string,
    userID: string,
    _id: string
}

export type Data = {
    token: string,
    profile: Profile | null
}
