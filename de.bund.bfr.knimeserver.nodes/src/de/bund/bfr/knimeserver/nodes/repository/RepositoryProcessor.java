package de.bund.bfr.knimeserver.nodes.repository;

import org.knime.core.node.ExecutionContext;
import org.knime.core.node.port.PortObject;
import org.knime.dynamic.js.v30.DynamicJSConfig;
import org.knime.dynamic.js.v30.DynamicJSProcessor;

public class RepositoryProcessor implements DynamicJSProcessor {

	@Override
	public Object[] processInputObjects(PortObject[] inObjects, ExecutionContext exec, DynamicJSConfig config)
			throws Exception {
		return inObjects;
	}

}
