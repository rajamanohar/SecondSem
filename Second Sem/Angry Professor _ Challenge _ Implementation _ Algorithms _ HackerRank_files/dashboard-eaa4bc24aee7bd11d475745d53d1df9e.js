(function(){$.ajaxSetup({cache:!1,beforeSend:function(xhr){var pusher_socket_id;return xhr.setRequestHeader("X-Request-Unique-Id",window.HR.util.generateRequestUniqueId()),pusher_socket_id=window.HR.util.generatePusherSocketId(),pusher_socket_id?xhr.setRequestHeader("X-Pusher-Socket-ID",pusher_socket_id):void 0}}),function(){var proxiedSync;return proxiedSync=Backbone.sync,Backbone.sync=function(method,model,options){return options||(options={}),options.crossDomain||(options.crossDomain=!1),options.xhrFields||(options.xhrFields={withCredentials:!0}),options.beforeSend=function(xhr){var pusher_socket_id;return xhr.setRequestHeader("X-Request-Unique-Id",HR.util.generateRequestUniqueId()),pusher_socket_id=window.HR.util.generatePusherSocketId(),pusher_socket_id?xhr.setRequestHeader("X-Pusher-Socket-ID",pusher_socket_id):void 0},proxiedSync(method,model,options)}}(),$(document).ready(function(){var HR,_makeTopLevel,contest,profile;return HR=window.HR,HR.appController=new HR.AppController,window.asset_path=HR.appController.asset_path,HR.master="master",$.timeago.settings.allowFuture=!0,require.config({waitSeconds:60}),_makeTopLevel=function(source,attributes){return _.each(attributes,function(attribute){return HR[attribute]=source[attribute]})},_makeTopLevel(HR.appController,["namespace","requires","routeNamespace","restURL","model","collection","profile","contest"]),_makeTopLevel(HR.appController,["logger"]),HR.PREFETCH_DATA.messages&&(HR.cachedMessagesCollection=new HR.collection("message-thread"),_.each(HR.PREFETCH_DATA.messages,function(message){var model;return model=new HR.MessageThreadModel(message),HR.cachedMessagesCollection.add(model)})),profile=new HR.ProfileModel,contest=new HR.ContestModel,_.extend(HR.GenericModel.prototype,HR.CacheMixin),_.extend(HR.GenericCollection.prototype,HR.CacheMixin),HR.key_prefix=HR.PREFETCH_DATA.profile.key_prefix,profile.cacheSet(_.extend(HR.PREFETCH_DATA.profile,{me:!0})),contest.cacheSet(HR.PREFETCH_DATA.contest),void 0===profile.get("id")||profile.get("tour_done")||(HR.onboarding2_going=!0,HR.hideEmailVerify=!0,HR.profile().set("tour_done",!0),HR.profile().save()),profile.get("id")&&profile.get("timezone")!==moment.tz.guess()&&(HR.profile().set("timezone",moment.tz.guess()),HR.profile().save()),HR.PREFETCH_DATA.ab_tests&&HR.util.initializeAbTest(),HR.router=new HR.DashboardRouter,Backbone.history.start({pushState:!0})})}).call(this);