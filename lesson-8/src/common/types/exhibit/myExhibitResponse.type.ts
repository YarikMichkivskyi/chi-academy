import { MyExhibit } from "./exhibit"

export type MyExhibitResponse = {
    data: MyExhibit[]
    total: number
    page: string
    lastPage: number
}