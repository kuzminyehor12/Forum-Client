import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "pagination",
    pure: true
})
export class PaginationPipe implements PipeTransform{
    transform(value: any[], pageNumber: number, pageSize: 8) {
        return value.filter(i => value.indexOf(i) + 1 > ((pageNumber - 1) * pageSize)).slice(0, pageSize);
    }
}