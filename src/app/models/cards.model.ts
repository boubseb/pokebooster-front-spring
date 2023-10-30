import { Set } from "./set.model"

export class card {
    id!: string
    name!: string
    supertype!: string
    subtypes!: string[]
    hp?: string
    types?: string[]
    evolvesTo?: string[]
    rules?: string[]
    attacks?: Attack[]
    weaknesses?: Weakness[]
    retreatCost?: string[]
    convertedRetreatCost?: number
    set!: Set
    number!: string
    artist?: string
    rarity!: string
    nationalPokedexNumbers?: number[]
    legalities!: Legalities2
    images!: Images2
    tcgplayer?: Tcgplayer
    cardmarket!: Cardmarket
    evolvesFrom?: string
    abilities?: Ability[]
    flavorText?: string
    resistances?: Resistance[]
  }


  export class Attack {
    name!: string
    cost!: string[]
    convertedEnergyCost!: number
    damage!: string
    text!: string
  }
  
  export class Weakness {
    type!: string
    value!: string
  }
  
  
  export class Legalities {
    unlimited!: string
    expanded!: string
  }
  
  export class Images {
    symbol!: string
    logo!: string
  }
  
  export class Legalities2 {
    unlimited!: string
    expanded!: string
    standard?: string
  }
  
  export class Images2 {
    small!: string
    large!: string
  }
  
  export class Tcgplayer {
    url!: string
    updatedAt!: string
    prices!: Prices
  }
  
  export class Prices {
    holofoil?: Holofoil
    normal?: Normal
    reverseHolofoil?: ReverseHolofoil
  }
  
  export class Holofoil {
    low!: number
    mid!: number
    high!: number
    market!: number
    directLow?: number
  }
  
  export class Normal {
    low!: number
    mid!: number
    high!: number
    market!: number
    directLow?: number
  }
  
  export class ReverseHolofoil {
    low!: number
    mid!: number
    high!: number
    market!: number
    directLow?: number
  }
  
  export class Cardmarket {
    url!: string
    updatedAt!: string
    prices!: Prices2
  }
  
  export class Prices2 {
    averageSellPrice!: number
    lowPrice!: number
    trendPrice!: number
    germanProLow!: number
    suggestedPrice!: number
    reverseHoloSell!: number
    reverseHoloLow!: number
    reverseHoloTrend!: number
    lowPriceExPlus!: number
    avg1!: number
    avg7!: number
    avg30!: number
    reverseHoloAvg1!: number
    reverseHoloAvg7!: number
    reverseHoloAvg30!: number
  }
  
  export class Ability {
    name!: string
    text!: string
    type!: string
  }
  
  export class Resistance {
    type!: string
    value!: string
  }
  