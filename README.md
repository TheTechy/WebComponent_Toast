# Toast Notification Web Component

A lightweight, framework-agnostic custom Web Component for displaying elegant toast notifications. Built with vanilla JavaScript using Shadow DOM for style encapsulation, with no external dependencies.

## Features

- **Beautiful Design** – Modern UI with smooth animations and customizable styling
- **Lightweight** – Minimal code footprint, no external dependencies
- **Easy to Use** – Simple API with sensible defaults
- **Performance Optimized** – Efficient animations using CSS transitions and `requestAnimationFrame`
- **Encapsulated Styles** – Shadow DOM prevents style conflicts with your application
- **Responsive** – Works seamlessly across all modern browsers
- **Multiple Types** – Supports success, error, and info toast variants
- **Customizable Duration** – Set display time per toast or use defaults
- **Dismissible** – Automatic dismissal or programmatic control

## Quick Start

### 1. Include the Component

Add the script to your HTML file:

```html
<script src="./src/Toast.js"></script>
```

### 2. Add the Container

Place the component in your HTML:

```html
<toast-container id="toast-area"></toast-container>
```

### 3. Show Notifications

```javascript
const toastArea = document.getElementById('toast-area');

// Show a success toast (3 seconds default)
toastArea.showToast("Operation successful!", 'success', 3000);

// Show an error toast
toastArea.showToast("An error occurred!", 'error', 5000);

// Show an info toast
toastArea.showToast("Here's some information.", 'info', 2000);
```

## API Reference

### `showToast(message, type, duration)`

Displays a toast notification.

**Parameters:**
- `message` *(string, required)* – The notification text content
- `type` *(string, optional)* – Toast variant. Options: `'success'`, `'error'`, `'info'`. Default: `'info'`
- `duration` *(number, optional)* – Display time in milliseconds. Default: `3000`

**Returns:**
- A cleanup function that dismisses the toast immediately when called

**Example:**

```javascript
const cleanup = toastArea.showToast("Saving changes...", 'info', 4000);

// Dismiss manually if needed
cleanup();
```

### `dismissToast(toastElement)`

Internally handles the dismissal animation and DOM cleanup of a toast element. This is called automatically after the duration expires but can also be used for advanced use cases.

**Parameters:**
- `toastElement` *(HTMLElement)* – The toast DOM element to dismiss

## Toast Types

The component supports three toast types, each with distinct styling:

| Type | Usage | Appearance |
|------|-------|------------|
| `success` | Confirm successful operations | Green background |
| `error` | Display errors or warnings | Red background |
| `info` | General information messages | Blue background |

## Usage Examples

### Basic Setup

```html
<!DOCTYPE html>
<html>
<head>
    <script src="./src/Toast.js"></script>
</head>
<body>
    <button onclick="showSuccess()">Show Success</button>
    <toast-container id="toast-area"></toast-container>

    <script>
        const toastArea = document.getElementById('toast-area');

        function showSuccess() {
            toastArea.showToast("Success!", 'success', 3000);
        }
    </script>
</body>
</html>
```

### Manual Dismissal

```javascript
const cleanup = toastArea.showToast("Click the button to undo", 'info', 5000);

undoButton.addEventListener('click', () => {
    cleanup(); // Dismiss the toast programmatically
});
```

### Multiple Toasts

Toasts can be stacked. Each new toast is appended to the container and positioned independently.

```javascript
toastArea.showToast("First toast", 'info', 2000);
toastArea.showToast("Second toast", 'info', 2000);
toastArea.showToast("Third toast", 'info', 2000);
```

### Dynamic Messages

```javascript
function handleFileUpload(filename, success) {
    if (success) {
        toastArea.showToast(`✓ ${filename} uploaded successfully`, 'success', 3000);
    } else {
        toastArea.showToast(`✗ Failed to upload ${filename}`, 'error', 5000);
    }
}
```

## Component Structure

### Shadow DOM

The component uses Shadow DOM for style encapsulation, preventing CSS conflicts with the rest of your application. All toasts are rendered inside the Shadow DOM tree.

### Custom Element

The component is registered as `<toast-container>` and extends `HTMLElement`. You can have multiple instances on the same page if needed.

```html
<toast-container id="toast-main"></toast-container>
<toast-container id="toast-secondary"></toast-container>
```

## Styling

The component includes default styling with support for customization. You can override styles using CSS custom properties or target the component via CSS:

```css
toast-container {
    /* Adjust the positioning */
    --toast-top: 20px;
    --toast-right: 20px;
}
```

### Default Position

Toasts are positioned in the **top-right** corner of the viewport with `fixed` positioning. Modify the Shadow DOM styles to change position.

## Browser Support

- ✅ Chrome 63+
- ✅ Firefox 63+
- ✅ Safari 10.1+
- ✅ Edge 79+
- ✅ Opera 50+

Requires browser support for:
- [Web Components](https://caniuse.com/web-components)
- [Shadow DOM](https://caniuse.com/shadow-dom)
- [CSS Transitions](https://caniuse.com/css-transitions)

## Project Structure

```
WebComponent_Toast/
├── README.md              # This file
├── index.html             # Demo page with examples
└── src/
    └── Toast.js           # Web Component implementation
```

## Demo

Open `index.html` in your browser to see the component in action. The demo page includes:
- Three interactive buttons to trigger different toast types
- Pre-configured durations for each toast type
- Styled buttons with visual feedback

## Implementation Details

### Animation Flow

1. **Show Phase** – Toast slides in from the right with fade effect
2. **Display** – Toast remains visible for the specified duration
3. **Hide Phase** – Toast slides out to the right with fade effect
4. **Cleanup** – DOM element is removed after animation completes

### Performance Considerations

- Uses `requestAnimationFrame()` to ensure smooth animations
- CSS transitions for optimal performance (GPU-accelerated when possible)
- Event listeners are cleaned up automatically to prevent memory leaks
- Efficient Shadow DOM encapsulation minimizes layout recalculations

### Error Handling

If the toast container is not found in the Shadow DOM, the `showToast()` method returns an empty cleanup function and logs an error to the console.

## Customization

### Modifying Styles

Edit the Shadow DOM `<style>` section in `Toast.js`:

```javascript
.toast-message {
    background-color: #333;
    color: black;
    padding: 16px;
    border-radius: 8px;
    /* ... customize as needed ... */
}
```

### Adding Toast Types

Add new type styles to the Shadow DOM:

```javascript
.toast-type-warning { background-color: rgb(255, 193, 7); }
```

Then use it:

```javascript
toastArea.showToast("Warning!", 'warning', 3000);
```

## Accessibility

The component displays notifications as transient messages. For accessibility:
- Messages are visible with sufficient contrast
- Use clear, concise text in toast messages
- Provide important notifications through other means as well for users who may miss transient messages

## License

MIT License – Feel free to use this component in your projects.

## Contributing

Contributions, suggestions, and feedback are welcome! Feel free to fork and submit pull requests.

---

**Made with blood, sweat and more than a few tears – A simple, powerful toast notification component for modern web applications.**