import { User } from '../../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  profile: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  telephone: string;

  @ApiProperty()
  role: 'INVESTIGATOR' | 'ADMIN';

  @ApiProperty()
  typeChurch: string;

  @ApiProperty()
  churchName: string;

  userConnected: string;

  conferenceId: string;

  public toEntity(): User {
    let userEntity: User;
    userEntity.name = this.name;
    userEntity.password = this.password;
    userEntity.profile = this.profile;
    userEntity.email = this.email;
    userEntity.telephone = this.telephone;
    return userEntity;
  }
}
