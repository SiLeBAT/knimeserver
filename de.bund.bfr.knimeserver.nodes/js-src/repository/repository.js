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

        createNavBar();

        let body = document.getElementsByTagName("body")[0];

        let navBar = createNavBar();
        body.appendChild(navBar);

        let descriptionParagraph = document.createElement("p");
        // TODO: add contents to description paragraph
        body.appendChild(descriptionParagraph);

        let mainTable = document.createElement("div");
        mainTable.id = "MainTable";
        body.appendChild(mainTable);
    }

    function createNavBar() {
        let navBar = document.createElement("div");
        navBar.id = "Navbar";

        let colorMain = "rgb(55,96,146)" // TODO: get color-Main from input
        let title1 = "FSK-Web"; // TODO: get title1 from input
        navBar.innerHTML = `<div class="topnav" id="myTopnav" style="background-color: ${colorMain};">
        <h1>${title1}</h1>
        ${_representation.links.map(link =>
        `<a class="Nav" href="${link.url}" target="_blank">${link.text}
        <i class="fa ${link.type === "edition" ? "fa-pencil" : "fa-cloud-upload" }"></i>
        </a>`).join("")}
        <a href="javascript:void(0);" style="font-size:36px;" class="icon" id="MenuIcon"><i  style="font-size:26px;"class="material-icons">menu</i></a>
        </div>`;

        return navBar
    }
}());