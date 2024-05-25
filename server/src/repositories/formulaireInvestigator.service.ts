import {PrismaService} from "./prisma/prisma.service";
import {FormulaireInvestigatorDto} from "../domain/dto/formulaires/formulaire-investigator.dto";
import {Injectable} from "@nestjs/common";


@Injectable()
export class FormulaireInvestigatorService {
    constructor(private readonly prisma: PrismaService) {}

    create(userId:number, formulaireInvestigatorDto: FormulaireInvestigatorDto){
       return this.prisma.formulaireInvestigator.create({
           data:{
               formulaire: {
                   connect: {id: formulaireInvestigatorDto.formulaireId}
               },
               investigator:{
                   connect: {id: userId}
               },
           }
       })
    }

    createList(data){
        return this.prisma.formulaireInvestigator.createMany({
            data: data
        })
    }

    findFormInvestigator(userId: number){
        return this.prisma.formulaireInvestigator.findMany({
            include:{
                formulaire: true
            }
        })
    }
}