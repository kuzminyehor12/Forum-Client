import { Pipe, PipeTransform } from "@angular/core";
import { Topic } from "../models/topic.model";

@Pipe({
    name: "sorted",
    pure: false
})
export class SortingPipe implements PipeTransform{
    transform(value: any[], sorting: number) {
        switch (sorting) {
            case 1:
                return value.sort((t1, t2) => t2.publicationDate - t1.publicationDate);
                break;
            case 2:
                return value.sort((t1, t2) => t2.likedByIds.length - t1.likedByIds.length);
                break;
            default:
                return value;
                break;
        }
    }
}