// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require) {
  var Origin = require('core/origin');
  var EditorData = require('../global/editorDataLoader');

  var ConfigModel = require('core/models/configModel');
  var EditorMenuSettingsEditView = require('./views/editorMenuSettingsEditView');
  var EditorMenuSettingsEditSidebarView = require('./views/editorMenuSettingsEditSidebarView');

  Origin.on('editor:menusettings', function(data) {
    var route1 = Origin.location.route1;
    (new ConfigModel({ _courseId: route1 })).fetch({
      success: function(model) {
        Origin.trigger('location:title:update', {title: Origin.l10n.t('app.selectmenu')});

        var backButtonRoute = "/#/editor/" + route1 + "/menu";
        // var backButtonText = "Back to menu";
        var backButtonText = Origin.l10n.t('app.backtomenu');
        if (data.type === "page") {
          backButtonRoute = "/#/editor/" + route1 + "/page/" + data.id;
          // backButtonText = "Back to page";
          backButtonText = Origin.l10n.t('app.backtopage');
        }
        Origin.sidebar.addView(new EditorMenuSettingsEditSidebarView().$el, {
          "backButtonText": backButtonText,
          "backButtonRoute": backButtonRoute
        });
        Origin.contentPane.setView(EditorMenuSettingsEditView, { model: model });
      }
    });
  });
});
