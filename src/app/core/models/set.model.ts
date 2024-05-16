
export class Set {
    data!:data
    name!:string
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

  export class Legalities {
    unlimited!: string
    expanded?: string
    standard?: string
  }

  export class ImageBooster {
    symbol!: string
    logo!: string
  }