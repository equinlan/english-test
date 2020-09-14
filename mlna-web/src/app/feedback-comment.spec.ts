import { FeedbackComment } from './feedback-comment';

describe('FeedbackComment', () => {
  it('should create an instance', () => {
    expect(new FeedbackComment('0', 'hello world')).toBeTruthy();
  });
});
