import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { flatten } from "@nestjs/common";
import { SchemaService } from "src/schema/schema.service";


 
@Injectable()
export class VerifyTemplateService{
    constructor (private schemaService: SchemaService) {}


    private parseHBS(HBSstr: string):Array<string>{
        let HBSfields: Array<string> = HBSstr.match(/{{[{]?(.*?)[}]?}}/g)
        HBSfields.forEach((fieldname:string) => {
            let len = fieldname.length
            fieldname = fieldname.slice(2, len-2);
        })
        HBSfields.sort()
        return HBSfields;

    }

    async verify(template: string, schemaID: string): Promise<Boolean>{
        let HBSfields: Array<string> = this.parseHBS(template);

        let requiredFields:Array<string> = this.schemaService.getSchema(schemaID)["schema"]["required"];
        if (HBSfields.length == requiredFields.length){
            requiredFields.sort()
            requiredFields.forEach((field, index) =>{
                if (field != HBSfields[index]){
                    return false;
                }
                else{
                    return true;
                }

            })


        }
        else{
            console.log("Number of fields in HBS file does not match required field list in schema");
            return false;
        }




    }



}
