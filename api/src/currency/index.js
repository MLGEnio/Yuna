const CurrencyTypeDefs = `
  type Currency {
    currency : String
    symbol : String
    value : Int
  }

  type Query {
    currency: [Currency]
  }
`

export default CurrencyTypeDefs
