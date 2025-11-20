export const rules = {
    required: v => !!v || 'Required',
    minName: v => v.length >= 3 || 'Name must be at least 3 characters',
    email: v => /.+@.+\..+/.test(v) || 'Valid email required',
    minPassword: v => v.length >= 8 || 'Password must be at least 8 characters',
    matchPassword: v => v === form.password || 'Passwords must match'
}