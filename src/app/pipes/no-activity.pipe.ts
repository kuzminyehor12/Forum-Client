import { Pipe, PipeTransform } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Pipe({
    name: "noactivity",
    pure: false
})
export class NoActivityPipe implements PipeTransform{
    transform(value: any[], router: Router) {
        if(value.length === 0 || value === undefined){
            router.navigate(['topics']);
            Swal.fire({
              position: 'center',
              title: 'Info',
              text: 'Now you don`t have those activities. Create some topics or write any response.',
              icon: 'info',
              showCancelButton: false
            });
            return;
        }

        return value;
    }
}