const { format } = require("date-fns")

function formatDate(dateString) {
    return format(new Date(dateString), 'MMM dd, yyyy, hh:mm a')
}

module.exports = formatDate