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

export default Handlebars;

