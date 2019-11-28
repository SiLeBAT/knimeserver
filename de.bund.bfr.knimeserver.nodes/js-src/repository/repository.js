(repository_namespace = function() {

    let view = {};

    let _representation, _value;

    view.init = function(representation, value) {
        _representation = representation;
        _value = value;

        createUI();
    };

    view.validate = () => true;

    view.getComponentValue = () => _value;

    return view;

    function createUI() {

        let body = document.getElementsByTagName("body")[0];

        let navBar = document.createElement("div");
        navBar.id = "Navbar";

        let colorMain = "rgb (55, 96, 146)" // TODO: get color-Main from input
        let title1 = "FSK-Web"; // TODO: get title1 from input
        navBar.innerHTML = `<div class="topnav" id="myTopnav" style="background-color: ${colorMain};">
          <h1>${title1}</h1>
          <!-- Links -->
        </div>`;

        body.appendChild(navBar);

        let descriptionParagraph = document.createElement("p");
        // TODO: add contents to description paragraph
        body.appendChild(descriptionParagraph);

        let mainTable = document.createElement("div");
        mainTable.id = "MainTable";
        body.appendChild(mainTable);
    }
}());