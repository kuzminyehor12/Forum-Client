import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { Topic } from "../models/topic.model";

@Pipe({
    name: "dateConverter",
    pure: true
})
export class DateConverterPipe implements PipeTransform{
    transform(value: Date, format: string) {
        let pipe: DatePipe = new DatePipe('en-US');
        return pipe.transform(value, format);
    }
}