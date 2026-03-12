import { Controller, BadRequestException, Get, Post, Body, Req, UseGuards, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AuthGuard } from '../auth/auth.guard';
import type { IAuthInfoRequest } from '../auth/auth.guard';
import { Account } from './accounts.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(AuthGuard)
  @Get('allAccounts')
  findAll(@Req() req: IAuthInfoRequest) {
    return this.accountsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('account/:name')
  findOne(@Req() req: IAuthInfoRequest, @Param('name') name: string) {
    return this.accountsService.findOne(name);
  }

  @UseGuards(AuthGuard)
  @Get('account/:accountId')
  findOneAccount(@Req() req: IAuthInfoRequest, @Param('accountId') accountId: number) {
    return this.accountsService.findOneAccount(accountId);
  }

  @UseGuards(AuthGuard)
  @Post('createAccount')
  create(@Req() req: IAuthInfoRequest, @Body() body: { name: string }) {
    if (!body || !body.name) {
      throw new BadRequestException('Le nom du groupe est requis');
    }
    const accountData = {
      name: body.name,
      creator: req.user.username
    };
    return this.accountsService.create(accountData as Account);
  }

  @UseGuards(AuthGuard)
  @Post('updateAccount')
  update(@Req() req: IAuthInfoRequest, @Body() account: Account) {
    return this.accountsService.update(account);
  }

  @UseGuards(AuthGuard)
  @Post('deleteAccount')
  delete(@Req() req: IAuthInfoRequest, @Body() accountId: number) {
    return this.accountsService.delete(accountId);
  }
}

