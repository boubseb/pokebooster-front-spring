import { ImageBooster } from "./ImageBooster.model"
import { Legalities } from "./legalities.model"

export class Set {
    data!:data
    total_cards!:number
    id!:number
    avg_price_cards!:number
  }

  export class data {
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