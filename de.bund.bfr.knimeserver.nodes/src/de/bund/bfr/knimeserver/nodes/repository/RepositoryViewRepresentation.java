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
	JSONDataTable basicModelInformation;

	String mainColor;
	String buttonColor;
	String hoverColor;
	String title1;
	String title2;
	String metadata;

	String linkName1;
	String linkName2;
	String linkName3;
	String linkName4;
	String linkName5;
	String linkName6;

	String link1;
	String link2;
	String link3;
	String link4;
	String link5;
	String link6;

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
				&& basicModelInformation.equals(other.basicModelInformation) && metadata.equals(other.metadata)
				&& linkName1.equals(other.linkName1) && linkName2.equals(other.linkName2)
				&& linkName3.equals(other.linkName3) && linkName4.equals(other.linkName4)
				&& linkName5.equals(other.linkName5) && linkName6.equals(other.linkName6) && link1.equals(other.link1)
				&& link2.equals(other.link2) && link3.equals(other.link3) && link4.equals(other.link4)
				&& link5.equals(other.link5) && link6.equals(other.link6);
	}

	@Override
	public int hashCode() {
		return Objects.hash(links, mainColor, buttonColor, hoverColor, title1, title2, basicModelInformation,
				basicModelInformation, metadata, link1, link2, link3, link4, link5, link6, linkName1, linkName2,
				linkName3, linkName4, linkName5, linkName6);
	}
}
