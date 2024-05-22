import Handlebars from 'handlebars';

Handlebars.registerHelper('eq', function(a, b) {
    // console.log(a, b);
    return a === b;
});

Handlebars.registerHelper('neq', function(a, b) {
    return a !== b;
});

Handlebars.registerHelper('lt', function(a, b) {
    return a < b;
});

Handlebars.registerHelper('gt', function(a, b) {
    return a > b;
});

Handlebars.registerHelper('and', function() {
    let args = Array.prototype.slice.call(arguments, 0, -1);
    let options = arguments[arguments.length - 1];

    for (let i = 0; i < args.length; i++) {
        if (!args[i]) {
            return options.inverse(this);
        }
    }

    return options.fn(this);
});

Handlebars.registerHelper('formatDate', function(date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
});

Handlebars.registerHelper('formatDateMMDDYYYY', function(date) {
    // Convert PostgreSQL date format to JavaScript Date object
    const jsDate = new Date(date);

    // Get month, day, and year components
    const month = String(jsDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because JavaScript months are zero-based
    const day = String(jsDate.getDate()).padStart(2, '0');
    const year = jsDate.getFullYear();

    // Construct the formatted date string in mm/dd/yyyy format
    return `${month}/${day}/${year}`;
});

export default Handlebars;

