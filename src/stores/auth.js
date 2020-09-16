import { writable } from 'svelte/store';

export const auth = writable(false);

export const user = writable({
    username: null,
    avatarUrl: null
})