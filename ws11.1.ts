class Restaurant{
    constructor(private menuItem: MenuItem[]) {}
    showMenu():void {
        console.log(`รายการอาหาร มีดังต่อไปนี้: `);
        this.menuItem.forEach(item=>{
            console.log(item.showMenuInfo());
        })
    }
    calNetPrice(total:number):number{
        const rate=0.01;
        if(total >=500){
            return total*(1-0.01);
        }else{
            return total;
        }
    }
}

class MenuItem{
    constructor(private _name:string,private _price:number,private category:string){}
    showMenuInfo():string{
        return `${this._name} - ${this._price} - ${this.category}`;
    }
    get name(){
        return this._name;
    }
    get price(){
        return this._price;
    }
}
class Customer{
    constructor(private name:string){}
    placeOrder(rast : Restaurant,order:Order):void{
        const total = order.calTotal();
        const NetPrice= rest1.calNetPrice(total);
        console.log(`${this.name} สั่งราการอาหารต่อไปนี้: `)
        order.showOrder();
        console.log(`จำนวนเงินที่ต้องชำระ ${NetPrice}`)
    }
}

class Order{
    constructor(
        private items: {item: MenuItem, quantity:number} [] = []
    ) {}
    showOrder():void{
        this.items.forEach( ({item, quantity})=>{
            console.log(`${item.showMenuInfo()} * ${quantity} = ${quantity*item.price} บาท`);
        })
        console.log(`รวมเป็นเงิน ${this.calTotal()} บาท`);
    }
    calTotal():number{
        let Total= 0;
        for (const {item,quantity} of this.items){
            Total += item.price * quantity;
        }
        return Total;
    }
}

const menu1= new MenuItem("Pizza",159,"Italian");
const menu2= new MenuItem("แกงเขียวหวาน",99,"Thai");
const menu3= new MenuItem("Steak",199,"Europe");
const rest1=new Restaurant([menu1,menu2,menu3]);
rest1.showMenu();
const cust1= new Customer("วงศกร");
const order1 = new Order([
    {item:menu1,quantity:2},
    {item:menu2,quantity:3},
])
cust1.placeOrder(rest1,order1);