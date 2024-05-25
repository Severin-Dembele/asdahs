import {Injectable} from "@nestjs/common";
import {PrismaService} from "./prisma/prisma.service";

@Injectable()
export class RepondantService {
    constructor(private prisma: PrismaService) {}

    create(formulaireId:number, repondantDto){
       return this.prisma.repondant.create({
           data:{
               email: repondantDto.email,
               isRepondu: false,
               formulaire:{
                   connect: { id: formulaireId}
               }
           }
       })
    }
}