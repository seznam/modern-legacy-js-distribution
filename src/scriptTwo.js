// Nullish coalescing
const myMessage = Math.random() > .5 ? 'Hello there' : '';
const nullishCoalescingMessage = myMessage ?? 'Default message';
const orMessage = myMessage || 'Default message';

console.log({ nullishCoalescingMessage, orMessage });
