const butInstall = document.getElementById('buttonInstall');

// Logic for handling the beforeinstallprompt event which allows us to show the install prompt
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt event fired');
    console.log("Event: " + event);
    event.preventDefault();  // Prevent the mini-infobar from appearing on mobile

    // Store the event so it can be triggered later.
    window.deferredPrompt = event;

    // Show the install button by removing the 'hidden' class
    butInstall.classList.toggle('hidden', false);
});

// Event listener for the install button
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        console.log('No deferred prompt to show.');
        return;
    }

    // Show the install prompt
    promptEvent.prompt();

    // Clear the deferred prompt so it can't be used again
    window.deferredPrompt = null;

    // Hide the install button
    butInstall.classList.toggle('hidden', true);
});

// Handler for the appinstalled event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA has been installed');
    // Clear the deferred prompt
    window.deferredPrompt = null;
});
