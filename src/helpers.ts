import { BigInt } from "@graphprotocol/graph-ts"

export function timestampToDay(timestamp: BigInt): BigInt {
    return timestamp / BigInt.fromI32(86400) * BigInt.fromI32(86400)
}