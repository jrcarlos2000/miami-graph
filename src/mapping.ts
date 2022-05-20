import { BigInt } from "@graphprotocol/graph-ts"
import {
  timestampToDay
} from "./helpers"
import {
  mintItemEvent
} from "../generated/Contract/Contract"
import { UserNFT } from "../generated/schema"

export function handleMintItem(
  event: mintItemEvent
): void {
  let entity = UserNFT.load(event.transaction.from.toHex())

  if (!entity) {
    entity = new UserNFT(event.transaction.from.toHex())
    entity.indexes = [event.params._index];
  }
  entity.save();
}
