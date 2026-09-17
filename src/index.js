import { messages } from './messages.js';
import promptSync from 'prompt-sync';

const prompt = promptSync({ sigint: true });

while (true) {
    console.log(messages.welcomeMessage)
    let n = prompt();


console.log(n);
}