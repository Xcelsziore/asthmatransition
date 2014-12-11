from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def goal_new(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_8 = u'">\n            <h4><a href="#five-videos">Five Videos</a></h4>\n            <div class="objective_list">\n                <ul class="inline-list objective-list">\n                '
    constant_6 = u'<div class="goalpicker">\n    <h3>Start a new goal</h3>\n\n        <div class="small newgoal goal five_videos '
    constant_12 = u'">\n            <h4><a href="#five-exercises">Five Skills</a></h4>\n            <div class="objective_list">\n                <ul class="inline-list objective-list">\n                '
    constant_10 = u'\n                </ul>\n            </div>\n            <div class="info pos-right">\n                <p>Watch any five videos to complete this goal!</p>\n                <p>\n                    As you finish more of your\n                    goal, the goal icons will fill\n                    in until it\'s a solid bar.\n                </p>\n                <button class="simple-button action-gradient green">start it!</button>\n            </div>\n        </div>\n\n        <div class="small newgoal goal five_exercises '
    constant_14 = u'\n                </ul>\n            </div>\n            <div class="info pos-left">\n                <p>Complete any five skills!</p>\n                <p>\n                    As you finish more of your\n                    goal, the goal icons will fill\n                    in until it\'s a solid bar.\n                </p>\n                <button class="simple-button action-gradient green">start it!</button>\n            </div>\n        </div>\n\n        <div class="big newgoal goal custom">\n            <h4><a href="#custom-goal">Custom Goal</a></h4>\n            <ul class="inline-list objective-list">\n                <li class="objective" style="width: 16.67%;">\n                    <a class="objective simple-button action-gradient blue exercise" href="#">\n                        <span class="objective-description">Adding decimals</span>\n                    </a>\n                </li>\n                <li class="objective" style="width: 16.67%;">\n                    <a class="objective simple-button action-gradient blue exercise" href="#">\n                        <span class="objective-description">Multiplication 2</span>\n                    </a>\n                </li>\n                <li class="objective" style="width: 16.67%;">\n                    <a class="objective simple-button action-gradient blue exercise" href="#">\n                        <span class="objective-description">Arithmetic word problems 2</span>\n                    </a>\n                </li>\n                <li class="objective" style="width: 16.67%;">\n                    <a class="objective simple-button action-gradient blue video" href="#">\n                        <span class="objective-description">Algebra: graphing lines 1</span>\n                    </a>\n                </li>\n                <li class="objective" style="width: 16.67%;">\n                    <a class="objective simple-button action-gradient blue video" href="#">\n                        <span class="objective-description">Quadratic Equation part 2</span>\n                    </a>\n                </li>\n                <li class="objective" style="width: 16.67%;">\n                    <a class="objective simple-button action-gradient blue exercise" href="#" data-progress="0\n                        " style="border-right-style: none; border-right-width: initial; border-right-color: initial;"><span class="objective-description">Reading tables 2</span>\n                    </a>\n                </li>\n            </ul>\n\n            <div class="info pos-top">\n                <p>Custom goals can contain skills or videos that you pick yourself.</p>\n\n                <button class="simple-button action-gradient green">start it!</button>\n            </div>\n\n        </div>\n</div>\n'

    def constant_9(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'\n                    <li class="objective" style="width: 20%">\n                        <a class="objective simple-button action-gradient video blue" href="#">\n                            <span class="objective-description">Any video</span>\n                        </a>\n                    </li>\n                '

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        return result
    
    def constant_7(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'disabled'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        return result
    
    def constant_13(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'\n                    <li class="objective" style="width: 20%">\n                        <a class="objective simple-button action-gradient GoalObjectiveAnyExerciseProficiency blue" href="#">\n                            <span class="objective-description">Any skill</span>\n                        </a>\n                    </li>\n                '

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        return result
    
    def constant_11(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'disabled'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
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
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "hasVideo"))
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
    value = helper = helpers.get('repeat')
    if value is None:
        value = context.get('repeat')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, 5)
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_10)
    options = {'fn': partial(constant_11, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "hasExercise"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_12)
    options = {'fn': partial(constant_13, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('repeat')
    if value is None:
        value = context.get('repeat')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, 5)
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_14)
    return result
