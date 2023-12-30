import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isLoginOrSignUp',
  standalone: true,
})
export class IsLoginOrSignUpPipe implements PipeTransform {
  transform(isSignup: boolean, path?: boolean): string {
    if (path) {
      return isSignup ? '/login' : '/sign-up';
    }
    return isSignup ? 'Up' : 'In';
  }
}
