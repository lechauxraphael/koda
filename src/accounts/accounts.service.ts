import { Injectable, ConflictException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './accounts.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

  async findAll(): Promise<Account[]> {
    return this.accountsRepository.find();
  }

  async findOne(name: string): Promise<Account | undefined> {
    const account = await this.accountsRepository.findOne({ where: { name } });
    return account ?? undefined;
  }

  async findOneAccount(userId: number): Promise<Account | undefined> {
    const account = await this.accountsRepository.findOne({
      where: { accountId: userId },
    });
    return account ?? undefined;
  }

  async create(account: Account): Promise<Account> {
    return this.accountsRepository.save(account);
  }

  async delete(accountId: number) {
    await this.accountsRepository.delete({ accountId });
  }
}
