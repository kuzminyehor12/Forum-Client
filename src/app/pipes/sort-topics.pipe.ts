import { Pipe, PipeTransform } from "@angular/core";
import { Topic } from "../models/topic.model";

@Pipe({
    name: "sorted",
    pure: true
})
export class SortingPipe implements PipeTransform{
    transform(value: any[], sorting: any) {
        if(sorting === 1){
            value.sort((a: any, b: any) => {
                if (b.publicationDate < a.publicationDate) {
                  return -1;
                } else if (b > a) {
                  return 1;
                } else {
                  return 0;
                }
              });

            return value;
        }
        
        if(sorting === 2){
            value.sort((a: any, b: any) => {
                if (b.likedByIds.length < a.likedByIds.length) {
                  return -1;
                } else if (b > a) {
                  return 1;
                } else {
                  return 0;
                }
              });
              
            return value;
        }

        return value;
    }
}