from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def goal_new_custom_dialog(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_6 = u'<div class="goal-new-custom modal fade hide">\n    <div class="modal-body">\n        <div class="progress-bar-wrapper">\n            <div class="progress-bar"></div>\n       </div>\n    </div>\n</div>\n'

    # End constants
    result = strlist()
    if helpers is None: helpers = {}
    helpers.update(pybars['helpers'])
    if partials is None: partials = {}
    result.append(constant_6)
    return result
