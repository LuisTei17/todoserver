import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';

export type StatusDocument = Status & Document;

@Schema()
export class Status {
    @Prop()
    text: string;
    @Prop()
    color: {
        type: string,
        required: true,
        enum: ['red', 'green', 'yellow']
    };
    @Prop()
    finished: Boolean
}

export const StatusSchema = SchemaFactory.createForClass(Status);