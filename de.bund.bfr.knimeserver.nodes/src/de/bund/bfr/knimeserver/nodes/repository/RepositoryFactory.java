package de.bund.bfr.knimeserver.nodes.repository;

import org.knime.core.node.NodeDialogPane;
import org.knime.core.node.NodeFactory;
import org.knime.core.node.NodeView;
import org.knime.core.node.wizard.WizardNodeFactoryExtension;

public class RepositoryFactory extends NodeFactory<RepositoryNodeModel> implements
	WizardNodeFactoryExtension<RepositoryNodeModel, RepositoryViewRepresentation, RepositoryViewValue> {

	@Override
	public RepositoryNodeModel createNodeModel() {
		return new RepositoryNodeModel();
	}
	
	@Override
	protected int getNrNodeViews() {
		return 0;
	}

	@Override
	public NodeView<RepositoryNodeModel> createNodeView(int viewIndex, RepositoryNodeModel nodeModel) {
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
