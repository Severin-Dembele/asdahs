import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FormulairesService } from '../repositories/formulaires.service';
import { CreateFormulaireDto } from '../domain/dto/formulaires/create-formulaire.dto';
import { UpdateFormulaireDto } from '../domain/dto/formulaires/update-formulaire.dto';
import { FileInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import * as path from 'path';
import { QuestionService } from '../question/question.service';
import { CreateQuestionDto } from '../question/dto/create-question.dto';
import { OptionService } from '../reponse-propose/option.service';
import { Question } from '../question/entities/question.entity';
import { CreateReponseReponduDto } from '../reponse-repondu/dto/create-reponse-repondu.dto';
import { ReponseReponduService } from '../reponse-repondu/reponse-repondu.service';
import { AuthService } from '../repositories/auth/auth.service';
import { CreateSectionDto } from '../section/dto/create-section.dto';
import { SectionService } from '../section/section.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fastCsv = require('fast-csv');
import * as xlsx from 'xlsx';
import { UsersService } from 'src/repositories/users.service';
import { AuthGuard } from 'src/repositories/auth/auth.guard';

@Controller('formulaires')
@ApiTags('formulaires')
export class FormulaireController {
  constructor(
    private formulaireService: FormulairesService,
    private sectionService: SectionService,
    private questionService: QuestionService,
    private optionService: OptionService,
    private reponseReponduService: ReponseReponduService,
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post()
  create(@Body() createFormulaireDto: CreateFormulaireDto) {
    return this.formulaireService.create(createFormulaireDto);
  }

  @Post(':formulaireId/sections')
  @UseInterceptors(NoFilesInterceptor())
  createSection(
    @Param('formulaireId') formulaireId: number,
    @Body() createSectionDto,
  ) {
    return this.sectionService.create(formulaireId, createSectionDto);
  }

  @Get(':formulaireId/sections')
  findSectionByFormulaire(@Param('formulaireId') formulaireId: number) {
    return this.sectionService.findAllSectionByFormulaire(formulaireId);
  }

  @UseInterceptors(FileInterceptor('emails'))
  @Post(':formulaireId/participants')
  contactParticipants(
    @UploadedFile() file: Express.Multer.File,
    @Param('formulaireId') formulaireId: number,
    @Body() participantDto,
  ) {
    participantDto.emails = file ? file.filename : null;
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      `/uploads/formulaires/${file.filename}`,
    );
    const worbook = xlsx.readFile(filePath, {
      type: 'buffer',
      cellDates: true,
    });
    const sheetName = worbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(worbook.Sheets[sheetName]);
    console.log(data);
  }

  @Get()
  findAll() {
    return this.formulaireService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const formulaire = await this.formulaireService.findOne(id);
    if (!formulaire) {
      throw new NotFoundException('Formulaire not found');
    }
    return formulaire;
  }

  @Get('/token/:token')
  async findFormulaireByToken(@Param('token') token: string) {
    const data = this.authService.decodeToken(token);
    const formulaire = await this.formulaireService.findOne(data.sub);
    const cloneFormulaire = { ...formulaire, expired: false };
    try {
      this.authService.validateToken(token);
    } catch (e) {
      cloneFormulaire.expired = true;
    }
    return formulaire;
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateFormulaireDto: UpdateFormulaireDto,
  ) {
    return this.formulaireService.update(id, updateFormulaireDto);
  }

  @Post(':idFormulaire/import')
  @UseInterceptors(FileInterceptor('file'))
  importFileQuestion(
    @Param('idFormulaire') idFormulaire: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() fileDto,
  ) {
    try {
      fileDto.file = file ? file.filename : null;
      const filePath = path.join(
        __dirname,
        '..',
        '..',
        `/uploads/formulaires/${file.filename}`,
      );
      const data: any[] = [];
      fs.createReadStream(filePath)
        .pipe(
          fastCsv.parse({
            objectMode: true,
            delimiter: ',',
            quote: null,
            headers: false,
            renameHeaders: false,
          }),
        )
        .on('error', (error: any) => {
          console.log(error);
        })
        .on('data', (row: any) => {
          if (row.length != 0) {
            data.push(row);
          }
        })
        .on('end', (rowCount: any) => {
          console.log('Liste des questions');
          const questions = this.formulaireService.getQuestionsFromFile(data);
          const questionsDtos: CreateQuestionDto[] = questions.map((item) => {
            return { title: item.title, type: item.type };
          });
          this.createQuestionAndReponse(idFormulaire, questions);
        });
      //this.deleteFileAfterImport(filePath);
    } catch (e) {
      console.log(e);
    }
  }

  async createQuestionAndReponse(idFormulaire: number, questions: Question[]) {
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const created = await this.questionService.createWithFormulaire(
        idFormulaire,
        {
          title: question.title,
          type: question.type,
        },
      );
      const reponses: any[] = [];
      for (let j = 0; j < question.reponses.length; j++) {
        if (question.reponses[j].trim().length > 0) {
          reponses.push({ title: question.reponses[j] });
        }
      }
      console.log('création multiple ');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log(created);
      // @ts-ignore
      this.optionService.createMultiple(created.id as number, reponses);
    }
  }

  deleteFileAfterImport(filePath: string) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(
          `Erreur lors de la suppression du fichier: ${err.message}`,
        );
      }
    });
  }

  @Delete('id')
  remove(@Param('id') id: number) {
    return this.formulaireService.remove(id);
  }

  @Post(':idFormulaire/reponses')
  async reponseFormulaire(
    @Param('idFormulaire') idFormulaire: number,
    @Body() reponseRepondu: any[],
    @Req() request: Request,
  ) {
    const authToken = request.headers['authorization'].split(' ')[1];
    const data = await this.authService.decodeToken(authToken);
    const createReponseRepondu: CreateReponseReponduDto[] = [];
    const user = await this.userService.findOne(data.sub);
    if (user == null) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    } else {
      if (user.role == 'INVESTIGATOR') {
        const formulaireInvestigator =
          await this.formulaireService.getFormulaireInvestigator(
            user.id,
            idFormulaire,
          );
        if (
          formulaireInvestigator == null ||
          formulaireInvestigator == undefined
        ) {
          this.formulaireService.createFormulaireInvestigator({
            userId: user.id,
            formulaireId: idFormulaire,
          });
        }
      } else {
        if (user.role == 'RESPONDENT') {
          await this.userService.updateStatus(user.id);
        }
      }
    }
    for (let i = 0; i < reponseRepondu.length; i++) {
      const item: any[] = reponseRepondu[i].reponses;
      for (let j = 0; j < item.length; j++) {
        createReponseRepondu.push({
          formulaireId: idFormulaire,
          title: item[j],
          questionId: parseInt(reponseRepondu[i].id),
          userId: data.sub,
        });
      }
    }
    this.reponseReponduService
      .createMultiple(idFormulaire, createReponseRepondu)
      .then((r) => console.log(r));
  }

  @UseGuards(AuthGuard)
  @Post(':idFormulaire/users/:userId/reponses')
  async investigatorResponseFormulaire(
    @Param('idFormulaire') idFormulaire: number,
    @Param('userId') userId: number,
    @Body() reponseRepondu: any[],
    @Req() request: Request,
  ) {
    const authToken = request.headers['authorization'].split(' ')[1];
    const data = await this.authService.decodeToken(authToken);
    const createReponseRepondu: CreateReponseReponduDto[] = [];
    const user = await this.userService.findOne(data.sub);
    if (user == null) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    } else {
      if (user.role == 'INVESTIGATOR') {
        const formulaireInvestigator =
          await this.formulaireService.getFormulaireInvestigator(
            user.id,
            idFormulaire,
          );
        if (
          formulaireInvestigator == null ||
          formulaireInvestigator == undefined
        ) {
          this.formulaireService.createFormulaireInvestigator({
            userId: user.id,
            formulaireId: idFormulaire,
          });
        }
      } else {
        throw new HttpException(
          'User must be an investigator',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      await this.userService.updateStatus(userId);
      for (let i = 0; i < reponseRepondu.length; i++) {
        const item: any[] = reponseRepondu[i].reponses;
        for (let j = 0; j < item.length; j++) {
          createReponseRepondu.push({
            formulaireId: idFormulaire,
            title: item[j],
            questionId: parseInt(reponseRepondu[i].id),
            userId: userId,
          });
        }
      }
      this.reponseReponduService
        .createMultiple(idFormulaire, createReponseRepondu)
        .then((r) => console.log(r));
    }
  }

  @Post('/token/:idFormulaire')
  async getFormulaireToken(@Param('idFormulaire') idFormulaire: number) {
    const formulaire = await this.formulaireService.findOne(idFormulaire);
    if (formulaire.isValid) {
      return formulaire;
    } else {
      const token = this.authService.tokenFormulaire(idFormulaire);
      await this.formulaireService.valideFormulaire(idFormulaire, token);
      formulaire.token = token;
      formulaire.isValid = true;
      return formulaire;
    }
  }
}
