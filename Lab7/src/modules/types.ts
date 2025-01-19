export type T_Component =  {
    id: number,
    name: string,
    description: string,
    price: number,
    category: string,
    image: string,
    status: number
    count?: number
}

export type T_Rocket = {
    id: string | null
    status: E_RocketStatus
    date_complete: string
    date_created: string
    date_formation: string
    owner: string
    moderator: string
    components: T_Component[]
    name: string
    weight: string
}

export enum E_RocketStatus {
    Draft=1,
    InWork,
    Completed,
    Rejected,
    Deleted
}

export type T_User = {
    id: number
    username: string
    is_authenticated: boolean
}

export type T_RocketsFilters = {
    date_formation_start: string
    date_formation_end: string
    status: number
}

export type T_ComponentsListResponse = {
    components: T_Component[],
    draft_rocket_id: number,
    components_count: number
}

export type T_LoginCredentials = {
    username: string
    password: string
}

export type T_RegisterCredentials = {
    name: string
    email: string
    password: string
}