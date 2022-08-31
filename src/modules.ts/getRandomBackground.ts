function getRandomInt(max: number){
  return Math.floor(Math.random() * max);
}

export function getRandomColor(){
  const background = ['#AEC569', '#FFDB5D', '#72D1AA', '#FED758', '#7B413B', '#E6A7E6', '#FFD6D6', '#009250', '#FE5E5B', '#FFF9E6', '#00A1E0', '#A19AB0'];
  const randomInt = getRandomInt(background.length);
  return background[randomInt];
}
