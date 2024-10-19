export function setParam(key: string, value: string) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url);
}
export function removeParam(key: string) {
    const url = new URL(window.location.href);
    url.searchParams.delete(key);
    window.history.pushState({}, '', url);
}