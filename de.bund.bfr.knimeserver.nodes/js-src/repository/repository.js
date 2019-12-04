(repository_namespace = function() {

  // Metadata handlers for the display view

  /**
   * Create a Bootstrap dropdown menu.
   * @param {string} name Menu name 
   * @param {array} submenus Array of hashes of id and name of the submenus.
   */
  function createSubMenu(name, submenus) {

    return `<li class="dropdown">
      <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button"
        aria-haspopup="true" aria-expanded="false">${name}<span class="caret"></a>
      <ul class="dropdown-menu">
      ${submenus.map(entry => `<li><a href="#${entry.id}" aria-controls="#${entry.id}"
        role="button" data-toggle="tab">${entry.label}</a></li>`).join("")}
      </ul>
    </li>`;
  }

  /**
   * Create a Bootstrap 3 panel for simple (non-nested) metadata. Good for
   * General information, study, etc. but not for lists like model parameters or
   * references.
   * 
   * @param {string} title Panel title 
   * @param {object} formData Information from UI schema for this metadata
   * @param {object} data Object with keys as the properties ids in formData and
   * values as the actual metadata values.
   */
  function createSimplePanel(title, formData, data) {

    return `<div class="panel panel-default">
      <div class="panel-heading">
        <h3>${title}</h3>
      </div>
      <div class="panel-body">
        <table class="table">
          <thead>
            <th>Property</th>
            <th>Value</th>
          </thead>
          <tbody>
          ${formData.map(prop => `<tr>
            <td>${prop.label}</td>
            <td>${data && data[prop.id] ? data[prop.id] : ""}</td>
          </tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div> <!-- .panel -->`;
  }

  /**
   * Create a Bootstrap 3 panel for complex (nested) metadata. Good for lists
   * like model parameters or references.
   * 
   * @param {string} title Panel title 
   * @param {object} formData Information from UI schema for this metadata
   * @param {object} data Object with keys as the properties ids in formData and
   * values as the actual metadata values.
   */
  function createComplexPanel(title, formData, data) {

    let rows = [];
    if (data) {
      data.forEach(item => {
        let newRow = `<tr>
          ${formData.map(prop => {
            `<td>${item[prop.id] ? item[prop.id] : ""}</td>`
          }).join("")}
        </tr>`;
        rows.push(newRow);
      });
    }

    return `<div class="panel panel-default">
      <div class="panel-heading">
        <h3>${title}</h3>
      </div>
      <div class="panel-body">
        <table class="table">
          <thead>
            ${formData.map(prop => `<th>${prop.label}</th>`).join("")}
          </thead>
          <tbody>${rows.join("")}</tbody>
        </table>
      </div>
    </div> <!-- .panel -->`;
  }

  function createPlotPanel(img) {
    return `<img  style='width:100%' src='data:image/png;base64,${img}'/>`;
  }

  class GenericModel {

    constructor(metadata, img) {
      this.menus = this._createMenus();
      this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
      return createSubMenu("General information", [
        { "id": "generalInformation", "label": "General" },
        { "id": "modelCategory", "label": "Model category" },
        { "id": "author", "label": "Author" },
        { "id": "creator", "label": "Creator" },
        { "id": "reference", "label": "Reference" }]) +
        createSubMenu("Scope", [{ "id": "scopeGeneral", "label": "General" },
        { "id": "product", "label": "Product" },
        { "id": "hazard", "label": "Hazard" },
        { "id": "population", "label": "Population group" }]) +
        createSubMenu("Data Background", [{ "id": "study", "label": "Study" },
        { "id": "studySample", "label": "Study sample" },
        { "id": "dietaryAssessmentMethod", "label": "Dietary assessment method" },
        { "id": "laboratory", "label": "Laboratory" },
        { "id": "assay", "label": "Assay" }]) +
        createSubMenu("Model math", [{ "id": "modelMath", "label": "General" },
        { "id": "parameter", "label": "Parameter" },
        { "id": "qualityMeasures", "label": "Quality measures" },
        { "id": "modelEquation", "label": "Model equation" },
        { "id": "exposure", "label": "Exposure" }]) +
        `<li role="presentation">
          <a id="plot-tab" href="#plot"
            aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
        </li>`;
    }

    _createPanels(metadata, img) {
      let schema = schemas.genericModel;
      return {
        generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
        modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.modelCategory),
        author: createComplexPanel("Author", schema.contact, metadata.author),
        creator: createComplexPanel("Creator", schema.contact, metadata.creator),
        reference: createComplexPanel("Reference", schema.reference, metadata.reference),
        scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
        product: createComplexPanel("Product", schema.product, metadata.product),
        hazard: createComplexPanel("Hazard", schema.hazard, metadata.hazard),
        population: createComplexPanel("Population", schema.populationGroup, metadata.populationGroup),
        study: createSimplePanel("Study", schema.study, metadata.study),
        studySample: createComplexPanel("Study sample", schema.studySample, metadata.studySample),
        dietaryAssessmentMethod: createComplexPanel("Dietary assessment method", schema.dietaryAssessmentMethod, metadata.dietaryAssessmentMethod),
        laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.laboratory),
        assay: createComplexPanel("Assay", schema.assay, metadata.assay),
        modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
        parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
        qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
        modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
        exposure: createComplexPanel("Exposure", schema.exposure, metadata.modelMath.exposure),
        plot: createPlotPanel(img) 
      };
    }
  }

  class DataModel {

    constructor(metadata, img) {
      this.menus = this._createMenus();
      this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
      return createSubMenu("General information", [
        { "id": "generalInformation", "label": "General" },
        { "id": "author", "label": "Author" },
        { "id": "creator", "label": "Creator" },
        { "id": "reference", "label": "Reference" }]) +
        createSubMenu("Scope", [{ "id": "scopeGeneral", "label": "General" },
        { "id": "product", "label": "Product" },
        { "id": "hazard", "label": "Hazard" },
        { "id": "population", "label": "Population group" }]) +
        createSubMenu("Data Background", [{ "id": "study", "label": "Study" },
        { "id": "studySample", "label": "Study sample" },
        { "id": "dietaryAssessmentMethod", "label": "Dietary assessment method" },
        { "id": "laboratory", "label": "Laboratory" },
        { "id": "assay", "label": "Assay" }]) +
        createSubMenu("Model math", [{ "id": "parameter", "label": "Parameter" }]) +
        `<li role="presentation">
          <a id="plot-tab" href="#plot"
            aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
        </li>`;
    }

    _createPanels(metadata, img) {
      let schema = schemas.dataModel;
      return {
        generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
        author: createComplexPanel("Author", schema.contact, metadata.author),
        creator: createComplexPanel("Creator", schema.contact, metadata.creator),
        reference: createComplexPanel("Reference", schema.reference, metadata.reference),
        scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
        product: createComplexPanel("Product", schema.product, metadata.product),
        hazard: createComplexPanel("Hazard", schema.hazard, metadata.hazard),
        population: createComplexPanel("Population", schema.populationGroup, metadata.populationGroup),
        study: createSimplePanel("Study", schema.study, metadata.study),
        studySample: createComplexPanel("Study sample", schema.studySample, metadata.studySample),
        dietaryAssessmentMethod: createComplexPanel("Dietary assessment method", schema.dietaryAssessmentMethod, metadata.dietaryAssessmentMethod),
        laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.laboratory),
        assay: createComplexPanel("Assay", schema.assay, metadata.assay),
        parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
        plot: createPlotPanel(img) 
      };
    }
  }

  class PredictiveModel {

    constructor(metadata, img) {
      this.menus = this._createMenus();
      this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
      return createSubMenu("General information", [
        { "id": "generalInformation", "label": "General" },
        { "id": "author", "label": "Author" },
        { "id": "creator", "label": "Creator" },
        { "id": "reference", "label": "Reference" }]) +
        createSubMenu("Scope", [{ "id": "scopeGeneral", "label": "General" },
        { "id": "product", "label": "Product" },
        { "id": "hazard", "label": "Hazard" }]) +
        createSubMenu("Data Background", [{ "id": "study", "label": "Study" },
        { "id": "studySample", "label": "Study sample" },
        { "id": "laboratory", "label": "Laboratory" },
        { "id": "assay", "label": "Assay" }]) +
        createSubMenu("Model math", [{ "id": "parameter", "label": "Parameter" }]) +
        `<li role="presentation">
          <a id="plot-tab" href="#plot"
            aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
        </li>`;
    }

    _createPanels(metadata, img) {
      let schema = schemas.predictiveModel;
      return {
        generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
        author: createComplexPanel("Author", schema.contact, metadata.author),
        creator: createComplexPanel("Creator", schema.contact, metadata.creator),
        reference: createComplexPanel("Reference", schema.reference, metadata.reference),
        scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
        product: createComplexPanel("Product", schema.product, metadata.product),
        hazard: createComplexPanel("Hazard", schema.hazard, metadata.hazard),
        study: createSimplePanel("Study", schema.study, metadata.study),
        studySample: createComplexPanel("Study sample", schema.studySample, metadata.studySample),
        laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.laboratory),
        assay: createComplexPanel("Assay", schema.assay, metadata.assay),
        modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
        parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
        plot: createPlotPanel(img) 
      };
    }
  }

  class OtherModel {

    constructor(metadata, img) {
      this.menus = this._createMenus();
      this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
      return createSubMenu("General information", [
        { "id": "generalInformation", "label": "General" },
        { "id": "modelCategory", "label": "Model category" },
        { "id": "author", "label": "Author" },
        { "id": "creator", "label": "Creator" },
        { "id": "reference", "label": "Reference" }]) +
        createSubMenu("Scope", [{ "id": "scopeGeneral", "label": "General" },
        { "id": "product", "label": "Product" },
        { "id": "hazard", "label": "Hazard" },
        { "id": "population", "label": "Population group" }]) +
        createSubMenu("Data Background", [{ "id": "study", "label": "Study" },
        { "id": "studySample", "label": "Study sample" },
        { "id": "laboratory", "label": "Laboratory" },
        { "id": "assay", "label": "Assay" }]) +
        createSubMenu("Model math", [{ "id": "modelMath", "label": "General" },
        { "id": "parameter", "label": "Parameter" },
        { "id": "qualityMeasures", "label": "Quality measures" },
        { "id": "modelEquation", "label": "Model equation" }]) +
        `<li role="presentation">
          <a id="plot-tab" href="#plot"
            aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
        </li>`;
    }

    _createPanels(metadata, img) {
      let schema = schemas.otherModel;
      return {
        generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
        modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.modelCategory),
        author: createComplexPanel("Author", schema.contact, metadata.author),
        creator: createComplexPanel("Creator", schema.contact, metadata.creator),
        reference: createComplexPanel("Reference", schema.reference, metadata.reference),
        scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
        product: createComplexPanel("Product", schema.product, metadata.product),
        hazard: createComplexPanel("Hazard", schema.hazard, metadata.hazard),
        population: createComplexPanel("Population", schema.populationGroup, metadata.populationGroup),
        study: createSimplePanel("Study", schema.study, metadata.study),
        studySample: createComplexPanel("Study sample", schema.studySample, metadata.studySample),
        laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.laboratory),
        assay: createComplexPanel("Assay", schema.assay, metadata.assay),
        modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
        parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
        qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
        modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
        plot: createPlotPanel(img) 
      };
    }
  }

  class DoseResponseModel {

    constructor(metadata, img) {
      this.menus = this._createMenus();
      this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
      return createSubMenu("General information", [
        { "id": "generalInformation", "label": "General" },
        { "id": "modelCategory", "label": "Model category" },
        { "id": "author", "label": "Author" },
        { "id": "creator", "label": "Creator" },
        { "id": "reference", "label": "Reference" }]) +
        createSubMenu("Scope", [{ "id": "scopeGeneral", "label": "General" },
        { "id": "hazard", "label": "Hazard" },
        { "id": "population", "label": "Population group" }]) +
        createSubMenu("Data Background", [{ "id": "study", "label": "Study" },
        { "id": "studySample", "label": "Study sample" },
        { "id": "laboratory", "label": "Laboratory" },
        { "id": "assay", "label": "Assay" }]) +
        createSubMenu("Model math", [{ "id": "modelMath", "label": "General" },
        { "id": "parameter", "label": "Parameter" },
        { "id": "qualityMeasures", "label": "Quality measures" },
        { "id": "modelEquation", "label": "Model equation" },
        { "id": "exposure", "label": "Exposure" }]) +
        `<li role="presentation">
          <a id="plot-tab" href="#plot"
            aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
        </li>`;
    }

    _createPanels(metadata, img) {
      let schema = schemas.doseResponseModel;
      return {
        generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
        modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.modelCategory),
        author: createComplexPanel("Author", schema.contact, metadata.author),
        creator: createComplexPanel("Creator", schema.contact, metadata.creator),
        reference: createComplexPanel("Reference", schema.reference, metadata.reference),
        scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
        hazard: createComplexPanel("Hazard", schema.hazard, metadata.hazard),
        population: createComplexPanel("Population", schema.populationGroup, metadata.populationGroup),
        study: createSimplePanel("Study", schema.study, metadata.study),
        studySample: createComplexPanel("Study sample", schema.studySample, metadata.studySample),
        laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.laboratory),
        assay: createComplexPanel("Assay", schema.assay, metadata.assay),
        modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
        parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
        qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
        modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
        exposure: createComplexPanel("Exposure", schema.exposure, metadata.modelMath.exposure),
        plot: createPlotPanel(img) 
      };
    }
  }

  class ToxicologicalModel {

    constructor(metadata, img) {
      this.menus = this._createMenus();
      this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
      return createSubMenu("General information", [
        { "id": "generalInformation", "label": "General" },
        { "id": "modelCategory", "label": "Model category" },
        { "id": "author", "label": "Author" },
        { "id": "creator", "label": "Creator" },
        { "id": "reference", "label": "Reference" }]) +
        createSubMenu("Scope", [{ "id": "scopeGeneral", "label": "General" },
        { "id": "hazard", "label": "Hazard" },
        { "id": "population", "label": "Population group" }]) +
        createSubMenu("Data Background", [{ "id": "study", "label": "Study" },
        { "id": "studySample", "label": "Study sample" },
        { "id": "laboratory", "label": "Laboratory" },
        { "id": "assay", "label": "Assay" }]) +
        createSubMenu("Model math", [{ "id": "modelMath", "label": "General" },
        { "id": "parameter", "label": "Parameter" },
        { "id": "qualityMeasures", "label": "Quality measures" },
        { "id": "modelEquation", "label": "Model equation" },
        { "id": "exposure", "label": "Exposure" }]) +
        `<li role="presentation">
          <a id="plot-tab" href="#plot"
            aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
        </li>`;
    }

    _createPanels(metadata, img) {
      let schema = schemas.toxicologicalModel;
      return {
        generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
        modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.modelCategory),
        author: createComplexPanel("Author", schema.contact, metadata.author),
        creator: createComplexPanel("Creator", schema.contact, metadata.creator),
        reference: createComplexPanel("Reference", schema.reference, metadata.reference),
        scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
        product: createComplexPanel("Product", schema.product, metadata.product),
        hazard: createComplexPanel("Hazard", schema.hazard, metadata.hazard),
        population: createComplexPanel("Population", schema.populationGroup, metadata.populationGroup),
        study: createSimplePanel("Study", schema.study, metadata.study),
        studySample: createComplexPanel("Study sample", schema.studySample, metadata.studySample),
        laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.laboratory),
        assay: createComplexPanel("Assay", schema.assay, metadata.assay),
        modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
        parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
        qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
        modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
        exposure: createComplexPanel("Exposure", schema.exposure, metadata.modelMath.exposure),
        plot: createPlotPanel(img) 
      };
    }
  }

  class ExposureModel {

    constructor(metadata, img) {
      this.menus = this._createMenus();
      this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
      return createSubMenu("General information", [
        { "id": "generalInformation", "label": "General" },
        { "id": "modelCategory", "label": "Model category" },
        { "id": "author", "label": "Author" },
        { "id": "creator", "label": "Creator" },
        { "id": "reference", "label": "Reference" }]) +
        createSubMenu("Scope", [{ "id": "scopeGeneral", "label": "General" },
        { "id": "product", "label": "Product" },
        { "id": "hazard", "label": "Hazard" },
        { "id": "population", "label": "Population group" }]) +
        createSubMenu("Data Background", [{ "id": "study", "label": "Study" },
        { "id": "studySample", "label": "Study sample" },
        { "id": "dietaryAssessmentMethod", "label": "Dietary assessment method" },
        { "id": "laboratory", "label": "Laboratory" },
        { "id": "assay", "label": "Assay" }]) +
        createSubMenu("Model math", [{ "id": "modelMath", "label": "General" },
        { "id": "parameter", "label": "Parameter" },
        { "id": "qualityMeasures", "label": "Quality measures" },
        { "id": "modelEquation", "label": "Model equation" },
        { "id": "exposure", "label": "Exposure" }]) +
        `<li role="presentation">
          <a id="plot-tab" href="#plot"
            aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
        </li>`;
    }

    _createPanels(metadata, img) {
      let schema = schemas.exposureModel;
      return {
        generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
        modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.modelCategory),
        author: createComplexPanel("Author", schema.contact, metadata.author),
        creator: createComplexPanel("Creator", schema.contact, metadata.creator),
        reference: createComplexPanel("Reference", schema.reference, metadata.reference),
        scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
        product: createComplexPanel("Product", schema.product, metadata.product),
        hazard: createComplexPanel("Hazard", schema.hazard, metadata.hazard),
        population: createComplexPanel("Population", schema.populationGroup, metadata.populationGroup),
        study: createSimplePanel("Study", schema.study, metadata.study),
        studySample: createComplexPanel("Study sample", schema.studySample, metadata.studySample),
        dietaryAssessmentMethod: createComplexPanel("Dietary assessment method", schema.dietaryAssessmentMethod, metadata.dietaryAssessmentMethod),
        laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.laboratory),
        assay: createComplexPanel("Assay", schema.assay, metadata.assay),
        modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
        parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
        qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
        modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
        exposure: createComplexPanel("Exposure", schema.exposure, metadata.modelMath.exposure),
        plot: createPlotPanel(img) 
      };
    }
  }

  class ProcessModel {

    constructor(metadata, img) {
      this.menus = this._createMenus();
      this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
      return createSubMenu("General information", [
        { "id": "generalInformation", "label": "General" },
        { "id": "author", "label": "Author" },
        { "id": "creator", "label": "Creator" },
        { "id": "reference", "label": "Reference" }]) +
        createSubMenu("Scope", [{ "id": "scopeGeneral", "label": "General" },
        { "id": "product", "label": "Product" },
        { "id": "hazard", "label": "Hazard" }]) +
        createSubMenu("Data Background", [{ "id": "study", "label": "Study" },
        { "id": "studySample", "label": "Study sample" },
        { "id": "laboratory", "label": "Laboratory" },
        { "id": "assay", "label": "Assay" }]) +
        createSubMenu("Model math", [{ "id": "parameter", "label": "Parameter" },
        { "id": "qualityMeasures", "label": "Quality measures" },
        { "id": "modelEquation", "label": "Model equation" }]) +
        `<li role="presentation">
          <a id="plot-tab" href="#plot"
            aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
        </li>`;
    }

    _createPanels(metadata, img) {
      let schema = schemas.processModel;
      return {
        generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
        modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.modelCategory),
        author: createComplexPanel("Author", schema.contact, metadata.author),
        creator: createComplexPanel("Creator", schema.contact, metadata.creator),
        reference: createComplexPanel("Reference", schema.reference, metadata.reference),
        scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
        product: createComplexPanel("Product", schema.product, metadata.product),
        hazard: createComplexPanel("Hazard", schema.hazard, metadata.hazard),
        study: createSimplePanel("Study", schema.study, metadata.study),
        studySample: createComplexPanel("Study sample", schema.studySample, metadata.studySample),
        laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.laboratory),
        assay: createComplexPanel("Assay", schema.assay, metadata.assay),
        modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
        parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
        qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
        modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
        plot: createPlotPanel(img) 
      };
    }
  }

  class ConsumptionModel {

    constructor(metadata, img) {
      this.menus = this._createMenus();
      this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
      return createSubMenu("General information", [
        { "id": "generalInformation", "label": "General" },
        { "id": "modelCategory", "label": "Model category" },
        { "id": "author", "label": "Author" },
        { "id": "creator", "label": "Creator" },
        { "id": "reference", "label": "Reference" }]) +
        createSubMenu("Scope", [{ "id": "scopeGeneral", "label": "General" },
        { "id": "product", "label": "Product" },
        { "id": "populationGroup", "label": "Population group" }]) +
        createSubMenu("Data Background", [{ "id": "study", "label": "Study" },
        { "id": "studySample", "label": "Study sample" },
        { "id": "laboratory", "label": "Laboratory" },
        { "id": "assay", "label": "Assay" }]) +
        createSubMenu("Model math", [{ "id": "parameter", "label": "Parameter" },
        { "id": "qualityMeasures", "label": "Quality measures" },
        { "id": "modelEquation", "label": "Model equation" }]) +
        `<li role="presentation">
          <a id="plot-tab" href="#plot"
            aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
        </li>`;
    }

    _createPanels(metadata, img) {
      let schema = schemas.consumptionModel;
      return {
        generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
        modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.modelCategory),
        author: createComplexPanel("Author", schema.contact, metadata.author),
        creator: createComplexPanel("Creator", schema.contact, metadata.creator),
        reference: createComplexPanel("Reference", schema.reference, metadata.reference),
        scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
        product: createComplexPanel("Product", schema.product, metadata.product),
        population: createComplexPanel("Population", schema.populationGroup, metadata.populationGroup),
        study: createSimplePanel("Study", schema.study, metadata.study),
        studySample: createComplexPanel("Study sample", schema.studySample, metadata.studySample),
        dietaryAssessmentMethod: createComplexPanel("Dietary assessment method", schema.dietaryAssessmentMethod, metadata.dietaryAssessmentMethod),
        laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.laboratory),
        assay: createComplexPanel("Assay", schema.assay, metadata.assay),
        modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
        parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
        qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
        modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
        plot: createPlotPanel(img) 
      };
    }
  }

  class HealthModel {

    constructor(metadata, img) {
      this.menus = this._createMenus();
      this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
      return createSubMenu("General information", [
        { "id": "generalInformation", "label": "General" },
        { "id": "modelCategory", "label": "Model category" },
        { "id": "author", "label": "Author" },
        { "id": "creator", "label": "Creator" },
        { "id": "reference", "label": "Reference" }]) +
        createSubMenu("Scope", [{ "id": "scopeGeneral", "label": "General" },
        { "id": "hazard", "label": "Hazard" },
        { "id": "populationGroup", "label": "Population group" }]) +
        createSubMenu("Data Background", [{ "id": "study", "label": "Study" },
        { "id": "studySample", "label": "Study sample" },
        { "id": "laboratory", "label": "Laboratory" },
        { "id": "assay", "label": "Assay" }]) +
        createSubMenu("Model math", [{ "id": "modelMath", "label": "General" },
        { "id": "parameter", "label": "Parameter" },
        { "id": "qualityMeasures", "label": "Quality measures" },
        { "id": "modelEquation", "label": "Model equation" },
        { "id": "exposure", "label": "Exposure" }]) +
        `<li role="presentation">
          <a id="plot-tab" href="#plot"
            aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
        </li>`;
    }

    _createPanels(metadata, img) {
      let schema = schemas.healthModel;
      return {
        generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
        modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.modelCategory),
        author: createComplexPanel("Author", schema.contact, metadata.author),
        creator: createComplexPanel("Creator", schema.contact, metadata.creator),
        reference: createComplexPanel("Reference", schema.reference, metadata.reference),
        scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
        hazard: createComplexPanel("Hazard", schema.hazard, metadata.hazard),
        population: createComplexPanel("Population", schema.populationGroup, metadata.populationGroup),
        study: createSimplePanel("Study", schema.study, metadata.study),
        studySample: createComplexPanel("Study sample", schema.studySample, metadata.studySample),
        dietaryAssessmentMethod: createComplexPanel("Dietary assessment method", schema.dietaryAssessmentMethod, metadata.dietaryAssessmentMethod),
        laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.laboratory),
        assay: createComplexPanel("Assay", schema.assay, metadata.assay),
        modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
        parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
        qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
        modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
        exposure: createComplexPanel("Exposure", schema.exposure, metadata.modelMath.exposure),
        plot: createPlotPanel(img) 
      };
    }
  }

  class RiskModel {

    constructor(metadata, img) {
      this.menus = this._createMenus();
      this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
      return createSubMenu("General information", [
        { "id": "generalInformation", "label": "General" },
        { "id": "modelCategory", "label": "Model category" },
        { "id": "author", "label": "Author" },
        { "id": "creator", "label": "Creator" },
        { "id": "reference", "label": "Reference" }]) +
        createSubMenu("Scope", [{ "id": "scopeGeneral", "label": "General" },
        { "id": "product", "label": "Product" },
        { "id": "hazard", "label": "Hazard" },
        { "id": "population", "label": "Population group" }]) +
        createSubMenu("Data Background", [{ "id": "study", "label": "Study" },
        { "id": "studySample", "label": "Study sample" },
        { "id": "dietaryAssessmentMethod", "label": "Dietary assessment method" },
        { "id": "laboratory", "label": "Laboratory" },
        { "id": "assay", "label": "Assay" }]) +
        createSubMenu("Model math", [{ "id": "modelMath", "label": "General" },
        { "id": "parameter", "label": "Parameter" },
        { "id": "qualityMeasures", "label": "Quality measures" },
        { "id": "modelEquation", "label": "Model equation" },
        { "id": "exposure", "label": "Exposure" }]) +
        `<li role="presentation">
          <a id="plot-tab" href="#plot"
            aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
        </li>`;
    }

    _createPanels(metadata, img) {
      let schema = schemas.riskModel;
      return {
        generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
        modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.modelCategory),
        author: createComplexPanel("Author", schema.contact, metadata.author),
        creator: createComplexPanel("Creator", schema.contact, metadata.creator),
        reference: createComplexPanel("Reference", schema.reference, metadata.reference),
        scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
        product: createComplexPanel("Product", schema.product, metadata.product),
        hazard: createComplexPanel("Hazard", schema.hazard, metadata.hazard),
        population: createComplexPanel("Population", schema.populationGroup, metadata.populationGroup),
        study: createSimplePanel("Study", schema.study, metadata.study),
        studySample: createComplexPanel("Study sample", schema.studySample, metadata.studySample),
        dietaryAssessmentMethod: createComplexPanel("Dietary assessment method", schema.dietaryAssessmentMethod, metadata.dietaryAssessmentMethod),
        laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.laboratory),
        assay: createComplexPanel("Assay", schema.assay, metadata.assay),
        modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
        parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
        qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
        modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
        exposure: createComplexPanel("Exposure", schema.exposure, metadata.modelMath.exposure),
        plot: createPlotPanel(img) 
      };
    }
  }

  class QraModel {

    constructor(metadata, img) {
      this.menus = this._createMenus();
      this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
      return createSubMenu("General information", [
        { "id": "generalInformation", "label": "General" },
        { "id": "modelCategory", "label": "Model category" },
        { "id": "author", "label": "Author" },
        { "id": "creator", "label": "Creator" },
        { "id": "reference", "label": "Reference" }]) +
        createSubMenu("Scope", [{ "id": "scopeGeneral", "label": "General" },
        { "id": "product", "label": "Product" },
        { "id": "hazard", "label": "Hazard" },
        { "id": "population", "label": "Population group" }]) +
        createSubMenu("Data Background", [{ "id": "study", "label": "Study" },
        { "id": "studySample", "label": "Study sample" },
        { "id": "dietaryAssessmentMethod", "label": "Dietary assessment method" },
        { "id": "laboratory", "label": "Laboratory" },
        { "id": "assay", "label": "Assay" }]) +
        createSubMenu("Model math", [{ "id": "modelMath", "label": "General" },
        { "id": "parameter", "label": "Parameter" },
        { "id": "qualityMeasures", "label": "Quality measures" },
        { "id": "modelEquation", "label": "Model equation" },
        { "id": "exposure", "label": "Exposure" }])  +
        `<li role="presentation">
          <a id="plot-tab" href="#plot"
            aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
        </li>`;
    }

    _createPanels(metadata, img) {
      let schema = schemas.qraModel;
      return {
        generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
        modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.modelCategory),
        author: createComplexPanel("Author", schema.contact, metadata.author),
        creator: createComplexPanel("Creator", schema.contact, metadata.creator),
        reference: createComplexPanel("Reference", schema.reference, metadata.reference),
        scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
        product: createComplexPanel("Product", schema.product, metadata.product),
        hazard: createComplexPanel("Hazard", schema.hazard, metadata.hazard),
        population: createComplexPanel("Population", schema.populationGroup, metadata.populationGroup),
        study: createSimplePanel("Study", schema.study, metadata.study),
        studySample: createComplexPanel("Study sample", schema.studySample, metadata.studySample),
        dietaryAssessmentMethod: createComplexPanel("Dietary assessment method", schema.dietaryAssessmentMethod, metadata.dietaryAssessmentMethod),
        laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.laboratory),
        assay: createComplexPanel("Assay", schema.assay, metadata.assay),
        modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
        parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
        qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
        modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
        exposure: createComplexPanel("Exposure", schema.exposure, metadata.modelMath.exposure),
        plot: createPlotPanel(img) 
      };
    }
  }

    //transform jquery :contains selector to case insensitive
    jQuery.expr[':'].contains = function(a,i,m){
      return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;
    };

    let view = {};

    let _representation, _value;

    // These sets are used with the th-filters
    let _softwareSet = new Set();
    let _environmentSet = new Set();
    let _hazardSet = new Set();

    let _cache = [];

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

      let container = document.createElement("div");
      container.className = "container-fluid";

      let navBar = createNavBar();
      container.appendChild(navBar);

      let descriptionParagraph = document.createElement("p");
      // TODO: add contents to description paragraph
      container.appendChild(descriptionParagraph);

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
      container.appendChild(mainTable);

      // details dialog
      let modalDiv = document.createElement("div");
      modalDiv.classList.add("modal", "fade");
      modalDiv.setAttribute("tabindex", "-1");
      modalDiv.setAttribute("role", "dialog");

      modalDiv.innerHTML = `
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"
                aria-label="Close"><span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title">Modal title</h4>
            </div>
            <div class="modal-body">
              <nav class="navbar navbar-default">
                <div class="navbar-collapse collapse">
                  <ul class="nav navbar-nav" id="viewTab"></ul>
                </div>
              </nav>
              <div class="tab-content" id="viewContent">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div> <!-- .modal-content -->
        </div> <!-- .modal-dialog -->`;
      container.appendChild(modalDiv);

      body.appendChild(container);

      fillTable();

      // Populate cache
      $(".table tbody tr").each(function() {
        let rawText = getText(this);
        let formattedText = rawText ? rawText.trim().toLowerCase() : "";

        // Add an object to the cache array
        _cache.push({ element: this, text: formattedText});
      });
        
      // If browser does not support the input event, then use the keyup event
      let search = $("#filter-search"); // Get the input element
      search.on(search[0].oninput ? "input" : "keyup", filter);

      //*******************Sort*******************//
      let compare = {                           // Declare compare object
        name: function(a, b) {                  // Add a method called name
          a = a.replace(/^the /i, '');          // Remove The from start of parameter
          b = b.replace(/^the /i, '');          // Remove The from start of parameter

          if (a < b) {                          // If value a is less than value b
            return -1;                          // Return -1
          } else {                              // Otherwise
            return a > b ? 1 : 0;               // If a is greater than b return 1 OR
          }                                     // if they are the same return 0
        },
        duration: function(a, b) {              // Add a method called duration
          a = a.split(':');                     // Split the time at the colon
          b = b.split(':');                     // Split the time at the colon

          a = Number(a[0]) * 60 + Number(a[1]); // Convert the time to seconds
          b = Number(b[0]) * 60 + Number(b[1]); // Convert the time to seconds

          return a - b;                         // Return a minus b
        },
        date: function(a, b) {                  // Add a method called date
          a = new Date(a);                      // New Date object to hold the date
          b = new Date(b);                      // New Date object to hold the date

          return a - b;                         // Return a minus b
        }
      };

      // table head
      $("table.sortable thead th").css({
        "background-color": _representation.mainColor,
        "color": "white"
      });

      // numberModels div
      $("#numberModels, #filter-search").css({
        "color": _representation.mainColor,
        "opacity": 0.70
      });

      // Hidden sidenav
      $(".sidenav").css("background-color", _representation.mainColor);

      // Selects
      $("#soft, #env, #haz").css("color", _representation.mainColor);

      // Buttons
      $(".topnav a.Nav").css("background-color", _representation.mainColor)
      $(".detailsButton, .downloadButton").css({
        "background-color": _representation.buttonColor,
        "color": "white",
        "width": "90px"
      });
      $("#clear").css({
        "color": _representation.mainColor,
        "opacity": "0.5"
      });
      $(".fa-remove").css("color", _representation.hoverColor);

      // table head:hover
      $("th.actives.ascending, th.actives.descending, table.sortable th.actives").hover((mouse) => {
        $(this).css("background-color", mouse.type === "mouseenter"?
          _representation.hoverColor : _representation.mainColor)
      });

      $(".sidenav a.Nav").hover((mouse) => {
        let properties = {
          "background-color": mouse.type === "mouseenter" ?
            _representation.hoverColor : _representation.mainColor,
          "color": "white"
        };
        $(this).css(properties);
      });

      $(".sidenav .closebtn").hover((mouse) => {
        $(this).css("color", mouse.type === "mouseenter" ?
          _representation.hoverColor : "white");
      });

      $(".topnav a.Nav").hover((mouse) => {
        let properties = {
          "background-color": mouse.type === "mouseenter" ?
            _representation.hoverColor : _representation.mainColor,
          "color": "white"
        };
        $(this).css(properties);
      });

      $("#MenuIcon").click(() => document.getElementById("mySidenav").style.width = "250px");
      $('.closebtn').click(() => document.getElementById("mySidenav").style.width = "0");
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
            <div id="numberModels"></div>
          </div>
        </div>`;

        return navBar
    }

    function createTopnav() {
        let title1 = "FSK-Web"; // TODO: get title1 from input

        let topnav = document.createElement("div");
        topnav.className = "topnav";
        topnav.id = "myTopnav";
        topnav.style = `background-color: ${_representation.mainColor};`;
        topnav.innerHTML = `<h1>${title1}</h1>`;

        // Add links
        let knimeTable = new kt();
        knimeTable.setDataTable(_representation.links);
        knimeTable.getRows().forEach(row => {
          topnav.appendChild(createLink(row));
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
        let knimeTable = new kt();
        knimeTable.setDataTable(_representation.links);
        knimeTable.getRows().forEach(row => {
            sidenav.appendChild(createLink(row));
        });

        return sidenav;
    }

    function createLink(linkRow) {
      let navlink = document.createElement("a");
      navlink.className = "Nav";
      navlink.href = linkRow.data[1]; // url column
      navlink.target = "_blank";
      navlink.innerText = linkRow.data[0]; // text column

      let linkType = linkRow.data[2];
      if (linkType === "edition") {
        navlink.innerHTML += '<i class="fa fa-pencil"></i>';
      } else if (linkType === "publication") {
        navlink.innerHTML += '<i class="fa fa-cloud-upload"></i>'
      }

      return navlink;
    }

    /**
     * Get a metadata property or return empty string if missing.
     * @param {object} modelMetadata Whole metadata of a model
     * @param {string} toplevel Name of the metadata component. It can be
     *  *generalInformation*, *scope*, *dataBackground* or *modelMath*.
     * @param {string} name Name of the metadata property 
     */
    function getData(modelMetadata, toplevel, name) {
      try {
        return modelMetadata[toplevel][name];
      } catch(err) {
        return "";
      }
    }
        
    function Data1(row, number, type, name, parameter){
      try {
        return metaData[Object.keys(_representation.metadata)[row]][number][type][name][parameter];
      } catch(err) {
        return "";
      }
    }

    // Convert first letter to uppercase
    function capitalize(element) {
      return element.charAt(0).toUpperCase() + element.slice(1);
    }

    // Add elements previously splitted to a set
    function addUniformElements(uniformedElement, targetSet) {
      for (let en of uniformedElement) {
        let element = capitalize(en.trim());
        targetSet.add(element);
      }
    }

    function fillTable() {

      // These sets are used with the th-filters

      // Load model information table from _representation
      window.modelInformation = new kt();
      window.modelInformation.setDataTable(_representation.basicModelInformation);

      // Get full model metadata from _representation
      let metadata = JSON.parse(_representation.metadata);

      for (let i=0; i < window.modelInformation.getNumRows(); i++) {

        let modelMetadata = metadata[i][0];
        let currentRow = window.modelInformation.getRows()[i];
        
        // TODO: ...
        let modelName = getData(modelMetadata, "generalInformation", "name");
        let modelId = getData(modelMetadata, "generalInformation", "identifier");
        let software = getData(modelMetadata, "generalInformation", "software");
        let environment = currentRow.data[5];
        let hazard = currentRow.data[6];
        let durationTime = convertKnimeTimeToISO(currentRow.data[1]);
        let uploadTime = currentRow.data[7];
        let downloadUrl = currentRow.data[8];

        // Update sets
        if (software) _softwareSet.add(software);
        addUniformElements(environment.split(/[,|]/), _environmentSet);
        addUniformElements(hazard.split("|"), _hazardSet);

        // Add row to table
        $("#rows").append(`<tr id="${currentRow.rowKey}">
          <td><input type="checkbox" class="checkbox1" name="${i}"></td>
          <td>${modelName}</td>
          <td class="hideColumn">${modelId}</td>
          <td class="softCol columnS">${software}</td>
          <td class="envCol columnS">${environment}</td>
          <td class="hazCol columnS">${hazard}</td>
          <td>${durationTime}</td>
          <td>${uploadTime}</td>
          <td>
            <button type="button" class="btn btn-primary detailsButton"
            data-loading-text='<i class="fa fa-spinner fa-spin"></i> Processing...'
            id="opener${i}">Details</button>
            <br>
            <br>
            <a class="btn btn-primary downloadButton" href="${downloadUrl}">Download</a>
            <div id="wrapper${i}">
          </td>
        </tr>`);

        $("#opener"+i).click(function(event){//to open details window
          let processedEvent = event
          $.when(effect(event.target)).done(function() {
            setTimeout(function() {
              buildDialogWindow(processedEvent);
              $('html, body').animate({scrollTop: 0}, 500);},
              50);
          });
        });
      }

      populateSelectById("soft", _softwareSet);
      populateSelectById("env", _environmentSet);
      populateSelectById("haz", _hazardSet);

      $(document).ready(function() {
        
        // Scrolling: detect a scroll event on the tbody
        $('tbody').scroll((event) => { 
          $('thead').css("left", -$("tbody").scrollLeft()); //fix the thead relative to the body scrolling
          $('thead th:nth-child(2)').css("left", $("tbody").scrollLeft()); //fix the first cell of the header
          $('tbody td:nth-child(2)').css("left", $("tbody").scrollLeft()); //fix the first column of tdbody
        });

        // Filter by different software, environment & hazard values
        $('#soft, #env, #haz').on('change', filterByCol);

        // Clear the search bar input
        $("#clear").click(() => {
          $('#rows tr').show();
          $("#filter-search").val("Search");
          $("#numberModels").fadeOut();

          // Clear selects
          let softwareSelect = document.getElementById("soft");
          softwareSelect.options.length = 1;
          softwareSelect.value = "Select";

          let environmentSelect = document.getElementById("env");
          environmentSelect.options.length = 1;
          environmentSelect.value = "Select";

          let hazardSelect = document.getElementById("haz");
          hazardSelect.options.length = 1;
          hazardSelect.value = "Select";
        });

        // Clear the selects of the different filters on button press
        $("#clearSoft").click(() => {
          let softwareSelect = document.getElementById("soft");
          softwareSelect.options.length = 1;
          softwareSelect.value = "Select";

          filterByCol();  
        });

        $("#clearEnv").click(() => {
          let environmentSelect = document.getElementById("env");
          environmentSelect.options.length = 1;
          environmentSelect.value = "Select";

          filterByCol();
        });

        $("#clearHaz").click(() => {
          let hazardSelect = document.getElementById("haz");
          hazardSelect.options.length = 1;
          hazardSelect.value = "Select";

          filterByCol();
        });

        // TODO: Sort columns
        $("#col1").click(() => sortColumn("#col1", 1));
        $("#col2").click(() => sortColumn("#col2", 2));
        $("#col3").click(() => sortColumn("#col3", 3));
        $("#col4").click(() => sortColumn("#col4", 4));
        $("#col5").click(() => sortSpan("#col5", 5));
        $("#col6").click(() => sortColumn("#col6", 6));
        $("#col7").click(() => sortColumn("#col7", 7));

        // Handle model selection. Only one row (model) can be selected and the
        // view value is updated with the current selection
        let selectedBox = null;
        $('.checkbox1').click(function() {
          selectedBox = this.name;
          $('.checkbox1').each(function() {
            if (this.name == selectedBox) {
              this.checked = true;
              $(this).closest("tr").css("background-color", "#e1e3e8");
            } else {
              this.checked = false;
              $(this).closest("tr").css("background-color", "transparent");
            };
          });
          
          // save selected model
          _value.selectedModel = window.modelInformation.getRows()[selectedBox].rowKey;
        });
      });
    }

    /**
     * Convert a time string of format 1d 3h 4m 5s to ISO date string.
     */
    function convertKnimeTimeToISO(knimeTime) {
      let numberTimeArray = [];
      for (let numberTime of knimeTime.match(/[a-zA-Z]+|[0-9]+/g)) {
        if (numberTime == "d"){
          numberTime = 216000;
        }else if (numberTime == "h"){
          numberTime = 3600;
        }else if (numberTime == "m"){
          numberTime = 60;
        }else if(numberTime == "s"){
          numberTime = 1;
        }else{
          numberTime = parseInt(numberTime);
        };

        numberTimeArray.push(numberTime);
      }

      let seconds = 0;
      for (let a = 1; a < numberTimeArray.length; a=a+2) {
        preVal = numberTimeArray[a-1];
        seconds = seconds+(numberTimeArray[a]*preVal);
      }

      let date = new Date(null);
      date.setSeconds(seconds);
      let durationTime = date.toISOString().substr(11, 8);

      return durationTime;
    }

    /**
     * Create the options for a filter.
     */
    function createSelect(list, idName){
      for(var s = 0; s < list.length; s++) {
        $(idName).append('<option value="'+list[s]+'">'+ list[s]+'</option>');
      };
    }

    /**
     * Populate the options of a select.
     * 
     * @param {string} selectId Id of a select
     * @param {array} options Array of possible values
     */
    function populateSelectById(selectId, options) {
      let select = document.getElementById(selectId);
      options.forEach(entry =>
        select.innerHTML += `<option value="${entry}">${entry}</option>`);
    }

    /**
     * Populate the options of a select.
     * 
     * @param {element} selectId select element
     * @param {array} options Array of possible values
     */
    function populateSelect(select, options) {
      options.forEach(entry =>
        select.innerHTML += `<option value="${entry}">${entry}</option>`);
    }

    // Multiple filtering for every columns
    function filterByCol() {
      let filt = "";
      let rows = $("#rows tr");
      let select1 = $("#soft").val();
      let select2 = $("#env").val();
      let select3 = $("#haz").val();
      rows.hide();

      let numberModelsDiv = document.getElementById("numberModels");

      if (select1 == "Select" && select2 == "Select" && select3 == "Select") {
        rows.show();
        numberModelsDiv.innerHTML = `Your search return ${rows.length} models`;
      } else if (select2 == "Select"){
        if (select1 != "Select" && select3 == "Select") {
          filt = $(`#MainTable td.softCol:contains("${select1}")`).parent();
        } else if (select1 != "Select" && select3 != "Select") {
          filt1 = rows.filter($(`#MainTable td.softCol:contains("${select1}")`).parent());
          let selRows = rows.filter(filt1);
          filt = selRows.filter($(`#MainTable td.hazCol:contains("${select3}")`).parent().show());
          rows.hide();
        } else if (select1 == "Select" && select3 != "Select") {
          filt = $(`#MainTable td.hazCol:contains("${select3}")`).parent();
        } else{
          filt = ""
        }
      } else if (select1 == "Select") {
        if (select2 != "Select" && select3 == "Select") {
          filt = `:contains("${select2}")`;
        } else if (select2 != "Select" && select3 != "Select"){
          filt = `:contains("${select2}"):contains("${select3}")`;
        } else if (select2 == "Select" && select3 != "Select"){
          filt = $(`#MainTable td.hazCol:contains("${select3}")`).parent().show();
        } else {
          filt = "";
        }
      } else if (select3 == "Select") {
        if(select1 != "Select" && select2 != "Select"){
          filt1 = rows.filter($(`#MainTable td.softCol:contains("${select1}")`).parent());
          var selRows=rows.filter(filt1);
          filt = selRows.filter($(`#MainTable td.envCol:contains("${select2}")`).parent().show());
          rows.hide();
        } else{
          filt=""
        }	
      } else {
        filt = `:contains("${select1}"):contains("${select2}"):contains("${select3}")`;
      }

      rows.filter(filt).show();
      let searchResult = rows.filter(filt);
      numberModelsDiv.innerHTML = `Your search returned ${searchResult.length} models`;
      
      // Get new sets for the filtered rows
      let softwareSet = new Set();
      let environmentSet = new Set();
      let hazardSet = new Set();

      for (let i = 0; i < searchResult.length; i++) {
        let software = searchResult[i].getElementsByTagName("td")[3].innerText;
		    let environment = searchResult[i].getElementsByTagName("td")[4].innerText;
        let hazard = searchResult[i].getElementsByTagName("td")[5].innerText;
        
        // Split some entries joined with commas
        addUniformElements(software.split(/[,|]/), softwareSet);
        addUniformElements(environment.split(/[,|]/), environmentSet);
        addUniformElements(hazard.split(/[,|]/), hazardSet);
      }

      // Clear filters and populated them with the filtered results
      let softwareSelect = document.getElementById("soft");
      softwareSelect.options.length = 1;
      populateSelect(softwareSelect, softwareSet);
      softwareSelect.value = select1;

      let environmentSelect = document.getElementById("env");
      environmentSelect.options.length = 1;
      populateSelect(environmentSelect, environmentSet);
      environmentSelect.value = select2;

      let hazardSelect = document.getElementById("haz");
      hazardSelect.options.length = 1;
      populateSelect(hazardSelect, hazardSet);
      hazardSelect.value = select3;

      // If no filters, restore the selects and numberModelsDiv
      if (filt == "") {
        populateSelect(softwareSelect, _softwareSet);
        populateSelect(environmentSelect, _environmentSet);
        populateSelect(hazardSelect, _hazardSet);

        numberModelsDiv.innerHTML = " ";
      }
    }

    function sortColumn(idName, column) {

      let table = $(".sortable"); // This sortable table
      let tbody = table.find("tbody"); // Store table body
      let rows = tbody.find("tr").toArray(); // Store array containing rows
      let header = $(idName); // Get the header
      let order = header.data("sort"); // Get data-sort attribute

      // If selected item has ascending or descending class, reverse contents
      if (header.is('.ascending') || header.is('.descending')) {  
        header.toggleClass('ascending descending');    // Toggle to other class
        tbody.append(rows.reverse());                // Reverse the array
      } else {                                        // Otherwise perform a sort                            
        header.addClass('ascending');                // Add class to header
        // Remove asc or desc from all other headers
        header.siblings().removeClass('ascending descending'); 
        if (compare.hasOwnProperty(order)) {  // If compare object has method
          rows.sort(function(a, b) {               // Call sort() on rows array
            a = $(a).find('td').eq(column).text().toLowerCase(); // Get text of column in row a
            b = $(b).find('td').eq(column).text().toLowerCase(); // Get text of column in row b
            return compare[order](a, b);           // Call compare method
          });
          tbody.append(rows);
        }
      }
    }

    function sortSpan(idName, column){
      let table = $(".sortable");              // This sortable table
      let tbody = table.find('tbody');        // Store table body
      let rows = tbody.find('tr').toArray();   // Store array containing rows
    
      let header = $(idName).parents('th');                  // Get the header
    
      let order = header.data('sort');       // Get value of data-sort attribute
    
      // If selected item has ascending or descending class, reverse contents
      if (header.is('.ascending') || header.is('.descending')) {  
        header.toggleClass('ascending descending');    // Toggle to other class
        tbody.append(rows.reverse());                // Reverse the array
      } else {                                        // Otherwise perform a sort                            
        header.addClass('ascending');                // Add class to header
        // Remove asc or desc from all other headers
        header.siblings().removeClass('ascending descending'); 
        if (compare.hasOwnProperty(order)) {  // If compare object has method
          console.log(column);
          rows.sort(function(a, b) {               // Call sort() on rows array
            a = $(a).find('td').eq(column).text().toLowerCase(); // Get text of column in row a
            b = $(b).find('td').eq(column).text().toLowerCase(); // Get text of column in row b
            return compare[order](a, b);           // Call compare method
          });
          tbody.append(rows);
        }
      }
    };

    // Content elements for Searchfunction
    function getText(element) {
      let text;

      if (element.outerText) {
        text = element.outerText.trim();
      } else if (element.innerText) {
        text = element.innerText.trim();
      } else {
        text = "";
      }

      if (element.childNodes) {
        element.childNodes.forEach(child => text += getText(child));
      }

      return text;
    }

    function filter() {
      let query = this.value == undefined? "": this.value.trim().toLowerCase(); // Get the query
      
      // TODO: what is p???
      _cache.forEach(function(p) { // For each entry in cache pass image
        var index = 0; // Set index to 0
        if (query) { // If there is some query text
            index = p.text.indexOf(query); // Find if query text is in there
        }

        p.element.style.display = index === -1 ? "none" : ""; // Show/Hide
        let numberOfVisibleRows = $("tbody tr:visible").length;
        document.getElementById("numberModels").innerHTML = `Your search returned ${numberOfVisibleRows} models`;
      })
    }

    function effect(target) {
      $(target).button("loading");
    }

    function buildDialogWindow(event) {

      // button id has format "opener{i}" where i is the model number (6th char)
      let buttonId = event.target.id;
      let modelNumber = buttonId.substr(6);

      let metadata = JSON.parse(_representation.metadata)[modelNumber][0];
      let image = window.modelInformation.getRows()[modelNumber].data[0];

      // Update .modal-title
      if (metadata.generalInformation && metadata.generalInformation.name) {
        $(".modal-title").text(metadata.generalInformation.name);
      }

      // Get appropiate metadata handler for the model type.
      let handler;
      if (_representation.metadata.modelType === "genericModel") {
        handler = new GenericModel(metadata, image);
      } else if (_representation.metadata.modelType === "dataModel") {
        handler = new DataModel(metadata, image);
      } else if (_representation.metadata.modelType === "predictiveModel") {
        handler = new PredictiveModel(metadata, image);
      } else if (_representation.metadata.modelType === "otherModel") {
        handler = new OtherModel(metadata, image);
      } else if (_representation.metadata.modelType === "toxicologicalModel") {
        handler = new ToxicologicalModel(metadata, image);
      } else if (_representation.metadata.modelType === "doseResponseModel") {
        handler = new DoseResponseModel(metadata, image);
      } else if (_representation.metadata.modelType === "exposureModel") {
        handler = new ExposureModel(metadata, image);
      } else if (_representation.metadata.modelType === "processModel") {
        handler = new ProcessModel(metadata, image);
      } else if (_representation.metadata.modelType === "consumptionModel") {
        handler = new ConsumptionModel(metadata, image);
      } else if (_representation.metadata.modelType === "healthModel") {
        handler = new HealthModel(metadata, image);
      } else if (_representation.metadata.modelType === "riskModel") {
        handler = new RiskModel(metadata, image);
      } else if (_representation.metadata.modelType === "qraModel") {
        handler = new QraModel(metadata, image);
      } else {
        handler = new GenericModel(metadata, image);
      }

      document.getElementById("viewTab").innerHTML = handler.menus;

      // Add tab panels
      let viewContent = document.getElementById("viewContent");
      viewContent.innerHTML = ""; // First remove old tabs

      // Add new tabs from handler
      Object.entries(handler.panels).forEach(([key, value]) => {

        // Create a tab from the panel (value)
        let tabPanel = document.createElement("div");
        tabPanel.setAttribute("role", "tabpanel");
        tabPanel.className = "tab-pane";
        tabPanel.id = key;
        tabPanel.innerHTML = value;

        viewContent.appendChild(tabPanel); // Add new tabPanel
      });

      // Set the first tab (general information) as active
      document.getElementById("generalInformation").classList.add("active");

      $(".modal").modal("show");
    }
}());