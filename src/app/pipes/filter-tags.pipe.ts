import { Pipe, PipeTransform } from "@angular/core";
import { Topic } from "../models/topic.model";

@Pipe({
    name: "filterWithTags",
    pure: false
})
export class FilterWithTagsPipe implements PipeTransform{
    transform(value: any[], tagId: number) {
        if(tagId != null && tagId != undefined){
            return value.filter(t => t.topicTagIds.some((tt:any) => tt.tagId === tagId));
        }

        return value;
    }
}