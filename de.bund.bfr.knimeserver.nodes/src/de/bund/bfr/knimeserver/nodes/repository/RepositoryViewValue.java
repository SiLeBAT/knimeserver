package de.bund.bfr.knimeserver.nodes.repository;

import java.util.Objects;

import org.knime.core.node.InvalidSettingsException;
import org.knime.core.node.NodeSettingsRO;
import org.knime.core.node.NodeSettingsWO;
import org.knime.js.core.JSONViewContent;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class RepositoryViewValue extends JSONViewContent {
	
	/** Row key of the row containing the selected model in the repository. */
	String selectedModel = "";
	
	@Override
	public void saveToNodeSettings(NodeSettingsWO settings) {
	}

	@Override
	public void loadFromNodeSettings(NodeSettingsRO settings) throws InvalidSettingsException {
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (obj == this) {
			return true;
		}
		if (obj.getClass() != getClass()) {
			return false;
		}
		
		final RepositoryViewValue other = (RepositoryViewValue) obj;
		return selectedModel.equals(other.selectedModel);
	}

	@Override
	public int hashCode() {
		return Objects.hash(selectedModel);
	}
}
