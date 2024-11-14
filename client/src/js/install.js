const buttonInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-info bar from appearing on mobile
    event.preventDefault();
    
    // Stash the event so it can be triggered later
    let deferredPrompt = event;

    // Update UI to notify the user they can add to home screen
    const buttonInstall = document.getElementById('buttonInstall');
    buttonInstall.style.display = 'block';

    buttonInstall.addEventListener('click', () => {
        // Hide the button
        buttonInstall.style.display = 'none';
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});

// TODO: Implement a click event handler on the `butInstall` element
buttonInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
   return;
  }

  // Show prompt
  promptEvent.prompt();
  
  // Reset the deferred prompt variable, it can only be used once.
  window.deferredPrompt = null;
  
  buttonInstall.classList.toggle('hidden', true);
});



// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
