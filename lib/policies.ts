export const cancellationWindow = '60 minutes'
export const defectClaimWindow = '24 hours of delivery'
export const policies = {
  cancellation: `You may request cancellation within ${cancellationWindow} of placing an order, before printing begins. After ${cancellationWindow}, the order cannot be cancelled or changed.`,
  eligibleReturns: `Contact HILOL within ${defectClaimWindow} if the item is damaged, defective, incorrectly printed, or the wrong item or size was sent due to a fulfillment error. HILOL may request order details, photographs, and a continuous uncut 360° unboxing video. If approved, HILOL will arrange a replacement or refund and cover return shipping where the issue was our error.`,
  notEligible: 'Custom-made products are generally non-refundable. Change of mind, buyer remorse, customer-selected wrong size or colour, normal wear, incorrect care, and customer-caused damage are not eligible for return or refund.',
} as const

export const qualityCopy = {
  fabric: 'Bio-washed and silicon-softened cotton with 180–240 GSM testing, high-gauge combed yarn, reactive dyes, and compacted construction targeting less than 2% dimensional shrinkage.',
  print: 'High-definition industrial DTF graphics are heat-cured at 165°C / 6 bar and checked for print registration, colour, stretch recovery, and cracking resistance.',
  origin: 'Tiruppur direct-factory production: Tamil Nadu yarn sourcing, circular knitting, bio-polishing, cutting, stitching, printing, quality control, and packing.',
} as const
