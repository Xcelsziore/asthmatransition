// Only include element attributes if they have a value.
// etymology: optional attribute -> opttribute -> opttr
// example:
// var template = Handlebars.compile("<div {{opttr id=id class=class}}></div>");
// template({id: 'foo'})
// => '<div id="foo"></div>'
Handlebars.registerHelper("opttr", function(options) {
    var attrs = [];
    _.each(options.hash, function(v, k) {
        if (v !== null && v !== undefined) {
            attrs.push(k + '="' + Handlebars.Utils.escapeExpression(v) + '"');
        }
    });
    return new Handlebars.SafeString(attrs.join(" "));
});

Handlebars.registerHelper("repeat", function(n, options) {
    var fn = options.fn;
    var ret = "";

    for (var i = 0; i < n; i++) {
        ret = ret + fn();
    }

    return ret;
});

/**
 * Usage:
    {{pluralize 1 "dog"}} ==> 1 dog
    {{pluralize 3 "dog"}} ==> 3 dogs
    {{pluralize 1 "person"}} ==> 1 person
    {{pluralize 5 "person"}} ==> 5 people

 * TODO(marcia): Unify w the real pluralize function in
 * /khan-exercises/utils/word-problems.js
 */
Handlebars.registerHelper("pluralize", function(num, word) {
    if (num === 1) {
        return num + " " + word;
    }

    var result = num + " ";

    if (word === "person") {
        result += "people";
    } else {
        result += word + "s";
    }

    return result;
});

Handlebars.registerHelper("reverseEach", function(context, block) {
    var result = "";
    for (var i = context.length - 1; i >= 0; i--) {
        result += block(context[i]);
    }
    return result;
});

/**
 * Render an exercise skill-bar with specified ending position and optional
 * starting position, exercise states, and whether or not proficiency was just
 * earned and should be animated.
 */
Handlebars.registerPartial("shared_small-exercise-icon", Templates.get("shared.small-exercise-icon"));
Handlebars.registerHelper("skill-bar", function(end, start, exerciseStates) {

    var template = Templates.get("shared.skill-bar"),
        context = _.extend({
                start: parseFloat(start) || 0,
                end: parseFloat(end) || 0
            }, 
            exerciseStates);
    
    return template(context);

}); 

/**
 * Return a bingo redirect url
 *
 * Sample usage:
 * <a href="{{toBingoHref "/profile" "conversion_name" "other_conversion_name"}}>
 */
Handlebars.registerHelper("toBingoHref", function(destination) {
    var conversionNames = _.toArray(arguments).slice(1, arguments.length - 1);

    return gae_bingo.create_redirect_url.call(null, destination, conversionNames);
});

Handlebars.registerHelper("multiply", function(num1, num2){
    return (num1 * num2)
});

Handlebars.registerHelper("toLoginRedirectHref", function(destination) {
    var redirectParam = "/postlogin?continue=" + destination;
    return "/login?continue=" + encodeURIComponent(redirectParam);
});

Handlebars.registerHelper("commafy", function(numPoints) {
    // From KhanUtil.commafy in math-format.js
    return numPoints.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,");
});

// Truncates the text and removes all HTML tags
Handlebars.registerHelper("ellipsis", function(text, length) {
    var textStripped = text.replace(/(<([^>]+)>)/ig,"");
    if (textStripped.length < length) {
        return textStripped;
    } else {
        return textStripped.substr(0, length-3) + "...";
    }
});

Handlebars.registerHelper("arrayLength", function(array) {
    return array.length;
});

