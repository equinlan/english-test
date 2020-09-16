import { Challenge } from './challenge';

describe('Challenge', () => {
  it('should create an instance', () => {
    expect(new Challenge(0, ['0'])).toBeTruthy();
  });
});
