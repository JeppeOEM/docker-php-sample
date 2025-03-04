<!DOCTYPE html>
<html>
<head>
  <title>Modular ASCII Animation System</title>
  <style>
    body {
      background-color: #000;
      color: #0f0;
      font-family: monospace;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      overflow: hidden;
    }
    #ascii-canvas {
      white-space: pre;
      font-size: 16px;
      line-height: 1;
      margin-top: 50px;
    }
    .controls {
      width: 80%;
      max-width: 600px;
      background: rgba(0, 0, 0, 0.7);
      padding: 15px;
      border-radius: 5px;
      border: 1px solid #0f0;
      margin-bottom: 20px;
    }
    .control-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .control-row label {
      display: flex;
      align-items: center;
      margin-right: 15px;
    }
    .controls input, .controls select {
      background: #000;
      color: #0f0;
      border: 1px solid #0f0;
      padding: 5px;
      margin-left: 5px;
    }
    .controls select {
      min-width: 150px;
    }
  </style>
</head>
<body>
  <div class="controls">
    <div class="control-row">
      <label>
        Animation Type:
        <select id="animation-select">
          <option value="sineWave">Sine Wave</option>
          <option value="doubleHelix">Double Helix</option>
          <option value="ripple">Ripple</option>
          <option value="rain">Matrix Rain</option>
          <option value="starfield">Starfield</option>
        </select>
      </label>
      <label>
        Character:
        <input type="text" id="character" value="*" maxlength="1">
      </label>
    </div>
    <div class="control-row">
      <label>
        Speed:
        <input type="range" id="speed" min="1" max="100" value="30">
      </label>
      <label>
        Amplitude:
        <input type="range" id="amplitude" min="1" max="20" value="10">
      </label>
    </div>
    <div class="control-row">
      <label>
        Frequency:
        <input type="range" id="frequency" min="1" max="20" value="5">
      </label>
      <label>
        Density:
        <input type="range" id="density" min="1" max="100" value="30">
      </label>
    </div>
  </div>
  <div id="ascii-canvas"></div>

  <script>
    // Core Animation System
    class AsciiAnimationSystem {
      constructor(canvasElement, width = 80, height = 25) {
        this.canvas = canvasElement;
        this.width = width;
        this.height = height;
        this.time = 0;
        this.animationFrameId = null;
        this.currentAnimation = null;
        this.params = {
          speed: 30,
          amplitude: 10,
          frequency: 5,
          character: '*',
          density: 30
        };
      }

      // Initialize the grid with empty spaces
      createGrid() {
        return Array(this.height).fill().map(() => Array(this.width).fill(' '));
      }

      // Update the canvas with the current grid
      updateCanvas(grid) {
        this.canvas.textContent = grid.map(row => row.join('')).join('\n');
      }

      // Set animation parameters
      setParams(params) {
        Object.assign(this.params, params);
      }

      // Set the current animation function
      setAnimation(animationFunc) {
        this.currentAnimation = animationFunc;
      }

      // Start the animation loop
      start() {
        if (!this.currentAnimation) {
          console.error("No animation function set");
          return;
        }

        const animate = () => {
          // Increment time based on speed
          this.time += this.params.speed / 500;
          
          // Create a fresh grid
          const grid = this.createGrid();
          
          // Call the current animation function with our parameters
          this.currentAnimation(grid, this.width, this.height, this.time, this.params);
          
          // Update the canvas with the new grid
          this.updateCanvas(grid);
          
          // Continue the animation loop
          this.animationFrameId = requestAnimationFrame(animate);
        };

        // Start the animation loop
        animate();
      }

      // Stop the animation
      stop() {
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
        }
      }

      // Restart the animation
      restart() {
        this.stop();
        this.start();
      }
    }

    // Animation Functions Library
    const animations = {
      // Simple Sine Wave
      sineWave: (grid, width, height, time, params) => {
        const { amplitude, frequency, character } = params;
        
        for (let x = 0; x < width; x++) {
          const sineValue = Math.sin((x * frequency / width + time) * 2 * Math.PI);
          const y = Math.floor((sineValue + 1) / 2 * (height - 1 - amplitude) + amplitude / 2);
          
          if (y >= 0 && y < height) {
            grid[y][x] = character;
          }
        }
      },
      
      // Double Helix
      doubleHelix: (grid, width, height, time, params) => {
        const { amplitude, frequency, character } = params;
        
        for (let x = 0; x < width; x++) {
          // First helix
          const sine1 = Math.sin((x * frequency / width + time) * 2 * Math.PI);
          const y1 = Math.floor((sine1 + 1) / 2 * (height - 1 - amplitude) + amplitude / 2);
          
          // Second helix, offset by half a cycle
          const sine2 = Math.sin((x * frequency / width + time + 0.5) * 2 * Math.PI);
          const y2 = Math.floor((sine2 + 1) / 2 * (height - 1 - amplitude) + amplitude / 2);
          
          if (y1 >= 0 && y1 < height) {
            grid[y1][x] = character;
          }
          
          if (y2 >= 0 && y2 < height) {
            grid[y2][x] = character;
          }
        }
      },
      
      // Ripple (expanding circles)
      ripple: (grid, width, height, time, params) => {
        const { amplitude, frequency, character } = params;
        const centerX = Math.floor(width / 2);
        const centerY = Math.floor(height / 2);
        
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            // Calculate distance from center
            const dx = (x - centerX) * 2 / width;
            const dy = (y - centerY) * 2 / height;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Create ripple effect
            if (Math.abs(Math.sin(distance * frequency - time) * amplitude) > 0.7) {
              grid[y][x] = character;
            }
          }
        }
      },
      
      // Matrix-style rain
      rain: (grid, width, height, time, params) => {
        const { density, character } = params;
        
        // Create persistent rain drops
        if (!animations.rainDrops) {
          animations.rainDrops = [];
          for (let i = 0; i < width * (density / 100); i++) {
            animations.rainDrops.push({
              x: Math.floor(Math.random() * width),
              y: Math.floor(Math.random() * height),
              speed: 0.5 + Math.random() * 1.5,
              length: 1 + Math.floor(Math.random() * 5)
            });
          }
        }
        
        // Update and draw each raindrop
        for (const drop of animations.rainDrops) {
          drop.y += drop.speed;
          
          // Wrap around when reaching bottom
          if (drop.y >= height) {
            drop.y = 0;
            drop.x = Math.floor(Math.random() * width);
          }
          
          // Draw the raindrop and its tail
          for (let i = 0; i < drop.length; i++) {
            const tailY = Math.floor(drop.y) - i;
            if (tailY >= 0 && tailY < height) {
              // Use fade effect for the tail
              const fadeChar = i === 0 ? character : '.';
              grid[tailY][drop.x] = fadeChar;
            }
          }
        }
      },
      
      // Moving starfield
      starfield: (grid, width, height, time, params) => {
        const { density, character } = params;
        
        // Create persistent stars if not existing
        if (!animations.stars) {
          animations.stars = [];
          const starCount = Math.floor(width * height * (density / 100) / 10);
          
          for (let i = 0; i < starCount; i++) {
            animations.stars.push({
              x: Math.random() * width,
              y: Math.random() * height,
              z: Math.random() * 3 + 1  // depth (affects speed)
            });
          }
        }
        
        // Center point for perspective
        const centerX = width / 2;
        const centerY = height / 2;
        
        // Update and draw each star
        for (const star of animations.stars) {
          // Move star toward viewer (increasing z creates perspective)
          star.z -= 0.01 * (params.speed / 30);
          
          // Reset star if it gets too close
          if (star.z <= 0) {
            star.x = Math.random() * width;
            star.y = Math.random() * height;
            star.z = 3;
          }
          
          // Calculate perspective position
          const perspective = 0.2 / star.z;
          const projectedX = centerX + (star.x - centerX) * perspective;
          const projectedY = centerY + (star.y - centerY) * perspective;
          
          // Draw star if it's in bounds
          const x = Math.floor(projectedX);
          const y = Math.floor(projectedY);
          
          if (x >= 0 && x < width && y >= 0 && y < height) {
            // Choose character based on apparent size (z-depth)
            const starChar = star.z < 1 ? '*' : '.'; 
            grid[y][x] = starChar;
          }
        }
      }
    };

    // Initialize elements
    const canvas = document.getElementById('ascii-canvas');
    const animationSelect = document.getElementById('animation-select');
    const speedControl = document.getElementById('speed');
    const amplitudeControl = document.getElementById('amplitude');
    const frequencyControl = document.getElementById('frequency');
    const characterControl = document.getElementById('character');
    const densityControl = document.getElementById('density');

    // Create animation system
    const system = new AsciiAnimationSystem(canvas);

    // Set up event listeners
    function updateAnimationParams() {
      system.setParams({
        speed: parseInt(speedControl.value),
        amplitude: parseInt(amplitudeControl.value),
        frequency: parseInt(frequencyControl.value) / 10,
        character: characterControl.value || '*',
        density: parseInt(densityControl.value)
      });
    }

    function changeAnimation() {
      const selectedAnimation = animationSelect.value;
      system.setAnimation(animations[selectedAnimation]);
      system.restart();
    }

    // Add event listeners to controls
    animationSelect.addEventListener('change', changeAnimation);
    speedControl.addEventListener('input', updateAnimationParams);
    amplitudeControl.addEventListener('input', updateAnimationParams);
    frequencyControl.addEventListener('input', updateAnimationParams);
    characterControl.addEventListener('input', updateAnimationParams);
    densityControl.addEventListener('input', updateAnimationParams);

    // Initialize with default animation
    updateAnimationParams();
    changeAnimation();

    // Handle window resize
    window.addEventListener('resize', () => {
      system.restart();
    });
  </script>
</body>
</html>
