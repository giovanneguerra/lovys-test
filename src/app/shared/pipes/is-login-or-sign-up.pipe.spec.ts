import { IsLoginOrSignUpPipe } from './is-login-or-sign-up.pipe';

describe('IsLoginOrSignUpPipe', () => {
  it('create an instance', () => {
    const pipe = new IsLoginOrSignUpPipe();
    expect(pipe).toBeTruthy();
  });
});
