export function toggleActive(event, active) {
    document.querySelector(`#${active}`).classList.toggle('active');
}