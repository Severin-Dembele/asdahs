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


  sendWhatsappFormulaireRespondent(tel: string, token, url, formulaire) {
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.TOKEN;

    if (!accountSid || !authToken) {
      console.error('Twilio Account SID and Auth Token must be set in environment variables');
      return;
    }

    const client = new Twilio(accountSid, authToken);

    // const message = client.messages.create({
    //   // body: `You have consented to participate in the research. By clicking on this link, you will have access to the form to respond. You may choose to respond partially and complete it as soon as possible, provided that you save each step. Please do not share this link with third parties. 
    //   //  \n ${url}?uuid=${formulaire}&token=${token}`,
    //   body:"Your Yummy Cupcakes Company order of 1 dozen frosted cupcakes has shipped and should be delivered on July 10, 2019. Details: http://www.yummycupcakes.com/",
    //   to: `whatsapp:${tel}`, // Use whatsapp: format for WhatsApp messages
    //   from: 'whatsapp:+22673616095', // Replace with your Twilio WhatsApp number
    // })
    //   .then((message) => console.log(message.sid))
    //   .catch((error) => console.error('Failed to send message:', error));
    // console.log(message)

    const message = client.messages.create({
      to: `whatsapp:${tel}`, // Use whatsapp: format for WhatsApp messages
      from: 'whatsapp:+22673616095', // Replace with your Twilio WhatsApp number
      // Use template-specific fields
      contentSid: 'HX1918e92a563498ecb4bc7e90c0c8a93e', // SID du template de contenu
      contentVariables: JSON.stringify({
        1: 'research', // Replace with actual variables used in your template
        2: `${url}?uuid=${formulaire}&token=${token}`, // Replace with actual variables used in your template
      }),
    })
      .then((message) => console.log(message.sid))
      .catch((error) => console.error('Failed to send message:', error));
    console.log(message);
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

  // sendWhatsappAcceptToAnswer(tel: string, token, url) {
  //   const accountSid = process.env.ACCOUNT_SID;
  //   const authToken = process.env.TOKEN;

  //   if (!accountSid || !authToken) {
  //     console.error('Twilio Account SID and Auth Token must be set in environment variables');
  //     return;
  //   }

  //   const client = new Twilio(accountSid, authToken);

  //   const message = client.messages.create({
  //     // body: `You are about to participate in the research dedicated to data collection for the Seventh-day Adventist health study. Please follow this link for the procedure.  \n ${url}?token=${token}`,
  //     body: "Your Yummy Cupcakes Company order of 1 dozen frosted cupcakes has shipped and should be delivered on July 10, 2019. Details: http://www.yummycupcakes.com/",
  //     to: `whatsapp:${tel}`, // Use whatsapp: format for WhatsApp messages
  //     from: 'whatsapp:+22673616095', // Replace with your Twilio WhatsApp number
  //   })
  //     .then((message) => console.log(message.sid))
  //     .catch((error) => console.error('Failed to send message:', error));
  //   console.log(message)
  // }


  async sendWhatsappAcceptToAnswer(tel: string, token: string, url: string) {
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.TOKEN;

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
        contentVariables: JSON.stringify({ 1: `Name` }),
        to: `whatsapp:${tel}`, // Numéro de téléphone du destinataire

      });

      console.log(message.body);
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
