import { Controller, Get, Param, Res } from '@nestjs/common';
import * as path from 'path';
import { AuthService } from '../repositories/auth/auth.service';

@Controller('files')
export class ImagesController {
  constructor(private authService: AuthService) {}
  /*@Get(':imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res) {
    return of(res.sendFile(join(process.cwd(), 'uploads/users' + imagename)));
  }*/

  @Get('/catalogue/:token')
  serveCatalogueFile(@Param('token') token, @Res() res) {
    if (this.authService.verifyTokenCatalogue(token)) {
      console.log('accès aux fichiers');
      const filePath = path.join(
        __dirname,
        '..',
        '..',
        'uploads/catalogue-essitech.pdf',
      );
      res.sendFile(filePath);
    } else {
      res.status(401);
    }
  }
}
