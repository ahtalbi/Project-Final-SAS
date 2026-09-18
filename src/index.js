import { messages } from './messages.js';
import promptSync from 'prompt-sync';
import { validateChoice } from './validators.js';

// Constants
const prompt = promptSync();

while (true) {
    console.log(messages.welcomeMessage);
    let input = prompt("Votre choix : ");
    
    // check the input if its valid or no
    while (!validateChoice(input)) {
        input = prompt("invalid choice your choice need to be 0 => votre choix <= 9: ");
    }
    
    input = Number(input.trim());

    // switch case for the main app
    switch (input) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            break;
        case 8:
            break;
        case 9:
            break;
        default:
            process.exit();
    }
}