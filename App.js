'use strict';

import Source from './Source.js';
import Track from './Track.js';


export const context = new AudioContext();
export const main = document.querySelector('main');

const tracks = [];

const addTrack = document.querySelector('.add-track');
const playAll = document.querySelector('.play-all');
const dropContainer = document.querySelector('.drop__container');
const dropTarget = document.querySelector('.drop__target');

const createTrack = () => tracks.push(new Track());
const invalidAudio = () => alert('Invalid audio');
const compose = () => { tracks.forEach(track => track.play()); }

addTrack.addEventListener('click', () => {
    createTrack();
});

playAll.addEventListener('click', () => {
    tracks.forEach(track => {
        track.start();
    });
});

window.addEventListener('dragover', e => {
    e.preventDefault();

    //     dropContainer.classList.add('drop__container--visible');

    //     // Perf later, only add on drag start
    //     window.addEventListener('dragend', () => {
    //         dropContainer.classList.remove('drop__container--visible');
    //     }, {
    //         once: true
    //     });
});

window.addEventListener('drop', e => {
    e.preventDefault();
});