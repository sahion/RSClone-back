import { IApply } from "../interfaces/IApply"

export const ApplyDB = {
  applies: require('../../data/applies.json') as IApply[],
  setApplies: function (data: IApply[]) {this.applies = data}
}