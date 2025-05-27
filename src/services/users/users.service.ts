import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  private counterId = 2;
  private users: User[] = [
    {
      id: '1',
      name: 'User 1',
      email: 'user1@mail.com',
      password: 'password1',
    },
    {
      id: '2',
      name: 'User 2',
      email: 'user2@mail.com',
      password: 'password2',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException(`User #${id} not found`);

    return user;
  }

  create(data: any) {
    this.counterId++;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newUser: User = {
      id: this.counterId.toString(),
      ...data,
    };
    this.users.push(newUser);

    return newUser;
  }

  update(id: string, changes: any) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) throw new NotFoundException(`User #${id} not found`);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.users[index] = {
      ...this.users[index],
      ...changes,
    };

    return this.users[index];
  }

  delete(id: string) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) throw new NotFoundException(`User #${id} not found`);

    const deletedUser = this.users[index];
    this.users.splice(index, 1);

    return deletedUser;
  }
}
