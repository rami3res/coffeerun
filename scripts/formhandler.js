(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
  var strengthLabel = $('label[for="strengthLevel"]');

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  function changeStrengthLevel(elementName, colorValue) {
    switch (true) {
      case (colorValue >= 0 && colorValue <= 33):
        {
          elementName.css('color', 'green');
          break;
        }
      case (colorValue >= 34 && colorValue <= 67):
        {
          elementName.css('color', 'orange');
          break;
        }
      case (colorValue >= 68 && colorValue <= 100):
        {
          elementName.css('color', 'red');
          break;
        }
    }
    elementName.text("Caffeine Rating: " + colorValue);
  }

  FormHandler.prototype.addSubmitHandler = function(fn) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function(event) {
      event.preventDefault();
      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      //console.log(data);
      fn(data);
      this.reset();
      changeStrengthLevel(strengthLabel, $('#strengthLevel').prop('value'));
      this.elements[0].focus();
    });
  };

  FormHandler.prototype.addRangeHandler = function() {
    console.log('Setting range handler for form');

    strengthLabel.text("Caffeine Rating: " + $('#strengthLevel').prop('value'));
    $('#strengthLevel').change('value', function(event) {
      event.preventDefault();
      changeStrengthLevel(strengthLabel, $('#strengthLevel').prop('value'));
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
