// Update the details on the card as the user fills in the fields

class CardDetailsUpdate {

    constructor(cardInputs) {
        this.cardInputs = cardInputs
    }

    initialize() {
        this.updateDetails()
    }

    updateDetails() {
        // Loop through <input> elements
        this.cardInputs.forEach(field => {

            // Listen to any changes in the value of the <input> elements
            field.addEventListener('input', () => {

                let valueToBeDisplayed;
                
                // When it comes to the Card Number, use Regex to modify the value (add a space after every 4 digits)
                if (field.dataset.cardInput === 'js-card-number') {
                    field.value = field.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim();
                    valueToBeDisplayed = field.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');

                // For all values other than the Card Number, keep the original value as it is    
                } else {
                    valueToBeDisplayed = field.value;
                }

                // Update the credit card details in the UI according to user input
                document.querySelector(`.${field.dataset.cardInput}`).innerText = valueToBeDisplayed;
            })
        })
    }
}

// Get all <input> elements related to the credit card details from the DOM
const cardInputs = document.querySelectorAll('[data-card-input]')

// Instantiate the `CardDetailsUpdate` class
const cardDetailsUpdate = new CardDetailsUpdate(cardInputs)

cardDetailsUpdate.initialize()