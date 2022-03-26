import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document, Schema as schema } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop()
    description: string;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Status' }] })
    id_status: {
        required: true,
        type: schema.Types.ObjectId,
        ref: "Status"
    };  
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] })
    id_project: {
        required: true,
        type: schema.Types.ObjectId,
        ref: "Project"
    };  
    @Prop()
    finished: Boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);