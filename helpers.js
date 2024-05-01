const Handlebars = require('handlebars');

Handlebars.registerHelper('eq', function(a, b) {
    console.log(a, b);
    return a === b;
});

module.exports = Handlebars;