import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users.service';
import * as bcrypt from 'bcrypt';
import { recupererCatalogueKey } from '../../helpers/keys';
import { TokenexpireException } from '../../infrastructure/exceptions/tokenexpire-exception';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const argon2 = require('argon2');

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
  async signIn(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(login);
    if (!user) {
      throw new UnauthorizedException();
    }
    const match = await argon2.verify(user.password, pass);
    if (!match) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      role: user.role
    };
  }
  validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new TokenexpireException('Le token est expiré');
      }
    }
    /*.catch((error) => {
      console.error(error);
      if (error === 'jwt expired') {
        console.log('je suis dans le error');
        throw new TokenexpireException('Le token est expiré');
      }
    });*/
  }

  tokenAcceptDevis(idDevis: number) {
    const options = { expiresIn: '1h' };
    const payload = { sub: idDevis };
    return this.jwtService.sign(payload, options);
  }

  tokenFormulaire(idFormulaire: number) {
    const options = { expiresIn: '720h' };
    const payload = { sub: idFormulaire };
    return this.jwtService.sign(payload, options);
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  generateTokenCatalogue() {
    const key = recupererCatalogueKey();
    return this.jwtService.sign({}, { expiresIn: '1h' });
  }

  verifyTokenCatalogue(token: string) {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (e) {
      return false;
    }
  }
}
