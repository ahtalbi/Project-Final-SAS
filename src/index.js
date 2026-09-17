import { messages } from './messages.js';
import promptSync from 'prompt-sync';

// Constants
const prompt = promptSync({ sigint: true });

while (true) {
    console.log(messages.welcomeMessage)
    let n = prompt("Votre choix : ");
    

    console.log(n);
}