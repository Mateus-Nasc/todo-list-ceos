export abstract class HashingService {
  abstract hash(senha: string): Promise<string>;
  abstract compare(senha: string, hash: string): Promise<boolean>;
}
