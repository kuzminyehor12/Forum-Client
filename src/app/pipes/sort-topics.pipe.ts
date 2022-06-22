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
                return value.sort(t => t.publicationDate);
                break;
            case 2:
                return value.sort(t => t.likedByIds.count());
                break;
            default:
                return value;
                break;
        }
    }
}