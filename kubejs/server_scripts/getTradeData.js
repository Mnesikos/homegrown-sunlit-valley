ItemEvents.rightClicked("functionalstorage:creative_vending_upgrade", (e) => {
  const trades = JsonIO.read("config/custom trades/toolsmith.json");
  e.player.tell("TRADE OFFER:")
  trades.trades.forEach((trade)=>{
    e.player.tell(`${trade.offer.amount}x ${trade.offer.itemKey} for ${trade.request.amount}x ${trade.request.itemKey}`)
  })
});
