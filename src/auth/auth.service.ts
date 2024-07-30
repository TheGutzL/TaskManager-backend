import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const existingUserByUsername =
      await this.usersService.findOneByUsername(username);
    if (!existingUserByUsername)
      throw new UnauthorizedException('Invalid credentials');
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUserByUsername.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');
    const { password: userPassword, ...result } = existingUserByUsername;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = { ...createUserDto, password: hashedPassword };
    const userCreated = await this.usersService.create(user);
    return this.login(userCreated);
  }
}
