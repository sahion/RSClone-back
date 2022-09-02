import { IThanks } from "../interfaces/IThanks"

export  const thanksDB = {
  data: require('../../data/thanks.json') as IThanks[],
  setData: function (data: IThanks[]) {this.data = data}


}