from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def user_card(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_9 = u'" id="avatar-pic" class="avatar-pic" >\n        <div class="avatar-change-overlay" style="display: none">Change avatar</div>\n      </div>\n      <div class="user-deets">\n          '
    constant_8 = u'" style="float:left;" >\n        <img src="'
    constant_6 = u'<div class="user-info vertical-shadow clearfix">\n    <div class="basic-user-info" style="float: left;">\n      <div class="avatar-pic-container'
    constant_20 = u'</span> Energy Points</div>\n          </div>\n          <div class="user-profile-controls clearfix">\n          '
    constant_16 = u'</div>\n              </div>\n              <div class="simple-stat">\n                  <img class="summary-icon" src="/images/profile-icons/inset-camera.png">\n                  <div class="stat-text">'
    constant_23 = u'\n          </div>\n      </div>\n    </div>\n    <div class="sticker-book">\n    </div>\n\n</div>\n'
    constant_19 = u' energy points" class="energy-points-badge" style="float:none; display:block; margin-bottom: 1px; margin-top: 2px; padding:0; line-height: 20px;">'
    constant_18 = u'</div>\n              </div>\n              <div class="simple-stat"><span title="'
    constant_25 = u'\n'
    constant_13 = u'">'
    constant_12 = u'\n          <div>\n              <span>Joined <abbr class="timeago" title="'
    constant_17 = u'<span class="stat-divider">/</span>'
    constant_15 = u'<span class="stat-divider">/</span>'
    constant_14 = u'</abbr></span>\n          </div>\n          <div class="basic-stats clearfix">\n              <div class="simple-stat">\n                  <img class="summary-icon star" src="/images/profile-icons/inset-star.png">\n                  <div class="stat-text">'

    def constant_21(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'\n            <span class="dropdown">\n              <span class="dropdown-toggle simple-button">\n                Edit profile\n                <span class="caret"></span>\n              </span>\n              <ul class="dropdown-menu vertical-shadow-strong">\n                  '
        constant_8 = u'\n                  <li><a class="edit-display-case" href="javascript:void(0)">Edit display case</a></li>\n                  <li><a class="edit-avatar" href="javascript:void(0)">Edit avatar</a></li>\n                  '
        constant_10 = u'\n              </ul>\n            </span>\n          '

        def constant_9(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_6 = u'\n                  <li><a class="edit-visibility" href="javascript:void(0)">Toggle privacy setting</a></li>\n                  '

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
            constant_6 = u'\n                  <li><a class="edit-basic-info" href="javascript:void(0)">Edit basic info</a></li>\n                  '

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
            value = value(this, options, resolve(context, "isFullyEditable"))
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
        value = helper = helpers.get('if')
        if value is None:
            value = context.get('if')
        if helper and callable(helper):
            this = Scope(context, context)
            value = value(this, options, resolve(context, "isFullyEditable"))
        else:
            helper = helpers['blockHelperMissing']
            value = helper(context, options, value)
        if value is None: value = ''
        result.grow(value)
        result.append(constant_10)
        return result
    
    def constant_7(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u' editable'

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
        constant_6 = u'\n            <!--\n              '
        constant_8 = u'\n              <a href="javascript:void(0)" class="add-remove-coach simple-button action-gradient" style="'
        constant_10 = u'">Remove as a coach</a>\n              -->\n          '

        def constant_9(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_6 = u' display: none;'

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
            constant_6 = u'<a href="javascript:void(0)" class="add-remove-coach simple-button action-gradient" style="'
            constant_8 = u'">Add as a coach</a>'

            def constant_7(context, helpers=None, partials=None):
                pybars = _pybars_

                # Begin constants
                constant_6 = u' display: none;'

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
                value = value(this, options, resolve(context, "isCoachingLoggedInUser"))
            else:
                helper = helpers['blockHelperMissing']
                value = helper(context, options, value)
            if value is None: value = ''
            result.grow(value)
            result.append(constant_8)
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
        value = helper = helpers.get('unless')
        if value is None:
            value = context.get('unless')
        if helper and callable(helper):
            this = Scope(context, context)
            value = value(this, options, resolve(context, "isSelf"))
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
        value = helper = helpers.get('unless')
        if value is None:
            value = context.get('unless')
        if helper and callable(helper):
            this = Scope(context, context)
            value = value(this, options, resolve(context, "isCoachingLoggedInUser"))
        else:
            helper = helpers['blockHelperMissing']
            value = helper(context, options, value)
        if value is None: value = ''
        result.grow(value)
        result.append(constant_10)
        return result
    
    def constant_24(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_9 = u'">Profile is '
        constant_6 = u'\n<a href="javascript:void(0)"\n    class="edit-visibility visibility-toggler '
        constant_12 = u'</a>\n<div id="username-picker-container" class="modal fade hide" style="display: none;">\n</div>\n'

        def constant_7(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_6 = u'public'

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
            constant_6 = u'private'

            # End constants
            result = strlist()
            if helpers is None: helpers = {}
            helpers.update(pybars['helpers'])
            if partials is None: partials = {}
            result.append(constant_6)
            return result
        
        def constant_8(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_6 = u'private'

            # End constants
            result = strlist()
            if helpers is None: helpers = {}
            helpers.update(pybars['helpers'])
            if partials is None: partials = {}
            result.append(constant_6)
            return result
        
        def constant_10(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_6 = u'public'

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
        options['inverse'] = partial(constant_8, helpers=helpers, partials=partials)
        value = helper = helpers.get('if')
        if value is None:
            value = context.get('if')
        if helper and callable(helper):
            this = Scope(context, context)
            value = value(this, options, resolve(context, "isPublic"))
        else:
            helper = helpers['blockHelperMissing']
            value = helper(context, options, value)
        if value is None: value = ''
        result.grow(value)
        result.append(constant_9)
        options = {'fn': partial(constant_10, helpers=helpers, partials=partials)}
        options['helpers'] = helpers
        options['partials'] = partials
        options['inverse'] = partial(constant_11, helpers=helpers, partials=partials)
        value = helper = helpers.get('if')
        if value is None:
            value = context.get('if')
        if helper and callable(helper):
            this = Scope(context, context)
            value = value(this, options, resolve(context, "isPublic"))
        else:
            helper = helpers['blockHelperMissing']
            value = helper(context, options, value)
        if value is None: value = ''
        result.grow(value)
        result.append(constant_12)
        return result
    
    def constant_11(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_7 = u'</span>\n          </div>\n          '
        constant_6 = u'\n          <div>\n              <span class="nickname">'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        value = helpers.get('nickname')
        if value is None:
            value = resolve(context, 'nickname')
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'nickname', )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_7)
        return result
    
    def constant_10(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_7 = u'" class="simple-button action-gradient green">Log in to claim your profile</a>\n          '
        constant_6 = u'\n             <a href="'

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
        value = value(this, options, resolve(context, "isEditable"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_8)
    value = helpers.get('avatarSrc')
    if value is None:
        value = resolve(context, 'avatarSrc')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'avatarSrc', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_9)
    options = {'fn': partial(constant_10, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = partial(constant_11, helpers=helpers, partials=partials)
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "isPhantom"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_12)
    value = helpers.get('dateJoined')
    if value is None:
        value = resolve(context, 'dateJoined')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'dateJoined', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_13)
    value = helpers.get('dateJoined')
    if value is None:
        value = resolve(context, 'dateJoined')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'dateJoined', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_14)
    value = helpers.get('countExercisesProficient')
    if value is None:
        value = resolve(context, 'countExercisesProficient')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'countExercisesProficient', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_15)
    value = helpers.get('countExercises')
    if value is None:
        value = resolve(context, 'countExercises')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'countExercises', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_16)
    value = helpers.get('countVideosCompleted')
    if value is None:
        value = resolve(context, 'countVideosCompleted')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'countVideosCompleted', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_17)
    value = helpers.get('countVideos')
    if value is None:
        value = resolve(context, 'countVideos')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'countVideos', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_18)
    value = helpers.get('commafy')
    if value is None:
        value = resolve(context, 'commafy')
    if callable(value):
        this = Scope(context, context)
        value = value(this, resolve(context, "points"))
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'commafy', resolve(context, "points"))
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_19)
    value = helpers.get('commafy')
    if value is None:
        value = resolve(context, 'commafy')
    if callable(value):
        this = Scope(context, context)
        value = value(this, resolve(context, "points"))
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'commafy', resolve(context, "points"))
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
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
        value = value(this, options, resolve(context, "isEditable"))
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
        value = value(this, options, resolve(context, "isFullyEditable"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_25)
    return result
