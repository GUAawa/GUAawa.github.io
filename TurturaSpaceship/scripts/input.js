var MouseInput = {
    x: 0,
    y: 0,
    left: false,
    right: false,
    wheel: 0,
    init: function() {
        const canvas = document.getElementById('gameCanvas');
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            MouseInput.x = e.clientX - rect.left;
            MouseInput.y = e.clientY - rect.top;
        })
        canvas.addEventListener('mousedown', (e) => {
            if (e.button === 0) MouseInput.left = true;
            if (e.button === 2) MouseInput.right = true;
        })
        canvas.addEventListener('mouseup', (e) => {
            if (e.button === 0) MouseInput.left = false;
            if (e.button === 2) MouseInput.right = false;
        })
        canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        })
        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            MouseInput.wheel += e.deltaY;
            console.log(MouseInput.wheel);
        })
    }
}
var KeyboardInput = {
    init: function() {
        window.addEventListener('keydown', (e) => {
            KeyboardInput[e.key.toLowerCase()] = true;
        })
        window.addEventListener('keyup', (e) => {
            KeyboardInput[e.key.toLowerCase()] = false;
        })
    }
}