import { HashingService } from './hashing.service';
import * as bcrypt from 'bcryptjs';

export class BcryptService extends HashingService {
  async hash(senha: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(senha, salt);
    return hash;
  }
  async compare(senha: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(senha, passwordHash);
  }
}
