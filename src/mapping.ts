import { BigInt } from "@graphprotocol/graph-ts"
import {
  timestampToDay
} from "./helpers"
import {
  mintItemEvent
} from "../generated/Contract/Contract"
import { UserNFT, doiNFT } from "../generated/schema"
import {
  proposalMade
} from "../generated/ProposalContract/Contract"
import { UserProposal, doiProposal } from "../generated/schema"


// adding the index of each NFT to its user (entity)
export function handleMintItem(
  event: mintItemEvent
): void {
  let entity = UserNFT.load(event.transaction.from.toHex());
  if (!entity) {
    entity = new UserNFT(event.transaction.from.toHex())
    entity.indexes = [event.params._index];
    entity.save()
    
    entity.save()
  }
  else{
    let tmp = entity.indexes;
    tmp.push(event.params._index);
    entity.indexes = tmp;
    entity.save();
  }
  //doi
  // adding the index of each NFT to its doi
  let doiEntity = doiNFT.load(event.params._doi);
  if (!doiEntity) {
    doiEntity = new doiNFT(event.params._doi);
    doiEntity.indexes = [event.params._index];
    doiEntity.save()
  }
  else{
    let tmp = doiEntity.indexes;
    tmp.push(event.params._index);
    doiEntity.indexes = tmp;
    doiEntity.save();
  }
}
// adding the index of each NFT to its user (entity)
// event proposalMade(
//   string doi,
//   address proposer,
//   uint256 idx,
//   uint256 deadline
// );
export function ProposalMadeItem(
  event: proposalMade
): void {
  let entity = UserProposal.load(event.transaction.from.toHex());
  if (!entity) {
    entity = new UserProposal(event.transaction.from.toHex())
    entity.indexes = [event.params.idx];
    entity.save()
  }
  else{
    let tmp = entity.indexes;
    tmp.push(event.params.idx);
    entity.indexes = tmp;
    entity.save();
  }

  let doiEntity = doiProposal.load(event.params.doi);
  if (!doiEntity) {
    doiEntity = new doiProposal(event.params.doi);
    doiEntity.indexes = [event.params.idx];
    doiEntity.save()
  }
  else{
    let tmp = doiEntity.indexes;
    tmp.push(event.params.idx);
    doiEntity.indexes = tmp;
    doiEntity.save();
  }
}



