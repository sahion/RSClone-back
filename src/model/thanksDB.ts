import { IThanks } from "../interfaces/IThanks"

export  const thanksDB = {
  data: require('../../data/users.json') as IThanks[],
  setData: function (data: IThanks[]) {this.data = data}


}