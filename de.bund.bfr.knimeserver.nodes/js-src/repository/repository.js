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
        mainTable.innerHTML = `<table id="TableElement" class="sortable table table-sm table-responsive-xl">
        <thead>
          <th id="cleft">Check</th>
          <th class="actives" id="col1" scope="col" data-sort="name">Model Name</th>
          <th class="actives hideColumn" id="col2" scope="col" data-sort="name">ModelID</th>
          <th class="actives" id="colS" data-sort="name">
            <span id="col3">Software</span><br/>
            <span><select id="soft" class="crit"><option selected="selected">Select</option></select>
            <button id="clearSoft" title="reset" class="fa fa-remove"></button></span>
          </th>
          <th class="actives" id="colE" data-sort="name">
            <span id="col4">Environment</span><br/>
            <span><select id="env" class="crit"><option selected="selected">Select</option></select>
            <button id="clearEnv" title="reset" class="fa fa-remove"></button></span>
          </th>
          <th class="actives" id="colH" data-sort="name">
            <span id="col5">Hazard</span><br/>
            <span>
              <select id="haz" class="crit"><option selected="selected">Select</option></select>
              <button id="clearHaz" title="reset" class="fa fa-remove"></button>
            </span>
          </th>
          <th class="actives" id="col6" scope="col" data-sort="name">Execution Time </th>
          <th class="actives" id="col7" scope="col" data-sort="name">Upload Date </th>
          <th id="cright">Details</th>
        </thead>
        <tbody id="rows"></tbody>
        </table></div>`;
        body.appendChild(mainTable);
    }

    function createNavBar() {
        let navBar = document.createElement("div");
        navBar.id = "Navbar";
        navBar.appendChild(createTopnav());
        navBar.appendChild(createSidenav());

        // add search bar
        navBar.innerHTML += `<div id="searchBar">
          <div>
            <input id="filter-search" class="form-control"  type="search" placeholder="Search" aria-label="Search">
            <span id="clear" class="fa fa-times-circle"></span>
          </div>
        </div>`;

        return navBar
    }

    function createTopnav() {
        let colorMain = "rgb(55,96,146)" // TODO: get color-Main from input
        let title1 = "FSK-Web"; // TODO: get title1 from input

        let topnav = document.createElement("div");
        topnav.className = "topnav";
        topnav.id = "myTopnav";
        topnav.style = `background-color: ${colorMain};`;
        topnav.innerHTML = `<h1>${title1}</h1>`;

        // Add links
        _representation.links.forEach(link => {
            let navlink = document.createElement("a");
            navlink.className = "Nav";
            navlink.href = link.url;
            navlink.target = "_blank";
            navlink.innerText = link.text;
            navlink.appendChild(createLinkIcon(link.type));
            topnav.appendChild(navlink);
        });

        let menuLink = document.createElement("a");
        menuLink.href = "javascript:void(0)";
        menuLink.style = "font-size:36px;";
        menuLink.className = "icon";
        menuLink.id = "MenuIcon";
        menuLink.innerHTML = '<i style="font-size:26px;" class="material-icons">menu</i></a>';
        topnav.appendChild(menuLink);

        return topnav;
    }

    function createSidenav() {
        let sidenav = document.createElement("div");
        sidenav.id = "mySidenav";
        sidenav.className = "sidenav";

        // Close button
        sidenav.innerHTML = '<a href="javascript:void(0)" class="closebtn">&times;</a>'

        // Add links
        _representation.links.forEach(link => {
            let navlink = document.createElement("a");
            navlink.className = "Nav";
            navlink.href = link.url;
            navlink.target = "_blank";
            navlink.innerText = link.text;
            navlink.appendChild(createLinkIcon(link.type));
            sidenav.appendChild(navlink);
        });

        return sidenav;
    }

    function createLinkIcon(linkType) {
        let icon = document.createElement("i");
        icon.className = "fa";
        if (linkType === "edition") {
            icon.classList.add("fa-pencil");
        } else if (linkType === "publication") {
            icon.classList.add("fa-cloud-upload");
        }

        return icon;
    }
}());