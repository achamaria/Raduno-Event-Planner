import { FormControl } from '@angular/forms';

export class UsernameValidator {

  // checks existing username
  static checkUsername(control: FormControl): any {

    return new Promise(resolve => {

      //Fake a slow response from server

      setTimeout(() => {
        if(control.value === "dhruti"){

          resolve({
            "username taken": true
          });

        } else {
          resolve(null);
        }
      }, 2000);

    });
  }

}
