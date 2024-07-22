import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Twilio } from "twilio";

@Injectable()
export class MailsService {
  constructor(private readonly mailerService: MailerService) { }
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


  async sendWhatsappFormulaireRespondent(tel: string, token) {
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.TOKEN;
    const url = process.env.SERVER_FRONT_URL;
    const link = `${url}?token=${token}`
    if (!accountSid || !authToken) {
      console.error(`Twilio Account SID and Auth Token must be set in environment variables`);
      return;
    }

    const client = new Twilio(accountSid, authToken);

    try {
      const message = await client.messages.create({
        from: `whatsapp:+16508668156`, // Votre numéro WhatsApp Twilio
        contentSid: `HX5c24ec0ce7a5e40b0d2e0c2224fbd918`,
        messagingServiceSid: "MG999867d1dd490d8948686ed53c6a4fdb",
        contentVariables: JSON.stringify({ 1: link }),
        to: `whatsapp:${tel}`, // Numéro de téléphone du destinataire

      });


      console.log(message.body);
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
    }
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




  async sendWhatsappAcceptToAnswer(tel: string, token: string) {
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.TOKEN;
    const url = process.env.SERVER_FRONT_URL_ANSWER_FORM;
    const link = `${url}?token=${token}`;
    if (!accountSid || !authToken) {
      console.error(`Twilio Account SID and Auth Token must be set in environment variables`);
      return;
    }

    const client = new Twilio(accountSid, authToken);

    try {
      const message = await client.messages.create({
        from: `whatsapp:+16508668156`, // Votre numéro WhatsApp Twilio
        contentSid: `HX3aecce30f47395d2129f6e2bd870dac3`,
        messagingServiceSid: "MG999867d1dd490d8948686ed53c6a4fdb",
        contentVariables: JSON.stringify({ 1: link }),
        to: `whatsapp:${tel}`, // Numéro de téléphone du destinataire

      });

    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
    }
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
