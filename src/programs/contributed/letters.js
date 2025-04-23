/**
 * @author Jeppe Marquardt (modified)
 * @title  Bouncing Text with Configurable Warp Points
 * @desc   Display bitmap letters that bounce around with configurable warp points
 */
import { drawInfo } from '../../modules/drawbox.js'
import { letterBitmaps } from './bitmaps.js'
export const settings = { fps: 60 }




// List of words to display
const wordList = [
	"JEPPE",
	"MARQUARDT",
	"DEV",
	"CREATIVE",
	"CODE",
	"MOTION"
];

// Define warp point types
const WARP_TYPE = {
	EDGE_RUNNER: 'edge_runner',   // Runs around edges
	VERTICAL: 'vertical',         // Moves up and down
	HORIZONTAL: 'horizontal',     // Moves left and right
	DIAGONAL: 'diagonal',         // Moves diagonally
	CIRCULAR: 'circular',         // Moves in a circle
	SPIRAL: 'spiral',             // Spiral in and out
	STATIONARY: 'stationary',     // Fixed position with pulsing effect
	CHAOTIC: 'chaotic',           // Random, unpredictable movements
	FOLLOW_TEXT: 'follow_text'    // Follows the text
};

// Global warp config
const warpConfig = {
	baseSpeed: 0.000001,      // Base speed for warp points
	strength: 0.5,            // Base warping intensity
	expansionStrength: 2.2,   // Base letter expansion effect
	maxTrailLength: 20,       // Trail length
	trailCharacters: ['0', "Q", '8', 'o', ':', '\"', ',', '.']
};

// Bounce configuration
const bounceConfig = {
	enabled: true,           // Enable/disable bouncing
	velocity: {
		x: 0.001,            // Initial X velocity
		y: 0.0007            // Initial Y velocity
	},
	randomBounce: true,      // Add randomness when bouncing
	speedVariation: 0.8      // Bounce variation amount (0-1)
};

// ==========================================
// WARP POINT CONFIGURATION
// ==========================================
// Define which warp points to create and their properties

const warpPointsConfig = [
	// Edge runner warp point
	//{
	//	type: WARP_TYPE.EDGE_RUNNER,
	//	speed: warpConfig.baseSpeed * 1.0,    // Normal speed
	//	strength: warpConfig.strength * 1.0,  // Normal strength
	//	expansion: warpConfig.expansionStrength * 1.0,
	//	symbol: '*',                          // Symbol for visualization
	//	active: true                         // Whether this warp point is active
	//},

	// Vertical warp point
	{
		type: WARP_TYPE.VERTICAL,
		speed: warpConfig.baseSpeed * 1.2,    // 20% faster
		strength: warpConfig.strength * 0.9,  // 10% weaker effect
		expansion: warpConfig.expansionStrength * 1.1,
		symbol: '◊',
		active: true,
		// Vertical-specific properties
		fixedX: 0.29,                         // Position at 75% of screen width
		amplitude: 0.99,                        // 40% of screen height
	},

	// Add more warp points here as needed
];

// Variables for word and transition management
let currentWord = "";
let wordChangeTime = 0;
let wordChangeDuration = 8; // Longer duration between word changes
let previousWord = "";
let transitionProgress = 1.0;
let transitionDuration = 2.5;
let letterTransitionOffsets = [];
let lastWarpedPositions = [];
let warpPoints = [];

// Text position tracking
let textPosition = {
	x: 0.2, // Start at 20% of screen width
	y: 0.2, // Start at 20% of screen height
	vx: bounceConfig.velocity.x,
	vy: bounceConfig.velocity.y,
	lastUpdate: 0
};

// Utility Functions
function sampleBitmap(bitmap, width, x, y) {
	const idx = Math.floor(y) * width + Math.floor(x);
	return (idx >= 0 && idx < bitmap.length) ? bitmap[idx] : 0;
}

function initializeWarpPoints(cols, rows) {
	warpPoints = [];

	// Create warp points based on configuration
	warpPointsConfig.forEach((config, index) => {
		// Create base warp point with common properties
		const warpPoint = {
			type: config.type,
			speed: config.speed,
			strength: config.strength,
			expansionStrength: config.expansion,
			symbol: config.symbol,
			active: config.active !== undefined ? config.active : true,
			angle: Math.random() * Math.PI * 2,
			timeOffset: Math.random() * Math.PI * 2,

			// For positioning
			centerX: cols * (config.centerX !== undefined ? config.centerX : 0.5),
			centerY: rows * (config.centerY !== undefined ? config.centerY : 0.5),

			// Defaults for random movement
			dirX: (Math.random() - 0.5) * 2,
			dirY: (Math.random() - 0.5) * 2
		};

		// Add type-specific properties
		switch (config.type) {
			case WARP_TYPE.VERTICAL:
				warpPoint.amplitude = rows * (config.amplitude || 0.4);
				warpPoint.fixedX = cols * (config.fixedX || 0.25);
				break;

			case WARP_TYPE.HORIZONTAL:
				warpPoint.amplitude = cols * (config.amplitude || 0.4);
				warpPoint.fixedY = rows * (config.fixedY || 0.25);
				break;

			case WARP_TYPE.CIRCULAR:
				warpPoint.radius = Math.min(cols, rows) * (config.radius || 0.3);
				break;


			case WARP_TYPE.STATIONARY:
				// Set fixed position
				warpPoint.x = cols * (config.x || 0.5);
				warpPoint.y = rows * (config.y || 0.5);
				break;

		}

		warpPoints.push(warpPoint);
	});
}

function updateTextPosition(time, cols, rows, textWidth, textHeight) {
	// If bouncing is disabled, return immediately
	if (!bounceConfig.enabled) return;

	// Calculate time delta (use a default of 16ms if this is the first update)
	const delta = (textPosition.lastUpdate === 0) ? 0.016 : (time - textPosition.lastUpdate) / 1000; // convert to seconds
	textPosition.lastUpdate = time;

	// Define interpolation factor (adjust this to control smoothness)
	const lerpFactor = 0.05; // Lower values make movement smoother, higher make it more responsive

	// Calculate target position based on current velocity
	const targetX = textPosition.x + textPosition.vx * delta;
	const targetY = textPosition.y + textPosition.vy * delta;

	// Interpolate current position towards target position
	textPosition.x = lerp(textPosition.x, targetX, lerpFactor);
	textPosition.y = lerp(textPosition.y, targetY, lerpFactor);

	// Calculate text dimensions as fractions of total grid
	const textWidthFraction = textWidth / cols;
	const textHeightFraction = textHeight / rows;

	// Bounce logic with interpolation-friendly adjustments
	let bounced = false;

	// Left and right edge handling
	if (textPosition.x <= 0) {
		textPosition.x = 0;
		textPosition.vx = Math.abs(textPosition.vx);
		bounced = true;
	} else if (textPosition.x + textWidthFraction >= 1) {
		textPosition.x = 1 - textWidthFraction;
		textPosition.vx = -Math.abs(textPosition.vx);
		bounced = true;
	}

	// Top and bottom edge handling
	if (textPosition.y <= 0) {
		textPosition.y = 0;
		textPosition.vy = Math.abs(textPosition.vy);
		bounced = true;
	} else if (textPosition.y + textHeightFraction >= 1) {
		textPosition.y = 1 - textHeightFraction;
		textPosition.vy = -Math.abs(textPosition.vy);
		bounced = true;
	}

	// Add randomness to bounce if enabled and a bounce occurred
	if (bounced && bounceConfig.randomBounce) {
		const vxVariation = 1 + (Math.random() - 0.5) * bounceConfig.speedVariation;
		const vyVariation = 1 + (Math.random() - 0.5) * bounceConfig.speedVariation;

		textPosition.vx *= vxVariation;
		textPosition.vy *= vyVariation;

		// Add small cross-axis velocity variation
		textPosition.vx += (Math.random() - 0.5) * bounceConfig.velocity.x * 0.5;
		textPosition.vy += (Math.random() - 0.5) * bounceConfig.velocity.y * 0.5;
	}
}

// Linear interpolation helper function
function lerp(start, end, factor) {
	return start * (1 - factor) + end * factor;
}

function updateWarpPoints(time, cols, rows, textPosition) {
	warpPoints.forEach(point => {
		if (!point.active) return; // Skip inactive points

		point.angle += point.speed;
		const currentAngle = point.angle + (point.timeOffset || 0);

		// Update position based on warp point type
		switch (point.type) {
			case WARP_TYPE.EDGE_RUNNER:
				// Original edge-running behavior
				const t = (currentAngle % (Math.PI * 2)) / (Math.PI * 2);

				// Movement along the edges
				if (t < 0.25) { // Top edge: left to right
					point.x = t * 4 * cols;
					point.y = 0;
				} else if (t < 0.5) { // Right edge: top to bottom
					point.x = cols;
					point.y = (t - 0.25) * 4 * rows;
				} else if (t < 0.75) { // Bottom edge: right to left
					point.x = (1 - (t - 0.5) * 4) * cols;
					point.y = rows;
				} else { // Left edge: bottom to top
					point.x = 0;
					point.y = (1 - (t - 0.75) * 4) * rows;
				}
				break;

			case WARP_TYPE.VERTICAL:
				// Vertical up and down movement
				point.x = point.fixedX;
				point.y = point.centerY + Math.sin(currentAngle) * point.amplitude;
				break;

			case WARP_TYPE.HORIZONTAL:
				// Horizontal left and right movement
				point.x = point.centerX + Math.sin(currentAngle) * point.amplitude;
				point.y = point.fixedY || rows / 2;
				break;

			case WARP_TYPE.DIAGONAL:
				// Diagonal movement (bouncing across screen)
				const diagonal = (Math.sin(currentAngle) + 1) / 2; // 0 to 1
				point.x = diagonal * cols;
				point.y = diagonal * rows;
				break;

			case WARP_TYPE.CIRCULAR:
				// Circular movement around the center
				point.x = point.centerX + Math.cos(currentAngle) * point.radius;
				point.y = point.centerY + Math.sin(currentAngle) * point.radius;
				break;

			case WARP_TYPE.SPIRAL:
				// Spiral in and out from center
				const radiusFactor = (Math.sin(currentAngle * 0.25) + 1) / 2; // 0 to 1, slower oscillation
				const currentRadius = point.minRadius + radiusFactor * (point.maxRadius - point.minRadius);
				point.x = point.centerX + Math.cos(currentAngle) * currentRadius;
				point.y = point.centerY + Math.sin(currentAngle) * currentRadius;
				break;

			case WARP_TYPE.STATIONARY:
				// Fixed position with pulsing effect (no movement)
				// Position doesn't change, but the effect strength will pulse
				const pulseStrength = (Math.sin(currentAngle) + 1) / 2; // 0 to 1
				point.currentStrength = point.strength * (0.5 + pulseStrength); // 50% to 150% of base strength
				break;

			case WARP_TYPE.CHAOTIC:
				// Random movement with occasional direction changes
				if (Math.random() < 0.05) { // 5% chance to change direction
					point.dirX = (Math.random() - 0.5) * 2;
					point.dirY = (Math.random() - 0.5) * 2;
				}

				// Update position
				point.x += point.dirX;
				point.y += point.dirY;

				// Bounce off edges
				if (point.x < 0 || point.x > cols) {
					point.dirX *= -1;
					point.x = Math.max(0, Math.min(cols, point.x));
				}
				if (point.y < 0 || point.y > rows) {
					point.dirY *= -1;
					point.y = Math.max(0, Math.min(rows, point.y));
				}
				break;

			case WARP_TYPE.FOLLOW_TEXT:
				// Update orbit angle
				point.orbitAngle += point.orbitSpeed;

				// Calculate text center in screen coordinates
				const textCenterX = cols * textPosition.x;
				const textCenterY = rows * textPosition.y;

				// Calculate orbit position
				point.x = textCenterX + Math.cos(point.orbitAngle) * point.offsetX;
				point.y = textCenterY + Math.sin(point.orbitAngle) * point.offsetY;

				// Update pulse strength
				const followPulse = (Math.sin(currentAngle) + 1) / 2; // 0 to 1
				point.currentStrength = point.strength * (0.7 + followPulse * 0.6); // 70% to 130% of base strength
				break;
		}
	});

	return warpPoints;
}

function updateCurrentWord(time) {
	// Check if it's time to change words
	if (time - wordChangeTime > wordChangeDuration || currentWord === "") {
		// Save the previous word
		previousWord = currentWord;
		// Select a random word from the list
		const randomIndex = Math.floor(Math.random() * wordList.length);
		currentWord = wordList[randomIndex];
		// Avoid repeating the same word
		if (currentWord === previousWord && wordList.length > 1) {
			const newIndex = (randomIndex + 1) % wordList.length;
			currentWord = wordList[newIndex];
		}
		// Reset transition progress
		transitionProgress = 0.0;
		// Set up randomized offsets for staggered letter transitions
		letterTransitionOffsets = [];
		for (let i = 0; i < Math.max(currentWord.length, previousWord.length); i++) {
			letterTransitionOffsets.push(Math.random() * 0.3);
		}
		wordChangeTime = time;
	}
	// Update transition progress
	if (transitionProgress < 1.0) {
		transitionProgress = Math.min(1.0, (time - wordChangeTime) / transitionDuration);
	}
	return currentWord;
}

function applyWarp(coord, center, warpPoints, wordPosition, letterWidth, letterHeight, letterSize) {
	let finalWarpedCoord = { x: coord.x, y: coord.y };

	// Combine effects from multiple warp points
	warpPoints.forEach(warpPoint => {
		if (!warpPoint.active) return; // Skip inactive warp points

		// Vector from center to coord
		const dx = coord.x - center.x;
		const dy = coord.y - center.y;

		// Vector from center to warp point
		const wx = warpPoint.x - center.x;
		const wy = warpPoint.y - center.y;

		// Calculate distance from center (normalized)
		const dist = Math.sqrt(dx * dx + dy * dy);
		const maxDist = Math.sqrt(center.x * center.x + center.y * center.y);
		const normalizedDist = dist / maxDist;

		// Get the current strength (used for pulsing points)
		const strength = warpPoint.currentStrength || warpPoint.strength;

		// Calculate warping amount based on distance from center
		const warpAmount = normalizedDist * strength;

		// Apply basic warping
		const warpedCoord = {
			x: finalWarpedCoord.x + wx * warpAmount,
			y: finalWarpedCoord.y + wy * warpAmount
		};

		// Calculate expansion factor
		const distToWarp = Math.sqrt(
			Math.pow(finalWarpedCoord.x - warpPoint.x, 2) +
			Math.pow(finalWarpedCoord.y - warpPoint.y, 2)
		);

		// Normalize the distance relative to the screen size
		const screenDiagonal = Math.sqrt(
			Math.pow(center.x * 2, 2) +
			Math.pow(center.y * 2, 2)
		);
		const normalizedDistToWarp = distToWarp / screenDiagonal;

		// Calculate expansion factor - more expansion when closer to warp point
		const expansionFactor = 1 + warpPoint.expansionStrength * (1 - Math.min(1, normalizedDistToWarp * 2));

		// Find the center of the word area
		const wordCenter = {
			x: wordPosition.x + (letterWidth * letterSize) / 2,
			y: wordPosition.y + (letterHeight * letterSize) / 2
		};

		// Vector from word center to warped coordinate
		const wcToCx = warpedCoord.x - wordCenter.x;
		const wcToCy = warpedCoord.y - wordCenter.y;

		// Apply the expansion
		finalWarpedCoord = {
			x: wordCenter.x + wcToCx * expansionFactor,
			y: wordCenter.y + wcToCy * expansionFactor
		};
	});

	return finalWarpedCoord;
}

export function main(coord, context, cursor, buffer) {
	const t = context.time * 0.001;

	// Initialize warp points on first run
	if (!buffer._warpPointsInitialized) {
		initializeWarpPoints(context.cols, context.rows);
		buffer._warpPointsInitialized = true;
	}

	// Word list and transition logic
	const word = updateCurrentWord(t);
	let displayedWord = word;

	// Transition logic
	if (transitionProgress < 1.0 && previousWord) {
		let blendedWord = "";
		const maxLength = Math.max(word.length, previousWord.length);
		for (let i = 0; i < maxLength; i++) {
			const letterProgress = transitionProgress - (letterTransitionOffsets[i] || 0);
			if (i >= word.length) {
				blendedWord += letterProgress < 0.5 ? previousWord[i] : " ";
			} else if (i >= previousWord.length) {
				blendedWord += letterProgress > 0.5 ? word[i] : " ";
			} else {
				blendedWord += letterProgress < 0.5 ? previousWord[i] : word[i];
			}
		}
		displayedWord = blendedWord;
	}

	// Scaling and positioning
	const letterSize = 3;
	const letterWidth = 5;
	const letterHeight = 7;
	const letterSpacing = 2;
	const charWidth = letterWidth + letterSpacing;
	const totalWidth = displayedWord.length * charWidth - letterSpacing;

	// Update the text position (bouncing)
	//updateTextPosition(t, context.cols, context.rows, totalWidth * letterSize, letterHeight * letterSize);

	// Calculate actual position based on normalized position
	const position = {
		x: Math.floor(context.cols * textPosition.x),
		y: Math.floor(context.rows * textPosition.y)
	};

	// Center of text
	const center = {
		x: position.x + (totalWidth * letterSize) / 2,
		y: position.y + (letterHeight * letterSize) / 2
	};

	// Update multiple warp points
	const warpPts = updateWarpPoints(t, context.cols, context.rows, textPosition);

	// Apply warping with multiple points
	const currentCoord = { x: coord.x, y: coord.y };
	const warpedCoord = applyWarp(currentCoord, center, warpPts, position, totalWidth, letterHeight, letterSize);

	// Trail effect
	const coordKey = `${Math.floor(coord.x)},${Math.floor(coord.y)}`;
	let trailCharacter = null;

	// Loop through saved trail positions
	for (let trailIndex = 0; trailIndex < lastWarpedPositions.length; trailIndex++) {
		const trail = lastWarpedPositions[trailIndex];
		if (trail && trail.has(coordKey)) {
			// Determine trail character based on age
			const charIndex = Math.min(trailIndex, warpConfig.trailCharacters.length - 1);
			trailCharacter = warpConfig.trailCharacters[charIndex];
			break;
		}
	}

	// Calculate which letter and position within that letter
	const relativeX = warpedCoord.x - position.x;
	const relativeY = warpedCoord.y - position.y;

	// Only process if we're in the word area
	if (relativeX >= 0 && relativeY >= 0 &&
		relativeX < totalWidth * letterSize &&
		relativeY < letterHeight * letterSize) {
		// Which letter are we in?
		const letterIndex = Math.floor(relativeX / (charWidth * letterSize));

		// Only continue if we're within the text bounds
		if (letterIndex >= 0 && letterIndex < displayedWord.length) {
			const letter = displayedWord[letterIndex];

			// Position within the current letter
			const letterX = (relativeX - letterIndex * charWidth * letterSize) / letterSize;
			const letterY = relativeY / letterSize;

			// Check if we're within a letter's bounds
			if (letterX >= 0 && letterX < letterWidth &&
				letterY >= 0 && letterY < letterHeight &&
				letterBitmaps[letter]) {
				// Sample the bitmap
				const bit = sampleBitmap(letterBitmaps[letter], letterWidth, letterX, letterY);
				if (bit) {
					// Mark this location for the next frame's trail positions
					if (!buffer._currentPositions) {
						buffer._currentPositions = new Set();
					}
					buffer._currentPositions.add(coordKey);
					// Current letter is always a plus sign
					return '+';
				}
			}
		}
	}

	// Show trail character if we're in a trail position
	if (trailCharacter) {
		return trailCharacter;
	}

	// Draw the warp points for visualization
	const warpPointRadius = 2;
	for (const warpPt of warpPts) {
		if (warpPt.active &&
			Math.abs(coord.x - warpPt.x) <= warpPointRadius &&
			Math.abs(coord.y - warpPt.y) <= warpPointRadius) {
			return warpPt.symbol || '*'; // Use the warp point's symbol
		}
	}

	// Background character
	return ' ';
}

export function post(context, cursor, buffer) {
	// Update the trail history
	if (buffer._currentPositions) {
		// Add current positions to trail
		lastWarpedPositions.unshift(buffer._currentPositions);
		buffer._currentPositions = null;
		// Limit trail length
		if (lastWarpedPositions.length > warpConfig.maxTrailLength) {
			lastWarpedPositions.pop();
		}
	}

}
