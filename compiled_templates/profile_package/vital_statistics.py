from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def vital_statistics(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_6 = u'<div id="vital-statistics">\n    <div id="stats-charts" class="fancy-scrollbar -ce-capture">\n        <div id="graph-control-container">\n            <div id="graph-container">\n                <div class="vital-statistics-description">\n                    <div class="activity">\n                        Shows how much work you\'re doing each day.\n                        '
    constant_8 = u'\n                    </div>\n                    <div class="focus">\n                        Shows how well you\'ve focused on skills and topic areas.\n                        '
    constant_10 = u'\n                    </div>\n                    <div class="skill-progress">\n                        Shows which skills you\'ve worked on and completed.\n                        <span class="graph-options">\n                            <span class="progress-legend exercise-color started">Started</span>\n                            <span class="progress-legend exercise-color proficient">Proficient</span>\n                            <span class="progress-legend exercise-color review light">Review</span>\n                            <span class="progress-legend exercise-color struggling">Struggling</span>\n                        </span>\n                    </div>\n                    <div class="skill-progress-over-time">\n                        Shows how many skills you\'ve completed over time.\n                    </div>\n                    <div class="problems">\n                        Click a bar to view more detailed problem information.\n                    </div>\n                </div>\n                <div id="graph-progress-bar"></div>\n                <div id="graph-content"></div>\n            </div>\n        </div>\n    </div>\n</div>\n'

    def constant_9(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_7 = u'\n                        '
        constant_6 = u'\n                            '

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        inner = partials['profile_graph-date-picker']
        scope = Scope(context, context)
        result.grow(inner(scope, helpers=helpers, partials=partials))
        result.append(constant_7)
        return result
    
    def constant_7(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_7 = u'\n                        '
        constant_6 = u'\n                            '

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        inner = partials['profile_graph-date-picker']
        scope = Scope(context, context)
        result.grow(inner(scope, helpers=helpers, partials=partials))
        result.append(constant_7)
        return result
    
    # End constants
    result = strlist()
    if helpers is None: helpers = {}
    helpers.update(pybars['helpers'])
    if partials is None: partials = {}
    result.append(constant_6)
    options = {'fn': partial(constant_7, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('graph-date-picker-wrapper')
    if value is None:
        value = context.get('graph-date-picker-wrapper')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, graph="activity")
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_8)
    options = {'fn': partial(constant_9, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('graph-date-picker-wrapper')
    if value is None:
        value = context.get('graph-date-picker-wrapper')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, graph="focus")
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_10)
    return result
