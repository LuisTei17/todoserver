import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document, Schema as schema } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
    @Prop()
    name: string;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    id_user: {
        required: true,
        type: schema.Types.ObjectId,
        ref: "User"
    };  
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
    tasks: {
        required: true,
        type: schema.Types.ObjectId,
        ref: "Task"
    };  
}

export const ProjectSchema = SchemaFactory.createForClass(Project);