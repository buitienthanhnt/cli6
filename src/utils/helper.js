const formatDate = (date, type = 'en-US') => {
    try {
        const value = new Date(date).toLocaleDateString(type, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        return value;
    } catch (error) {}
    return date;
}

export {
    formatDate
}