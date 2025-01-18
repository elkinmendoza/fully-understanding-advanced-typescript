import "reflect-metadata";
import { Product } from "./product.model";
import {validate} from 'class-validator'
// const products = [
//     {title:'A Carpet', price:10.99 },
//     {title:'A Book', price:22.99 }
// ];

const p1 = new Product('',-5.55)

validate(p1).then(errors=>{
    if(errors.length>0){
        console.log('validation erros!');
        console.log(errors)
    }else{
        console.log(p1.getInformation())
    }

})
// const loadedProducts =plainToClass(Product,products)


// for (const prod of loadedProducts){
//     console.log(prod.getInformation());
// }
// console.log(p1.getInformation())