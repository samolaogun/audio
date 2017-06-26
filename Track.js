'use strict';

import { context, main } from './App.js';
import Source from './Source.js';

// Create wave from buffers, layer (unary or) when necessary
// do wave buffer in wasm and javascrip typed array

export default class Track {
    constructor() {
        // Consolidate nodes to one gain node
        this.context = new AudioContext();

        this.gainNode = this.context.createGain();
        this.gainNode.gain.value = .5;
        this.gainNode.connect(this.context);

        this.context.connect(context.destination);

        this.endTime = 0;
        this.pixelSecondRatio = 1;
        this.sources = [];

        this.element = document.createElement('div');
        this.element.classList.add('track');
        main.insertAdjacentElement('beforeend', this.element);

        this.element.addEventListener('drop', async e => {
            e.preventDefault();

            if (!e.dataTransfer)
                return;

            const file = await (async() => {
                const [item, ] = e.dataTransfer.items;
                const entry = item.webkitGetAsEntry();

                return await new Promise((...handlers) => { entry.file(...handlers); });
            })();

            if (!(/^audio/.test(file.type)))
                return invalidAudio();

            const source = context.createBufferSource();

            source.buffer = await new Promise((resolve, reject) => {
                const fileReader = new FileReader();

                fileReader.addEventListener('load', () => {
                    context.decodeAudioData(fileReader.result, resolve, reject);
                });

                fileReader.addEventListener('error', reject);
                fileReader.readAsArrayBuffer(file);
            });

            source.connect(context.destination);

            // Changed from buffer to source buffer
            this.addSource(source, source.buffer.duration, file.name);
        });
    }

    start() {
        // On drag, change offset
        this.sources.forEach(source => {
            // Play forever or stop at the end?
            source.start();
        });
    }

    addSource(source, duration, name) {
        // Tip: Use start and stop for layering
        this.sources.push(new Source(this, this.gainNode, duration, this.endTime, name));
        this.endTime += duration;
    }
}