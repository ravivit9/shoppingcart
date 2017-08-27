
export class Products {
    constructor(
        public id: string,
        public desc: string,
        public baseCurrency: string,
        public baseRate: number,
        public perQuantity: string,
        public foreignCurrency: boolean = true,
        public basketQuantity: number,
        public total: number
    ) {}
}
/*
export interface  Products {
    id: string;
    desc: string;
    baseCurrency: string;
    baseRate: string;
    perQuantity: string;
    foreignCurrency: boolean;
    basketQuantity: number;
    total: number
}
*/
/*

this.products = [
  {id: 'Peas' , desc: 'Peas', baseCurrency: 'GBP', baseRate: 0.95, perQuantity: 'Bag', foreignCurrency: true, basketQuantity: 0, total: 0},
  {id: 'Eggs' , desc: 'Eggs', baseCurrency: 'GBP', baseRate: 2.10, perQuantity: 'Dozen', foreignCurrency: true, basketQuantity: 0, total: 0},
  {id: 'Milk' , desc: 'Milk', baseCurrency: 'GBP', baseRate: 1.30, perQuantity: 'Bottle', foreignCurrency: true, basketQuantity: 0, total: 0},
  {id: 'Beans' , desc: 'Beans', baseCurrency: 'GBP', baseRate: 0.73, perQuantity: 'Can', foreignCurrency: true, basketQuantity: 0, total: 0},
  {id: 'Carrots' , desc: 'Carrots', baseCurrency: 'GBP', baseRate: 0.88, perQuantity: 'Kg', foreignCurrency: false, basketQuantity: 0, total: 0}
];

 */
