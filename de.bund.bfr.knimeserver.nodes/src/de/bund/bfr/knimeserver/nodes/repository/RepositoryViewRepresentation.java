package de.bund.bfr.knimeserver.nodes.repository;

import java.util.Objects;

import org.knime.core.node.InvalidSettingsException;
import org.knime.core.node.NodeSettingsRO;
import org.knime.core.node.NodeSettingsWO;
import org.knime.js.core.JSONDataTable;
import org.knime.js.core.JSONViewContent;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class RepositoryViewRepresentation extends JSONViewContent {

	JSONDataTable links;
	String mainColor;
	String buttonColor;
	String hoverColor;
	String title1;
	String title2;
	JSONDataTable basicModelInformation;

	@Override
	public void saveToNodeSettings(NodeSettingsWO settings) {
	}

	@Override
	public void loadFromNodeSettings(NodeSettingsRO settings) throws InvalidSettingsException {
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}

		final RepositoryViewRepresentation other = (RepositoryViewRepresentation) obj;
		return links.equals(other.links) && mainColor.equals(other.mainColor) && buttonColor.equals(other.buttonColor)
				&& hoverColor.equals(other.hoverColor) && title1.equals(other.title1) && title2.equals(title2)
				&& basicModelInformation.equals(other.basicModelInformation);
	}

	@Override
	public int hashCode() {
		return Objects.hash(links, mainColor, buttonColor, hoverColor, title1, title2, basicModelInformation,
				basicModelInformation);
	}
}
