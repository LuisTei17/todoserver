import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: String;

    @Prop()
    email: String;

    @Prop()
    pasword: String;

}

export const UserSchema = SchemaFactory.createForClass(User);