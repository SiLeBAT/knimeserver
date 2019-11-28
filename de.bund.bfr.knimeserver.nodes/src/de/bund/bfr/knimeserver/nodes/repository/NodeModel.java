package de.bund.bfr.knimeserver.nodes.repository;

import java.util.ArrayList;
import java.util.List;

import org.knime.core.data.DataRow;
import org.knime.core.data.def.StringCell;
import org.knime.core.node.BufferedDataTable;
import org.knime.core.node.ExecutionContext;
import org.knime.core.node.InvalidSettingsException;
import org.knime.core.node.NodeSettingsRO;
import org.knime.core.node.NodeSettingsWO;
import org.knime.core.node.port.PortObject;
import org.knime.core.node.port.PortObjectSpec;
import org.knime.core.node.port.PortType;
import org.knime.core.node.port.flowvariable.FlowVariablePortObject;
import org.knime.core.node.port.flowvariable.FlowVariablePortObjectSpec;
import org.knime.core.node.web.ValidationError;
import org.knime.js.core.node.AbstractWizardNodeModel;

import de.bund.bfr.knimeserver.nodes.repository.ViewRepresentation.Link;
import de.bund.bfr.knimeserver.nodes.repository.ViewRepresentation.Link.LinkType;

public class NodeModel extends AbstractWizardNodeModel<ViewRepresentation, ViewValue> {

	// input and output port types
	private static final PortType[] IN_TYPES = { BufferedDataTable.TYPE };
	private static final PortType[] OUT_TYPES = { FlowVariablePortObject.TYPE };
	
	public NodeModel() {
		super(IN_TYPES, OUT_TYPES, "Web Repository");
	}

	@Override
	public ViewRepresentation createEmptyViewRepresentation() {
		return new ViewRepresentation();
	}

	@Override
	public ViewValue createEmptyViewValue() {
		return new ViewValue();
	}

	@Override
	public String getJavascriptObjectID() {
		return "de.bund.bfr.knimeserver.nodes.repository";
	}

	@Override
	public boolean isHideInWizard() {
		return false;
	}

	@Override
	public void setHideInWizard(boolean hide) {
	}

	@Override
	public ValidationError validateViewValue(ViewValue viewContent) {
		return null;
	}

	@Override
	public void saveCurrentValue(NodeSettingsWO content) {
	}
	
	@Override
	protected PortObjectSpec[] configure(PortObjectSpec[] inSpecs) throws InvalidSettingsException {
		return new PortObjectSpec[] { FlowVariablePortObjectSpec.INSTANCE };
	}

	@Override
	protected PortObject[] performExecute(PortObject[] inObjects, ExecutionContext exec) throws Exception {
		
		// Get links from input table
		BufferedDataTable linkTable = (BufferedDataTable) inObjects[0];
		List<Link> links = new ArrayList<>((int)linkTable.size());
		for (DataRow row : linkTable) {
			String linkText = ((StringCell)row.getCell(0)).getStringValue();
			String linkUrl = ((StringCell)row.getCell(1)).getStringValue();
			LinkType linkType = LinkType.valueOf(((StringCell)row.getCell(2)).getStringValue());
			
			links.add(new Link(linkText, linkUrl, linkType));
		}
		
		// Update links in ViewRepresentation
		ViewRepresentation repr = getViewRepresentation();
		repr.links = links;
		
		synchronized (getLock()) {
			// TODO: ...
		}
		
		// TODO: Row0 is a placeholder. Replace from view value.
		pushFlowVariableString("selectedModel", "Row0");
		
		return new PortObject[] { FlowVariablePortObject.INSTANCE };
	}

	@Override
	protected void performReset() {
	}

	@Override
	protected void useCurrentValueAsDefault() {
	}

	@Override
	protected void saveSettingsTo(NodeSettingsWO settings) {
	}

	@Override
	protected void validateSettings(NodeSettingsRO settings) throws InvalidSettingsException {
	}

	@Override
	protected void loadValidatedSettingsFrom(NodeSettingsRO settings) throws InvalidSettingsException {
	}
}
