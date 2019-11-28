(repository_namespace = function() {

    let view = {};

    let _representation, _value;

    view.init = function(representation, value) {
        _representation = representation;
        _value = value;
    };

    view.validate = () => true;

    view.getComponentValue = () => _value;

    return view;
}());