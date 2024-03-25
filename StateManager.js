// StateManager.js
export function saveState(state) {
    localStorage.setItem('spaceViewState', JSON.stringify(state));
}

export function loadState() {
    const state = localStorage.getItem('spaceViewState');
    return state ? JSON.parse(state) : null;
}
