//simple match 
const nameStr = "name abc Namename"
console.log(nameStr.match(/name/gi).length ?? 0)

//character set : []
//found ninja binja and cinja
const chSet  = "ninjaasdasbinjaasdasdcinja"

//n, c or b in first position + inja
console.log(chSet.match(/[ncb]inja/gi))

//not with
const ch2 = "a000b0000f000"
console.log(ch2.match(/[^f]000/g))



//ranges
console.log(/[0-9]{10}$/.test("123456789089"))