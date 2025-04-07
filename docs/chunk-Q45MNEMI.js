import{a as k}from"./chunk-ABBJH3Q4.js";import{a as g,c as w}from"./chunk-T3OWWN6A.js";import{M as T,P as y,a as R,b as f,f as c}from"./chunk-7BPNVVWP.js";var A=class h{constructor(t,e){this._recipeRepository=t;this._productRepository=e}calculation;calculateRecipe(t,e=0){return new Promise((o,l)=>c(this,null,function*(){let u=[],n=0,d=0;yield this._recipeRepository.getOne(t).then(s=>c(this,null,function*(){let r=(e||s?.outcome_amount||1)/(s?.outcome_amount||1),{table:m,totalAmount:i,totalWeight:a}=yield this._makeIngredientTable(s,r);n+=i||0,d+=a||0,u.push(...m),u.push(this._makeTotal(n,d)),o({recipe:s,result:u,total:n,totalWeight:d})}))}))}getRecipe(t){return c(this,null,function*(){if(!t)return;let e=yield this._recipeRepository.getOne(t);if(!e)return;let o=0;return e.outcome_unit&&e.outcome_amount?o=e.outcome_amount:o=e?.ingredients?.reduce((l,u)=>{if(u.unit!=="gram")return l;let n=g(u.amount)||0;return l+n},0)??0,f(R({totalAmountInGrams:o||0},e),{pricePerUnit:0})})}_makeRecipeSubTable(t,e=0){return c(this,null,function*(){return new Promise((o,l)=>c(this,null,function*(){let u=[],n=0,d=0,s=t.amount;yield this.getRecipe(t.recipe_id).then(r=>c(this,null,function*(){let m=s/(r?.totalAmountInGrams||1),i=yield this._makeIngredientTable(r,e);i.table=i.table.map((p,P)=>{let F=(p.amount||0)*(e||1)*m;return f(R({},p),{amount:parseFloat((F||0).toFixed(5)),total:parseFloat((p.total?p.total*m:0).toFixed(5)),indent:p.indent+1})});let a=i.totalAmount?i.totalAmount/i.totalWeight:0,_=(r?.totalAmountInGrams||0)*e*m,b=i.totalAmount*m;u.push(this._makeRecipeCaption({name:r?.name||"Unknown recipe",price_per_gram:a,amount:_,total:b,unit:t.unit,uuid:r?.uuid||""})),u.push(...i.table),d+=b,n+=i.totalWeight*m,o({table:u,totalAmount:d,totalWeight:n})}))}))})}_makeIngredientTable(t,e=0){let o=[],l=0,u=0;return Promise.all(t?.ingredients.map((n,d)=>c(this,null,function*(){let s=n.recipe_id,r=n.product_id,m=n.name;if(!s&&!r&&!m){let i=n.amount;return}if(s){let i=yield this._makeRecipeSubTable(n,e);o.push(...i.table),u+=i.totalAmount,l+=i.totalWeight}else if(r){let i=yield this._productRepository.getOne(n.product_id).then(a=>c(this,null,function*(){if(!a){o.push(this._makeRow({name:"Unknown product",price_per_gram:void 0,amount:n.amount*(e||1),total:void 0,uuid:a?.uuid||""}));return}if(!a?.price){o.push(this._makeRow({name:a.name,price_per_gram:0,amount:n.amount*(e||1),total:0,uuid:a?.uuid||""}));return}if(!a?.amount){o.push(this._makeRow({name:a.name,price_per_gram:0,amount:n.amount*(e||1),total:0,uuid:a?.uuid||""}));return}let _=n.amount*(e||1),b=(g(a.price)||1)/(g(a.amount)||1),p=b*(g(_)||1),P=a.unit==="gram"||!a.unit;o.push(this._makeRow({name:a.name,price_per_gram:b,amount:_,total:p,unit:a.unit,uuid:a?.uuid||""})),u+=p,P&&(l+=+_)}))}else m&&(o.push(this._makeRow({name:n.name,price_per_gram:void 0,amount:n.amount*(e||1),total:void 0,uuid:""})),l+=+n.amount*(e||1))}))??[]).then(()=>({table:o,totalAmount:u,totalWeight:l}))}_makeRow(t){return{name:t.name,price_per_gram:parseFloat(t.price_per_gram?.toFixed(5)??"0"),amount:t.amount,total:parseFloat(t.total?.toFixed(5)??"0"),unit:t.unit||"gram",indent:t.indent??0,type:"row",uuid:t.uuid}}_makeCaption(t){return{name:t,unit:void 0,price_per_gram:void 0,amount:void 0,total:void 0,indent:0,type:"caption"}}_makeRecipeCaption(t){return{name:t.name,price_per_gram:parseFloat(t.price_per_gram.toFixed(5)),amount:t.amount,total:parseFloat(t.total.toFixed(2)),unit:t.unit||"gram",indent:0,type:"recipe-row",uuid:t.uuid}}_makeTotal(t,e){return{name:"Total (without taxes and fees)",amount:e,unit:"gram",price_per_gram:parseFloat((t/e).toFixed(5)),total:parseFloat(t.toFixed(2)),indent:0,type:"total"}}static \u0275fac=function(e){return new(e||h)(y(k),y(w))};static \u0275prov=T({token:h,factory:h.\u0275fac,providedIn:"root"})};export{A as a};
