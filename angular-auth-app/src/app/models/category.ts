export default class Category{
  categoryId?: number | null = null;
  companyId: number | null = null;
  categoryName: String="";
  commonName:String="";
  sgst:number | null = null;
  cgst:number | null = null;
  igst:number | null = null;
  pgst:number | null = null;
  totaltax?:number | null = null;
  companyName?: String = "";
  }