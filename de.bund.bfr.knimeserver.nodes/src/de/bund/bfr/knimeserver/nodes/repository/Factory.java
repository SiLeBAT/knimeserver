package de.bund.bfr.knimeserver.nodes.repository;

import org.knime.core.node.NodeDialogPane;
import org.knime.core.node.NodeFactory;
import org.knime.core.node.NodeView;
import org.knime.core.node.wizard.WizardNodeFactoryExtension;

public class Factory extends NodeFactory<NodeModel> implements
	WizardNodeFactoryExtension<NodeModel, ViewRepresentation, ViewValue> {

	@Override
	public NodeModel createNodeModel() {
		return new NodeModel();
	}
	
	@Override
	protected int getNrNodeViews() {
		return 0;
	}

	@Override
	public NodeView<NodeModel> createNodeView(int viewIndex, NodeModel nodeModel) {
		return null;
	}
	
	@Override
	protected NodeDialogPane createNodeDialogPane() {
		return null;
	}
	
	@Override
	protected boolean hasDialog() {
		return false;
	}
}
