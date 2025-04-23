// Stretching and Wobbling Configuration
const stretchConfig = {
	enabled: true,
	amplitude: 1.5,        // Base stretching amplitude
	frequency: 0.5,        // Wobble frequency
	timeScale: 0.003,      // Controls how fast the wobble moves
	noiseScale: 0.2,       // Additional randomness
	wobbleSpeed: 5,        // Speed of wobble movement
	stretchVariation: 0.3  // Variation in stretching between letters
};

function applyStretchAndWobble(coord, center, time, letterIndex) {
	// Create a unique offset for each letter to make wobbling individual
	const letterOffset = letterIndex * 0.5;

	// Calculate distance from center
	const dx = coord.x - center.x;
	const dy = coord.y - center.y;
	const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);

	// Generate wobble using time and coordinate
	const wobbleX = Math.sin(
		time * stretchConfig.wobbleSpeed +
		dx * stretchConfig.noiseScale +
		letterOffset
	);
	const wobbleY = Math.cos(
		time * stretchConfig.wobbleSpeed +
		dy * stretchConfig.noiseScale +
		letterOffset
	);

	// Calculate stretch factors
	const stretchFactorX = 1 + Math.sin(
		time * stretchConfig.timeScale + letterOffset
	) * stretchConfig.amplitude * (1 - distanceFromCenter / 100);

	const stretchFactorY = 1 + Math.cos(
		time * stretchConfig.timeScale + letterOffset
	) * stretchConfig.amplitude * (1 - distanceFromCenter / 100);

	// Apply wobble and stretch
	const warpedCoord = {
		x: coord.x + wobbleX * stretchConfig.frequency +
			(stretchFactorX - 1) * dx * stretchConfig.stretchVariation,
		y: coord.y + wobbleY * stretchConfig.frequency +
			(stretchFactorY - 1) * dy * stretchConfig.stretchVariation
	};

	return warpedCoord;
}

// Modify the main function to use the new stretching logic
export function main(coord, context, cursor, buffer) {
	const t = context.time * 0.001;

	// Word list and transition logic (keep existing word change mechanism)
	const word = updateCurrentWord(t);
	let displayedWord = word;

	// Transition logic (keep existing transition logic)
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

	// Scaling and positioning (keep existing scaling logic)
	const letterSize = 3;
	const letterWidth = 5;
	const letterHeight = 7;
	const letterSpacing = 2;
	const charWidth = letterWidth + letterSpacing;
	const totalWidth = displayedWord.length * charWidth - letterSpacing;

	// Update the text position (bouncing)
	updateTextPosition(t, context.cols, context.rows, totalWidth * letterSize, letterHeight * letterSize);

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

	// Trail effect setup
	const coordKey = `${Math.floor(coord.x)},${Math.floor(coord.y)}`;
	let trailCharacter = null;
	for (let trailIndex = 0; trailIndex < lastWarpedPositions.length; trailIndex++) {
		const trail = lastWarpedPositions[trailIndex];
		if (trail && trail.has(coordKey)) {
			const charIndex = Math.min(trailIndex, warpConfig.trailCharacters.length - 1);
			trailCharacter = warpConfig.trailCharacters[charIndex];
			break;
		}
	}

	// Calculate which letter and position within that letter
	const relativeX = coord.x - position.x;
	const relativeY = coord.y - position.y;

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

			// Apply stretch and wobble
			const currentCoord = { x: coord.x, y: coord.y };
			const warpedCoord = stretchConfig.enabled
				? applyStretchAndWobble(currentCoord, center, context.time, letterIndex)
				: currentCoord;

			// Recalculate relative coordinates after warping
			const newRelativeX = warpedCoord.x - position.x;
			const newRelativeY = warpedCoord.y - position.y;

			// Check if we're within a letter's bounds after warping
			const newLetterX = (newRelativeX - letterIndex * charWidth * letterSize) / letterSize;
			const newLetterY = newRelativeY / letterSize;

			// Check if we're within a letter's bounds
			if (newLetterX >= 0 && newLetterX < letterWidth &&
				newLetterY >= 0 && newLetterY < letterHeight &&
				letterBitmaps[letter]) {

				// Sample the bitmap
				const bit = sampleBitmap(letterBitmaps[letter], letterWidth, newLetterX, newLetterY);

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

	// Background character
	return ' ';
}
