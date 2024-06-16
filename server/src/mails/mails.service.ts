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

  sendMailParticipant(email: string, fullname: string) {
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

  sendMailInvestigator(email: string, token) {
    this.mailerService.sendMail({
      to: email,
      from: 'essitech@essitechgroup.com',
      subject: 'Essitech Contact',
      template: 'investigator',
      context: {
        token: token,
      },
    });
  }

  sendMailFormulaireRespondent(email: string, token, url, formulaire) {
    this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL,
      subject: 'Formulaire',
      template: 'formulaire',
      context: {
        url: url,
        token: token,
        formulaire: formulaire,
      },
    });
  }

  sendMailAcceptToAnswer(email: string, token, url) {
    this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL,
      subject: 'Accept To answer form',
      template: 'respondent',
      context: {
        url: url,
        token: token,
      },
    });
  }

  sendMailPasswordToUser(email: string, password: string) {
    this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL,
      subject: 'User password',
      template: 'password',
      context: {
        password: password,
      },
    });
  }

  sendMailForResetPassword(email: string, otp) {
    this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL,
      subject: 'Reset password instructions',
      template: 'forgotpassword_en',
      context: {
        url: process.env.SERVER_FRONT_URL_RESET_PASSWORD,
        otp: otp,
      }
    });
  }
}
