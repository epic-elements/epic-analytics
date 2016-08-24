'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var EpicAnalytics = (function () {
    function EpicAnalytics() {
      _classCallCheck(this, EpicAnalytics);
    }

    _createClass(EpicAnalytics, [{
      key: 'beforeRegister',

      // Element setup goes in beforeRegister instead of createdCallback.
      value: function beforeRegister() {
        this.is = 'epic-analytics';

        this.observable = new Rx.Subject();

        // Define the properties object in beforeRegister.
        this.properties = {
          /**
           * Specifies the unique id for sending tracking events to segment.
           */
          segmentKey: {
            type: String,
            observer: '_segmentKeyChanged',
            notify: true,
            value: ''
          },
          /**
           * Specifies if pageview events should be fired automatically.
           */
          trackPages: {
            type: Boolean,
            value: false,
            notify: true
          },
          /**
           * Specifies the `name` property for auto pageview tracking.
           * Has no effect if `trackPages` is not `true`.
           */
          pageName: {
            type: String,
            value: '',
            notify: true
          }
        };

        this.observers = ['_handlePageTrackingChanges(trackPages, pageName)'];
      }
    }, {
      key: '_segmentKeyChanged',

      /**
       * Applies the segment key to `epic-analytics` and loads the segment API.
       *
       * @param {String} newValue The current value of `segmentKey`.
       */
      value: function _segmentKeyChanged(newValue) {
        if (newValue) {
          analytics.load(newValue);
        }
      }
    }, {
      key: '_handlePageTrackingChanges',

      /**
       * Handles auto pageview tracking with optional `name` parameter.
       *
       * @param {Boolean} trackPages The current value of `trackPages`.
       * @param {String} pageName The previous value of `trackPages`.
       */
      value: function _handlePageTrackingChanges(trackPages, pageName) {
        if (trackPages) {
          analytics.page(pageName);
        }
      }
    }]);

    return EpicAnalytics;
  })();

  // Register the element using Polymer's constructor.
  Polymer(EpicAnalytics);
})();
