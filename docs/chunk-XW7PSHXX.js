import{c as d}from"./chunk-NEKHWACR.js";import{_ as n,ca as c,f as t}from"./chunk-EXR2ZECX.js";var o=class r{constructor(e){this._indexDbService=e}addRecipe(e){return t(this,null,function*(){return this._indexDbService.addData("recipesStore",e)})}getRecipes(){return this._indexDbService.getAll("recipesStore")}getOne(e){return t(this,null,function*(){return new Promise((i,s)=>t(this,null,function*(){if(!e){i(void 0);return}e=e.uuid||e,yield this._indexDbService.getOne("recipesStore",e).then(a=>{i(a)})}))})}editRecipe(e,i){return this._indexDbService.replaceData("recipesStore",e,i)}deleteRecipe(e){return this._indexDbService.remove("recipesStore",e)}static \u0275fac=function(i){return new(i||r)(c(d))};static \u0275prov=n({token:r,factory:r.\u0275fac,providedIn:"root"})};export{o as a};
