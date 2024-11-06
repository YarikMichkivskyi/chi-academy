import { AllExhibit } from "./exhibit"

export type AllExhibitResponse = {
    data: AllExhibit[]
    total: number
    page: string
    lastPage: number
}