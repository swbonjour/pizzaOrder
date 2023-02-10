import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

export interface IOrder {
    id: ObjectID | string,
    name: string,
    size: string,
    dough: string,
    sideboard: string,
    topping: string,
    destination: string,
    additional: string,
    profileName: string,
    profileImg: string,
    profileID: string,
    status: 'Accepted' | 'Cooking' | 'Delivering' | 'Delivered' | 'Canceled'
}

@Entity()
export class Order implements IOrder {
    @ObjectIdColumn()
    readonly id: ObjectID

    @Column()
    name: string
    
    @Column()
    size: string

    @Column()
    dough: string

    @Column()
    sideboard: string

    @Column()
    topping: string

    @Column()
    destination: string

    @Column()
    additional: string

    @Column()
    profileName: string

    @Column()
    profileImg: string

    @Column()
    profileID: string;
    
    @Column()
    status: 'Accepted' | 'Cooking' | 'Delivering' | 'Delivered' | 'Canceled';
}