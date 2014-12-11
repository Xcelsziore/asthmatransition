from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def profile(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_8 = u'" class="profile-tab-avatar">\n            <span id="profile-tab-link" class="profile-tab-text">'
    constant_7 = u'" class="tab-link no-recolor active-tab" rel="profile">\n            <img src="'
    constant_6 = u'<style>\n  #page_sub_nav {\n    display: none;\n  }\n</style>\n\n<!-- If you drastically change the below nav, try to update the screenshots in coach.html. -->\n<menu class="profile-navigation">\n    <ul class="vertical-tab-list">\n        <li class="profile-tab"><a href="'
    constant_18 = u'discussion" class="tab-link has-icon no-recolor" rel="community discussion">Discussion</a></li>\n                '
    constant_13 = u'goals" class="tab-link has-icon no-recolor" rel="goals">Goals (beta)</a></li>\n            </ul>\n        </li>\n        <li>\n            <span class="inactive link-section-header">Vital statistics</span>\n            <ul class="vertical-tab-list second-tier">\n                <li><a href="'
    constant_12 = u'achievements" class="tab-link has-icon no-recolor" rel="achievements">Achievements</a></li>\n                <li><a href="'
    constant_11 = u'</span>\n        </a></li>\n        <li>\n            <span class="inactive link-section-header">Accomplishments</span>\n            <ul class="vertical-tab-list second-tier">\n                <li><a href="'
    constant_17 = u'vital-statistics/skill-progress-over-time" class="tab-link has-icon no-recolor" rel="vital-statistics skill-progress-over-time">Progress Over Time</a></li>\n            </ul>\n        </li>\n        <li>\n            <span class="inactive link-section-header">Community</span>\n            <ul class="vertical-tab-list second-tier">\n                <li><a href="'
    constant_15 = u'vital-statistics/focus" class="tab-link has-icon no-recolor" rel="vital-statistics focus">Focus</a></li>\n                <li><a href="'
    constant_14 = u'vital-statistics/activity" class="tab-link has-icon no-recolor" rel="vital-statistics activity">Activity</a></li>\n                <li><a href="'
    constant_30 = u'goals/completed" class="graph-link no-recolor">Completed</a>\n                    </li>\n                    <li class="type abandoned">\n                        <a href="'
    constant_31 = u'goals/abandoned" class="graph-link no-recolor">Abandoned</a>\n                    </li>\n                    <li>\n                        <a class="new-goal simple-button action-gradient disabled" href="javascript:void(0);">Create a new goal</a>\n                    </li>\n                </ul>\n            </div>\n            <div id="profile-goals-content"></div>\n        </div>\n        <div id="tab-content-coaches" rel="coaches">\n        </div>\n        <div id="tab-content-discussion" rel="discussion" style="width: 60%">\n            <div class="graph-picker">\n                Shows the questions that you\'ve asked.\n            </div>\n        </div>\n        <div id="tab-content-settings" rel="settings">\n        </div>\n    </div>\n</section>\n'
    constant_16 = u'vital-statistics/skill-progress" class="tab-link has-icon no-recolor" rel="vital-statistics skill-progress">Skill Progress</a></li>\n                <li><a href="'
    constant_23 = u'\n    </div>\n    <div class="clearfix">\n        <div id="tab-content-user-profile" rel="profile">\n            <div class="user-info-container"></div>\n            <div style="clear: both; margin-bottom: 20px;"></div>\n            '
    constant_20 = u'\n            </ul>\n        </li>\n    </ul>\n</menu>\n\n<section class="tab-content">\n    <h2 class="profile-sheet-title"></h2>\n    <div class="profile-notification">\n        '
    constant_26 = u'\n        </div>\n\n        <div id="tab-content-achievements" rel="achievements"'
    constant_25 = u'\n        </div>\n\n        <div id="tab-content-vital-statistics" rel="vital-statistics">\n            '
    constant_28 = u'>\n        </div>\n\n        <div id="tab-content-goals" rel="goals">\n            <div class="graph-picker">\n                Shows your current, completed and abandoned goals.\n                <ul class="tabrow">\n                    <li class="type current">\n                        <a href="'
    constant_29 = u'goals/current" class="graph-link no-recolor">Current</a>\n                    </li>\n                    <li class="type completed">\n                        <a href="'

    def constant_9(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        value = resolve(context, "profileData","","nickname")
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        return result
    
    def constant_19(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_7 = u'coaches" class="tab-link has-icon no-recolor" rel="community coaches">Coaches</a></li>\n                '
        constant_6 = u'\n                <li><a href="'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        value = helpers.get('profileRoot')
        if value is None:
            value = resolve(context, 'profileRoot')
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'profileRoot', )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_7)
        return result
    
    def constant_10(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'Profile'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        return result
    
    def constant_22(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'\n            <div class="public">\n                <h2>Oops, you\'re not allowed!</h2>\n                <p>To view real data, you must be a coach.</p>\n            </div>\n        '

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        return result
    
    def constant_21(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_7 = u'">Log in</a> to add a coach!</h2>\n            </div>\n            <div class="no-discussion">\n                <h2><a href=\'/#browse\'>Watch a video</a> and join the discussion!</h2>\n                <p>Once you do, your questions will show up here.</p>\n            </div>\n        '
        constant_6 = u'\n            <div class="empty-graph">\n                <h2><a href=\'/#browse\'>Watch a video</a> or <a href=\'/exercisedashboard\'>try a skill</a>!</h2>\n                <p>Once you do, real data will show up here.</p>\n            </div>\n            <div class="error-graph">\n                <h2>It\'s our fault.</h2>\n                <p>Try again later, and please <a href=\'/reportissue?type=Defect\'>let us know</a> if it continues.</p>\n            </div>\n            <div class="no-coaches-for-phantoms">\n                <h2><a href="'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        value = helpers.get('toLoginRedirectHref')
        if value is None:
            value = resolve(context, 'toLoginRedirectHref')
        if callable(value):
            this = Scope(context, context)
            value = value(this, "/profile")
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'toLoginRedirectHref', "/profile")
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_7)
        return result
    
    def constant_27(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u' class="empty-chart"'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        return result
    
    def constant_24(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'\n            <div class="activity-column">\n                <div id="activity-loading-placeholder">\n                    <h2>Loading activity...</h2>\n                    <div id="recent-activity-progress-bar"></div>\n                </div>\n                <div id="activity-contents" style="display:none">\n                    <div id="suggested-activity">\n                        <h2>Suggested Activity</h2>\n                    </div>\n                    <div id="recent-activity">\n                        <h2>Recently Completed Activity</h2>\n                    </div>\n                </div>\n            </div>\n            <div class="mini-stats-column">\n            </div>\n            '

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
    value = helpers.get('profileRoot')
    if value is None:
        value = resolve(context, 'profileRoot')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'profileRoot', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_7)
    value = resolve(context, "profileData","","avatarSrc")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_8)
    options = {'fn': partial(constant_9, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = partial(constant_10, helpers=helpers, partials=partials)
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "profileData","","nickname"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_11)
    value = helpers.get('profileRoot')
    if value is None:
        value = resolve(context, 'profileRoot')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'profileRoot', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_12)
    value = helpers.get('profileRoot')
    if value is None:
        value = resolve(context, 'profileRoot')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'profileRoot', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_13)
    value = helpers.get('profileRoot')
    if value is None:
        value = resolve(context, 'profileRoot')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'profileRoot', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_14)
    value = helpers.get('profileRoot')
    if value is None:
        value = resolve(context, 'profileRoot')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'profileRoot', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_15)
    value = helpers.get('profileRoot')
    if value is None:
        value = resolve(context, 'profileRoot')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'profileRoot', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_16)
    value = helpers.get('profileRoot')
    if value is None:
        value = resolve(context, 'profileRoot')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'profileRoot', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_17)
    value = helpers.get('profileRoot')
    if value is None:
        value = resolve(context, 'profileRoot')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'profileRoot', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_18)
    options = {'fn': partial(constant_19, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "profileData","","isSelf"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_20)
    options = {'fn': partial(constant_21, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = partial(constant_22, helpers=helpers, partials=partials)
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "profileData","","isFullyAccessible"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_23)
    options = {'fn': partial(constant_24, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "profileData","","isFullyAccessible"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_25)
    inner = partials['profile_vital-statistics']
    scope = Scope(context, context)
    result.grow(inner(scope, helpers=helpers, partials=partials))
    result.append(constant_26)
    options = {'fn': partial(constant_27, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('unless')
    if value is None:
        value = context.get('unless')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "profileData","","email"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_28)
    value = helpers.get('profileRoot')
    if value is None:
        value = resolve(context, 'profileRoot')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'profileRoot', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_29)
    value = helpers.get('profileRoot')
    if value is None:
        value = resolve(context, 'profileRoot')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'profileRoot', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_30)
    value = helpers.get('profileRoot')
    if value is None:
        value = resolve(context, 'profileRoot')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'profileRoot', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_31)
    return result
