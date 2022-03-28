import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document, Schema as schema } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop()
    description: string;
    @Prop()
    finished: Boolean;
    @Prop()
    finishDate: Date;

}

export const TaskSchema = SchemaFactory.createForClass(Task);