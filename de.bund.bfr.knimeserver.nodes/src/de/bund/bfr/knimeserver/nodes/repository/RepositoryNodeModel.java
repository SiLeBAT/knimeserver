package de.bund.bfr.knimeserver.nodes.repository;

import org.knime.core.node.BufferedDataTable;
import org.knime.core.node.BufferedDataTableHolder;
import org.knime.core.node.CanceledExecutionException;
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
import org.knime.js.core.JSONDataTable;
import org.knime.js.core.node.AbstractWizardNodeModel;

public class RepositoryNodeModel extends AbstractWizardNodeModel<RepositoryViewRepresentation, RepositoryViewValue>
		implements BufferedDataTableHolder {

	// input and output port types
	private static final PortType[] IN_TYPES = { BufferedDataTable.TYPE, BufferedDataTable.TYPE,
			FlowVariablePortObject.TYPE };
	private static final PortType[] OUT_TYPES = { FlowVariablePortObject.TYPE };

	// internal tables
	private BufferedDataTable m_linkTable;
	private JSONDataTable m_linkJsonTable;

	private BufferedDataTable m_modelInformationTable;
	private JSONDataTable m_modelInformationJsonTable;

	public RepositoryNodeModel() {
		super(IN_TYPES, OUT_TYPES, "Web Repository");
	}

	@Override
	public RepositoryViewRepresentation createEmptyViewRepresentation() {
		return new RepositoryViewRepresentation();
	}

	@Override
	public RepositoryViewValue createEmptyViewValue() {
		return new RepositoryViewValue();
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
	public ValidationError validateViewValue(RepositoryViewValue viewContent) {
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

		synchronized (getLock()) {

			RepositoryViewRepresentation repr = getViewRepresentation();

			if (repr.links == null || repr.basicModelInformation == null) {
				m_linkTable = (BufferedDataTable) inObjects[0];
				m_modelInformationTable = (BufferedDataTable) inObjects[1];
				createJsonTables(exec);

				repr.links = m_linkJsonTable;
				repr.basicModelInformation = m_modelInformationJsonTable;
				repr.mainColor = peekFlowVariableString("Color-Main");
				repr.buttonColor = peekFlowVariableString("Color-Button");
				repr.hoverColor = peekFlowVariableString("Color Hover");
				repr.title1 = peekFlowVariableString("Titel1");
				repr.title2 = peekFlowVariableString("Titel2");
			}

			// TODO: ...
		}

		// TODO: Row0 is a placeholder. Replace from view value.
		pushFlowVariableString("selectedModel", "Row0");

		return new PortObject[] { FlowVariablePortObject.INSTANCE };
	}

	private void createJsonTables(final ExecutionContext exec)
			throws IllegalArgumentException, CanceledExecutionException {
		m_linkJsonTable = JSONDataTable.newBuilder().setDataTable(m_linkTable).build(exec);
		m_modelInformationJsonTable = JSONDataTable.newBuilder().setDataTable(m_modelInformationTable).build(exec);
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

	@Override
	public BufferedDataTable[] getInternalTables() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setInternalTables(BufferedDataTable[] tables) {
		// TODO Auto-generated method stub

	}
}
