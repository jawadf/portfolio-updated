// Reset the form when the user clicks "Continue" on the completed state

class ResetState {
    
    constructor(button, form, successSection) {
        this.button = button
        this.form = form
        this.successSection = successSection
    }

    initialize() {
        this.handleContinueButton()
    }

    /**
     * When user clicks on "Continue", reset the form fields 
     * and the UI Card, then show the form again
     */
    handleContinueButton() {
        let self = this;

        this.button.addEventListener('click', () => {
            self.form.reset(); // Reset values of all elements in the form
            self.resetCardToDefault(); // Reset UI Card data back to just zeros
            self.showForm(); // Show the form and hide the success message
        });
    }

    /**
     * Reset the details of the UI Credit Card to default values (zeros)
     */
    resetCardToDefault() {
        document.querySelector('.js-cardholder-name').innerText = "JANE APPLESEED";
        document.querySelector('.js-card-number').innerText = "0000 0000 0000 0000";
        document.querySelector('.js-card-expiry-month').innerText = "00";
        document.querySelector('.js-card-expiry-year').innerText = "00";
        document.querySelector('.js-card-cvc').innerText = "000";
    }

    /**
     * Show the form and hide the Success message
     */
    showForm() {
        this.successSection.classList.add('hidden');
        this.form.classList.remove('hidden');
    }
}

// Get the "Continue" button from the DOM
const continueButton = document.getElementById('continueButton');

// Get the card details <form> from the DOM
const targetForm = document.querySelector('.credit-card-form');

// Get the Completed State (Success) Section from the DOM
const success = document.querySelector('.success-section');

// Instantiate the `ResetState` class
const resetState = new ResetState(continueButton, targetForm, success)

resetState.initialize()