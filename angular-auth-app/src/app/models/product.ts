export default class Product {
  productId?:number|null=null;
  companyId:number|null=null;
  categoryId:number|null=null;
  userId: number|null=null;
  productName: String="";
  productBrand: String="";
  productMeasurement: String="";
  productPriceOn: number|null=null;
  productPackaging: String = "";
  productQuantity: String="";
  categoryName?: String;
}