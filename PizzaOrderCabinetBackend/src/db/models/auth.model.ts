import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

export interface IUser {
    id: ObjectID | string
    username: string
    password: string
}

@Entity()
export class User implements IUser {
    @ObjectIdColumn()
    readonly id: ObjectID | string

    @Column()
    username: string;

    @Column()
    password: string;
}