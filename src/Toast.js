/**
 * @fileoverview A custom Web Component for displaying transient toast notifications.
 * @module Toast
 * @description This component manages the lifecycle, rendering, and removal of toast messages
 *              without relying on external CSS frameworks or libraries.
 */

/**
 * Custom element representing a toast notification container.
 * Usage: <toast-container></toast-container>
 * @extends HTMLElement
 */
class Toast extends HTMLElement {
    /**
     * Constructor for the Toast component.
     * Attaches basic structure and sets up event listeners.
     */
    constructor() {
        super();
        // Use Shadow DOM for encapsulation to prevent style leakage.
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    /**
     * Renders the initial structure inside the Shadow DOM.
     * This structure will be updated when a toast message is displayed.
     */
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Basic styling for the toast container */
                :host {
                    display: block;
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1000;
                    pointer-events: none; /* Allows clicks to pass through if needed */
                }
                .toast-message {
                    background-color: #333;
                    color: black;
                    padding: 16px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    margin-bottom: 15px;
                    max-width: 300px;
                    opacity: 0;
                    transform: translateX(100%);
                    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
                    pointer-events: auto; /* Make the toast itself clickable/interactive */
                }
                .toast-message.show {
                    opacity: 1;
                    transform: translateX(0);
                }
                .toast-type-success { background-color: rgb(130, 200, 156); }
                .toast-type-error   { background-color: rgb(151,94,92); }
                .toast-type-info    { background-color: rgb(222,225,232); }
            </style>
            <div class="toast-container">
                <!-- Toasts will be appended here -->
            </div>
        `;
    }

    /**
     * Displays a toast message. This method should be called by external scripts.
     * @param {string} message - The text content of the toast.
     * @param {string} [type='info'] - The type of toast (e.g., 'success', 'error', 'info').
     * @param {number} [duration=3000] - How long the toast should display in milliseconds.
     * @returns {function} A cleanup function that dismisses the toast immediately.
     */
    showToast(message, type, duration = 3000) { // 3 seconds default
        const container = this.shadowRoot.querySelector('.toast-container');
        if (!container) {
            console.error("Toast container not found in Shadow DOM.");
            return () => {};
        }

        // 1. Create the toast element
        const toastElement = document.createElement('div');
        toastElement.className = `toast-message toast-type-${type}`;
        toastElement.textContent = message;

        // 2. Append and trigger animation
        container.appendChild(toastElement);

        // Force reflow to ensure transition works from the start state
        requestAnimationFrame(() => {
            toastElement.classList.add('show');
        });

        // 3. Set up auto-dismissal
        const dismissTimeout = setTimeout(() => {
            this.dismissToast(toastElement);
        }, duration);

        // 4. Return a cleanup function to allow manual dismissal
        return () => {
            clearTimeout(dismissTimeout);
            this.dismissToast(toastElement);
        };
    }

    /**
     * Handles the visual removal and cleanup of a single toast element.
     * @param {HTMLElement} toastElement - The toast element to dismiss.
     */
    dismissToast(toastElement) {
        // Start fade-out animation
        toastElement.classList.remove('show');

        // Wait for the transition to finish before removing from DOM
        toastElement.addEventListener('transitionend', function onTransitionEnd() {
            toastElement.remove();
            // Clean up the event listener to prevent memory leaks
            toastElement.removeEventListener('transitionend', onTransitionEnd);
        }, { once: true });
    }
}

// Define the custom element so it can be used in HTML
customElements.define('toast-container', Toast);