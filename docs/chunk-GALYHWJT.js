var n=r=>{try{return Intl.NumberFormat("en",{style:"currency",currency:r}).formatToParts().find(t=>t.type==="currency")?.value??""}catch{return r}};export{n as a};
