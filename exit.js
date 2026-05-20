(function () {

    function redirectUser() {
        window.location.replace("/error.mp3");
    }

    // Detect DevTools via window dimensions
    function detectWindowDevtools() {
        const widthThreshold = window.outerWidth - window.innerWidth > 150;
        const heightThreshold = window.outerHeight - window.innerHeight > 150;
        if(window.innerHeight == 300){
            return;
        }

        if (widthThreshold || heightThreshold) {
            redirectUser();
        }
    }

    // Detect debugger pause
    function detectDebugger() {
        const start = performance.now();

        debugger;

        const end = performance.now();

        if (end - start > 100) {
            redirectUser();
        }
    }

    // Disable right click
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });

    // Disable inspect shortcuts
    document.addEventListener("keydown", (e) => {

        // F12
        if (e.key === "F12") {
            e.preventDefault();
            redirectUser();
        }

        // Ctrl+Shift+I
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
            e.preventDefault();
            redirectUser();
        }

        // Ctrl+Shift+J
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") {
            e.preventDefault();
            redirectUser();
        }

        // Ctrl+U
        if (e.ctrlKey && e.key.toLowerCase() === "u") {
            e.preventDefault();
            redirectUser();
        }
    });

    setInterval(() => {
        detectWindowDevtools();
        detectDebugger();
    }, 1000);

})();
