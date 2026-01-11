import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(username: string, password: string) {
    const existing = await this.usersRepo.findOne({ where: { username } });
    if (existing) throw new BadRequestException('Username already taken');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ username, passwordHash });
    const saved = await this.usersRepo.save(user);

    return this.createToken(saved);
  }

  async login(username: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (!user.passwordHash) {
      throw new UnauthorizedException('This user must sign up again (no password set)');
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    return this.createToken(user);
  }

  async verifyToken(authHeader?: string) {
    const token = this.extractBearer(authHeader);
    if (!token) throw new UnauthorizedException('Missing token');
    return this.jwtService.verifyAsync(token);
  }

  private createToken(user: User) {
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, username: user.username },
    };
  }

  private extractBearer(authHeader?: string) {
    if (!authHeader) return undefined;
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') return undefined;
    return token;
  }
}
