import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailsService {
  constructor(private readonly mailerService: MailerService) {}
  sendMailDownloadCatalogue(url: string, email: string): void {
    this.mailerService.sendMail({
      to: email,
      from: 'essitech@essitechgroup.com',
      subject: 'Catalogue Essitech',
      template: 'catalogue',
      context: {
        path: url,
      },
    });
  }

  sendMailCreateDevis(email: string, fullname: string) {
    this.mailerService.sendMail({
      to: email,
      from: 'essitech@essitechgroup.com',
      subject: 'Demande de devis',
      template: 'createdevis',
      context: {
        fullname: fullname,
      },
    });
  }

  sendMailAcceptDevis(email: string, fullname: string, token: string) {
    this.mailerService.sendMail({
      to: email,
      from: 'essitech@essitechgroup.com',
      subject: 'Acceptation de devis de formation',
      template: 'acceptdevis',
      context: {
        fullname: fullname,
        token: token,
      },
    });
  }

  sendMailCancelDevis(email: string, fullname: string) {
    this.mailerService.sendMail({
      to: email,
      from: 'essitech@essitechgroup.com',
      subject: 'Annulation de devis de formation',
      template: 'canceldevis',
      context: {
        fullname: fullname,
      },
    });
  }

  sendMailParticipant(email: string, fullname: string){
    this.mailerService.sendMail({
      to: email,
      from: 'essitech@essitechgroup.com',
      subject: 'Participation à la formation',
      template: 'participant',
      context: {
        fullname: fullname,
      },
    });
  }

  sendMailContact(email: string) {
    this.mailerService.sendMail({
      to: email,
      from: 'essitech@essitechgroup.com',
      subject: 'Essitech Contact',
      template: 'contact',
    });
  }

  sendMailInvestigator(email: string, token){
    this.mailerService.sendMail({
      to: email,
      from: 'essitech@essitechgroup.com',
      subject: 'Essitech Contact',
      template: 'investigator',
      context:{
        token: token
      }
    })
  }
}
