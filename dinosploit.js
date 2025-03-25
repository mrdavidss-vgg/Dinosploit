// ==UserScript==
// @name         Dinosploit V1
// @namespace    https://dinosploit.pages.dev/
// @version      1
// @description  Dinosploit is a exploit that gives advance gameplay to others who dont wanna play normally.
// @author       You
// @match        https://chrome-dino-game.github.io/
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    function createUI() {
        // Create main UI container
        const ui = document.createElement('div');
        ui.style.position = 'fixed';
        ui.style.top = '20px';
        ui.style.left = '20px';
        ui.style.backgroundColor = 'rgba(165, 254, 151, 0.9)';
        ui.style.color = 'white';
        ui.style.padding = '10px';
        ui.style.borderRadius = '5px';
        ui.style.zIndex = '9999';
        ui.style.fontFamily = 'Arial, sans-serif';
        ui.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
        ui.style.cursor = 'grab';
        ui.style.userSelect = 'none';

        // Add title
        const title = document.createElement('div');
        title.textContent = 'DinoSploit V1';
        title.style.fontWeight = 'bold';
        title.style.marginBottom = '8px';
        title.style.textAlign = 'center';
        title.style.borderBottom = '1px solid rgba(255,255,255,0.2)';
        title.style.paddingBottom = '5px';
        ui.appendChild(title);

        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.flexDirection = 'column';
        buttonContainer.style.gap = '6px';
        ui.appendChild(buttonContainer);

        // Button 1: Set Running Speed
        const speedBtn = createButton('Set Running Speed', () => {
            const speed = prompt('Enter running speed (default is 10):', '30');
            if (speed !== null && !isNaN(speed)) {
                if (window.Runner && window.Runner.instance_) {
                    window.Runner.instance_.setSpeed(Number(speed));
                    showNotification(`Speed set to ${speed}`);
                } else {
                    showNotification('Game instance not found!');
                }
            }
        });
        buttonContainer.appendChild(speedBtn);

        // Button 2: Noclip (Can't Die)
        let noclipActive = false;
        const noclipBtn = createButton('Noclip (Can\'t Die)', () => {
            if (window.Runner && window.Runner.instance_) {
                noclipActive = !noclipActive;
                
                if (noclipActive) {
                    // Save original gameOver function
                    if (!window.Runner.instance_.originalGameOver) {
                        window.Runner.instance_.originalGameOver = window.Runner.instance_.gameOver;
                    }
                    // Override gameOver function
                    window.Runner.instance_.gameOver = function(){};
                    noclipBtn.style.backgroundColor = '#4CAF50';
                    showNotification('Noclip activated - you can\'t die!');
                } else {
                    // Restore original gameOver function
                    if (window.Runner.instance_.originalGameOver) {
                        window.Runner.instance_.gameOver = window.Runner.instance_.originalGameOver;
                    }
                    noclipBtn.style.backgroundColor = '';
                    showNotification('Noclip deactivated');
                }
            } else {
                showNotification('Game instance not found!');
            }
        });
        buttonContainer.appendChild(noclipBtn);

        // Add draggable functionality
        makeDraggable(ui);

        // Add UI to document
        document.body.appendChild(ui);

        // Create notification element
        const notification = document.createElement('div');
        notification.id = 'dinosploit-notification';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '10000';
        notification.style.display = 'none';
        notification.style.transition = 'opacity 0.5s';
        document.body.appendChild(notification);

        function showNotification(message) {
            notification.textContent = message;
            notification.style.display = 'block';
            notification.style.opacity = '1';
            
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 500);
            }, 2000);
        }
    }

    function createButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.style.padding = '6px 12px';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.backgroundColor = '#333';
        button.style.color = 'white';
        button.style.cursor = 'pointer';
        button.style.fontSize = '12px';
        button.style.transition = 'background-color 0.2s';
        
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#555';
        });
        
        button.addEventListener('mouseout', () => {
            if (!button.style.backgroundColor.includes('4CAF50')) {
                button.style.backgroundColor = '#333';
            }
        });
        
        button.addEventListener('click', onClick);
        
        return button;
    }

    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        element.onmousedown = dragMouseDown;
        
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves
            document.onmousemove = elementDrag;
        }
        
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }
        
        function closeDragElement() {
            // stop moving when mouse button is released
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    // Initialize UI when page loads
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(createUI, 100);
    } else {
        document.addEventListener('DOMContentLoaded', createUI);
    }
})();
