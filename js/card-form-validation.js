class CardFormValidation {

    constructor(cardInputs, form, successSection, errorCount = 0) {
        this.cardInputs = cardInputs;
        this.form = form;
        this.successSection = successSection;
        this.errorCount = errorCount;
    }

    initialize() {
        this.handleFormSubmit();
    }

    /**
     * On Form Submit, reset the error counter, then validate
     * each form field and show success state if there are no errors
     */
    handleFormSubmit() {
        let self = this;

        // Listen to form submission
        this.form.addEventListener('submit', e => {
            e.preventDefault();

            this.errorCount = 0;

            // Loop through every <input> and call the validation function on it
            self.cardInputs.forEach(input => {
                self.validateInput(input);
            })

            // On success (no errors), show the completed state (success section)
            if(self.errorCount === 0) {
                self.form.classList.add('hidden');
                self.successSection.classList.remove('hidden');
            } 
        })
    }

    /**
     * Check if the input is not empty and has the correct format
     */
    validateInput(input) {
        let self = this;

        // Check if the input field is empty
        if (input.value.trim() === "") {
            this.setStatus(input, "Can't be blank", "error");
            self.errorCount++;
            return;
        } else {
            this.setStatus(input, null, "success");
        }

        // Check if numeric fields are in the correct format (only numbers)
        if (input.getAttribute('inputmode') === "numeric") {

            // Regex to check if it's only numbers and spaces
            const regex = /^[\d\s]+$/;

            if (regex.test(input.value)) {
                this.setStatus(input, null, "success");
            } else {
                this.setStatus(input, "Wrong format, numbers only", "error");
                self.errorCount++;
            }
        }
    }

    /**
     * This method handles the 2 possible scenarios after validation is done:
     * - Error exists: show an error message and red borders on the <input>
     * - No error: hide old error message if it exists and remove red borders from the <input>
     */
    setStatus(input, message, status) {
        const errorMessage = input.parentElement.querySelector('.error-message');

        // Handle success state
        if (status === "success") {

            // Hide previous error message
            if(errorMessage) {
                errorMessage.classList.add('hidden');
            }
        
            // Handle edge case (The expiry month and year have the same error message html element, so it should be visible if either one has an error)
            if(input.id === "expiryYear" && input.previousSibling.previousSibling.classList.contains('has-error')) {
                errorMessage.classList.remove('hidden');
            }

            // Remove red border from the <input>
            input.classList.remove('has-error');
        }

        // If ther is an error: show the error message + red borders on the <input>
        if (status === "error") {
            errorMessage.innerText = message;
            errorMessage.classList.remove('hidden');

            input.classList.add('has-error');
        }
    }
}

// Get all <input> elements related to the credit card details from the DOM
const inputs = document.querySelectorAll('[data-card-input]');

// Get the card details <form> from the DOM
const creditCardForm = document.querySelector('.credit-card-form');

// Get the Completed State (Success) Section from the DOM
const successSection = document.querySelector('.success-section');

// Instantiate the validator class
const formValidation = new CardFormValidation(inputs, creditCardForm, successSection);

formValidation.initialize();