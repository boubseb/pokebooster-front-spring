import { ImageBooster } from "./ImageBooster.model"
import { Legalities } from "./legalities.model"

export class Booster {
    id!: string
    name!: string
    series!: string
    printedTotal!: number
    total!: number
    legalities!: Legalities
    ptcgoCode?: string
    releaseDate!: string
    updatedAt!: string
    images!: ImageBooster
  }