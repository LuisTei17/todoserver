import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';

export type StatusDocument = Status & Document;

@Schema()
export class Status {
    @Prop()
    text: String;
    @Prop()
    color: {
        type: String,
        required: true,
        enum: ['red', 'green', 'yellow']
    };
    @Prop()
    finished: Boolean
}

export const StatusSchema = SchemaFactory.createForClass(Status);