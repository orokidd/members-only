const { format } = require("date-fns")

function formatDate(dateString) {
    return format(new Date(dateString), 'MMM dd, yyyy, HH:mm')
}

module.exports = formatDate