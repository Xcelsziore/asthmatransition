(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["profile-package_username-picker"]=a(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression;return f+='<div class="modal-header">\n    <a href="#" class="close-button close">x</a><h3>Edit basic info</h3>\n</div>\n<div class="modal-body">\n    <div class="notification info" style="display: none;">\n        In order to make your profile public, we need you to pick a username.\n    </div>\n    <div class="notification error" style="display: none;">\n        If you change your username, you cannot get your old one back for 120 days.\n    </div>\n    <div class="username-picker">\n        <div class="row nickname-row">\n            <div class="labels">\n                <label for="nickname">Real Name:</label>\n            </div>\n            <div class="inputs">\n                <input type="text" value="',h=c.nickname,h?g=h.call(b,{hash:{}}):(g=b.nickname,g=typeof g===i?g():g),f+=j(g)+'" class="nickname" id="nickname"><span class="sidenote"></span>\n                <p class="input-description">\n                    This is how your name will appear around Khan Academy, and how your friends and coaches will recognize you.\n                </p>\n            </div>\n        </div>\n        <div class="row username-row">\n            <div class="labels">\n                <label for="username">Username:</label>\n            </div>\n            <div class="inputs">\n                <input type="text" value="',h=c.username,h?g=h.call(b,{hash:{}}):(g=b.username,g=typeof g===i?g():g),f+=j(g)+'" class="username" id="username"><span class="sidenote"></span>\n                <p class="input-description">\n                    Your username will appear in your Khan Academy address.\n                </p>\n                <p class="input-description">\n                    http://www.khanacademy.org/profile/<span class="example-username">',h=c.username,h?g=h.call(b,{hash:{}}):(g=b.username,g=typeof g===i?g():g),f+=j(g)+'</span>\n                </p>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="modal-footer" style="text-align: right;">\n    <input id="cancel-profile-info" type="button" class="simple-button action-gradient" value="Cancel">\n    <input id="save-profile-info" type="button" class="simple-button action-gradient green" value="Save">\n</div>',f})})()