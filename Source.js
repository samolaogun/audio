'use strict';

import Colors from './Colors.js';

export default class Source {
    constructor(track, sourceNode, duration, offset, name) {
        this.color = Colors[Math.floor(Math.random() * Colors.length)];
        this.name = name;
        this.sourceNode = sourceNode;
        this.duration = duration;
        this.offset = offset;

        // Append to back of track by default
        this.startTime = track.endTime;

        this.element = document.createElement('div');
        this.element.classList.add('track__source');
        this.element.style.width = `${duration}px`;
        this.element.style.maxWidth = `${duration}px`;
        // Linear gradient
        this.element.style.backgroundColor = this.color;

        // Add more performant version (FLIP) later
        // this.element.style.transform = t`translateX(${track.endTime}px)`;

        this.element.addEventListener('drag', function() {
            // Perform cross track things and in rearrangements
        });

        track.element.insertAdjacentElement('beforeend', this.element);
    }

    start() {
        this.sourceNode.start(this.offset);
    }
}