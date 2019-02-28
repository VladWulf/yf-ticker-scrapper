const { quote } = require("yahoo-finance")
const _ = require('lodash')
const universe = ' 0123456789abcdefghijklmnopqrstuvwxyz.';
const fs = require('fs');

const extract = (stock, filter=null) => {
  const { price, summaryProfile } = stock;
  // return {
  //   price: stock.price,
  //   summary: stock.summaryProfile
  // }
  // ticker (price.symbol) companyName (price.longName) exchange (price.exchange) exchangeName (price.exchangeName) type (price.quoteType) currency (price.currency) country (summaryProfile.country)
  return `${price.symbol}, ${price.longName}, ${price.exchange}, ${price.exchangeName}, ${price.quoteType}, ${price.currency}, ${summaryProfile.country}`
}


!async function main() {
  let tickers = [];
  for (let i1 = 0; i1 < universe.length; i1++) {
    for (let i2 = 0; i2 < universe.length; i2++) {
      for (let i3 = 0; i3 < universe.length; i3++) {
        for (let i4 = 0; i4 < universe.length; i4++) {
          for (let i5 = 0; i5 < universe.length; i5++) {
            for (let i6 = 0; i6 < universe.length; i6++) {
              for (let i7 = 0; i7 < universe.length; i7++) {
                for (let i8 = 0; i8 < universe.length; i8++) {
                  const arraySymbol = [
                    universe[i8],
                    universe[i7],
                    universe[i6], 
                    universe[i5], 
                    universe[i4], 
                    universe[i3], 
                    universe[i2], 
                    universe[i1]
                  ]
                  const symbol = arraySymbol.join('')
                  console.log(`# ${symbol}`);
                  try {
                    const stock = await quote({
                      symbol,
                      modules: ['price', 'summaryProfile']
                    })
                    const csvStock = extract(stock)
                    fs.appendFileSync('stocks.csv', csvStock + '\n')
                  } catch(error) {
                    console.log(`error ${error}`)
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}()

