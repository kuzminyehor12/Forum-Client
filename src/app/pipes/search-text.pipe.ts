import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "searchPipe",
    pure: false
})
export class SearchTextPipe implements PipeTransform{
    transform(value: any[]) {
        if(localStorage.getItem('searchString') != null 
        && localStorage.getItem('searchString') != undefined
        && localStorage.getItem('searchString') != ''){
            return value.filter(t => t.title.toLowerCase().includes(localStorage.getItem('searchString')?.toLowerCase()));
        }

        return value;
    }
}